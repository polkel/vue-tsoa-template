#!/usr/bin/env bash
set -Eeuo pipefail

# Make sure to add the correct sudo priveleges for your deploy user with visudo

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Load environment variables from .env
source "$PROJECT_ROOT/deploy/.env"
WEB_ROOT="/var/www/$PROJECT_NAME"

deploy_log() {
    echo ""
    echo "$1"
    echo ""
}

deploy_log "Starting prd deploy for $PROJECT_NAME..."

# Change these depending on your project structure
deploy_log "Removing existing generated files"
rm -rf "$PROJECT_ROOT/node_modules"
rm -rf "$PROJECT_ROOT/packages/frontend/node_modules"
rm -rf "$PROJECT_ROOT/packages/frontend/dist"
rm -rf "$PROJECT_ROOT/packages/backend/node_modules"
rm -rf "$PROJECT_ROOT/packages/backend/build"
rm -rf "$PROJECT_ROOT/packages/backend/src/generated"
rm -rf "$PROJECT_ROOT/packages/shared/node_modules"
rm -rf "$PROJECT_ROOT/packages/shared/dist"
rm -rf "$PROJECT_ROOT/packages/shared/src/client"

deploy_log "Installing npm packages"
(
    cd "$PROJECT_ROOT"
    npm i
)

deploy_log "Building backend routes and clients"
(
    cd "$PROJECT_ROOT/packages/backend"
    npx tsoa spec-and-routes
    bin/client-generator/generate-api-client.sh
    npx prisma generate
)

deploy_log "Building app dependencies"
(
    cd "$PROJECT_ROOT/packages/shared"
    npm run build
)

deploy_log "Building backend"
(
    cd "$PROJECT_ROOT/packages/backend"
    npm run build
)

deploy_log "Building frontend"
(
    cd "$PROJECT_ROOT/packages/frontend"
    npm run build
)

deploy_log "Migrating frontend to the correct directory"
sudo rm -rf $WEB_ROOT
sudo mkdir -p $WEB_ROOT
sudo cp -a "$PROJECT_ROOT/packages/frontend/dist/." "$WEB_ROOT/"

# Modify block below if you have multiple backend services to start
deploy_log "Restarting backend service"
BACKEND_SERVER="$PROJECT_ROOT/packages/backend/build/server.js"
BACKEND_SERVICE="$PROJECT_NAME-backend-prd.service"
BACKEND_SERVICE_FILE="/etc/systemd/system/$BACKEND_SERVICE"

sed "s#{{BACKEND_TARGET}}#$BACKEND_SERVER#g" \
"$PROJECT_ROOT/deploy/backend.service.template" |
sudo tee "$BACKEND_SERVICE_FILE" > /dev/null

sudo chown root:root "$BACKEND_SERVICE_FILE"
sudo chmod 0644 "$BACKEND_SERVICE_FILE"

sudo systemctl daemon-reload
sudo systemctl enable "$BACKEND_SERVICE"
sudo systemctl restart "$BACKEND_SERVICE"

deploy_log "Renewing ssl certs with certbot"
# Check if the letsencrypt cert already exists and can be renewed
if grep -RqsE "(^|[=,[:space:]])${SERVER_NAME//./\\.}([,[:space:]]|$)" \
    /etc/letsencrypt/renewal/; then
    echo "Certificate record exists; run renewal"
    sudo certbot renew --cert-name "$SERVER_NAME" --deploy-hook "systemctl reload nginx"
else
    echo "No certificate record exists; request the certificate first"
    sudo mkdir -p /var/www/certbot
    # Create nginx config in correct directory
    sed "s/{{SERVER_NAME}}/$SERVER_NAME/g" "$PROJECT_ROOT/nginx-http-only.template" |
    sudo tee "/etc/nginx/sites-available/$PROJECT_NAME" > /dev/null
    # Create simlink
    sudo ln -sfnT "/etc/nginx/sites-available/$PROJECT_NAME" "/etc/nginx/sites-enabled/$PROJECT_NAME"
    # Reload nginx
    sudo systemctl reload nginx
    # Run the certbot process
    sudo certbot certonly \
    --webroot \
    --webroot-path /var/www/certbot \
    --cert-name "$SERVER_NAME" \
    -d "$SERVER_NAME"
fi

# Replace the actual nginx block and reload nginx
sed -e "s/{{APP_NAME}}/$PROJECT_NAME/g" \
-e "s/{{APP_PORT}}/$APP_PORT/g" \
-e "s/{{SERVER_NAME}}/$SERVER_NAME/g" \
-e "s/{{WEB_ROOT}}/$WEB_ROOT/g" \
"$PROJECT_ROOT/deploy/nginx.template" |
sudo tee "/etc/nginx/sites-available/$PROJECT_NAME" > /dev/null
sudo ln -sfnT "/etc/nginx/sites-available/$PROJECT_NAME" "/etc/nginx/sites-enabled/$PROJECT_NAME"
sudo systemctl reload nginx
