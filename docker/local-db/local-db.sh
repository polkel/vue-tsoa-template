#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

# Evaluates directory name from command used to run script
# and prints the working directory after cd
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

ENV_FILE="$SCRIPT_DIR/../../packages/backend/.env"
COMPOSE_FILE="$SCRIPT_DIR/compose.yaml"

if [[ ! -f "$ENV_FILE" ]]; then
  echo ".env file not found in packages/backend: $ENV_FILE" >&2
  exit 1
fi

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d
