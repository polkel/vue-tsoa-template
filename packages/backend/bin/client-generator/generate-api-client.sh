#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

INPUT_SPEC="$SCRIPT_DIR/../../build/swagger.json"
OUTPUT_DIR="$SCRIPT_DIR/../../../shared/src/client"

if [[ ! -f "$INPUT_SPEC" ]]; then
  echo "OpenAPI spec not found: $INPUT_SPEC" >&2
  exit 1
fi

rm -rf "$OUTPUT_DIR"

mkdir -p "$OUTPUT_DIR"

npx openapi-generator-cli generate \
  -g typescript-fetch \
  -i "$INPUT_SPEC" \
  -o "$OUTPUT_DIR"