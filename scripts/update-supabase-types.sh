#!/usr/bin/env bash
# File: scripts/update-supabase-types.sh
# Purpose: Generates and overwrites local Supabase types from the remote schema.

set -euo pipefail

# FIX: Automatically detect the Supabase project reference from the linked project.
# This removes the need for a hardcoded project ID.
PROJECT_REF_FILE="supabase/.temp/project-ref"

if [ ! -f "$PROJECT_REF_FILE" ]; then
    echo "🚨 Supabase project reference file not found at '$PROJECT_REF_FILE'." >&2
    echo "   Please link your project first using 'supabase link --project-ref <your-project-ref>'." >&2
    exit 1
fi

SUPABASE_PROJECT_REF=$(cat "$PROJECT_REF_FILE")

# --- Script Configuration ---
OUTPUT_FILE_PATH="src/lib/database.types.ts"
MAX_RETRIES=5
RETRY_DELAY_SECONDS=5

echo "🔄 Attempting to update Supabase types from LINKED project '$SUPABASE_PROJECT_REF' into $OUTPUT_FILE_PATH..."

# Ensure output directory exists
OUTPUT_DIR=$(dirname "$OUTPUT_FILE_PATH")
mkdir -p "$OUTPUT_DIR"

RETRY_COUNT=0
GENERATION_SUCCESSFUL=false

touch "$OUTPUT_FILE_PATH"

while [ $RETRY_COUNT -lt $MAX_RETRIES ] && [ "$GENERATION_SUCCESSFUL" = "false" ]; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -gt 1 ]; then
    echo "   Retrying type generation (attempt $RETRY_COUNT of $MAX_RETRIES) after $RETRY_DELAY_SECONDS second(s)..." >&2
    sleep $RETRY_DELAY_SECONDS
  fi

  CURRENT_ATTEMPT_TYPES_FILE="$(mktemp)"
  CLI_STDERR_FILE="$(mktemp)"

  _cleanup_temps() {
    rm -f "$CURRENT_ATTEMPT_TYPES_FILE" "$CLI_STDERR_FILE"
  }
  trap _cleanup_temps EXIT

  CLI_EXIT_CODE=0
  if ! supabase gen types typescript --project-id "$SUPABASE_PROJECT_REF" --schema public > "$CURRENT_ATTEMPT_TYPES_FILE" 2> "$CLI_STDERR_FILE"; then
    CLI_EXIT_CODE=$?
  fi

  if [ "$CLI_EXIT_CODE" -eq 0 ] && [ -s "$CURRENT_ATTEMPT_TYPES_FILE" ]; then
    rm -f "$OUTPUT_FILE_PATH"
    if mv "$CURRENT_ATTEMPT_TYPES_FILE" "$OUTPUT_FILE_PATH"; then
      echo "✅ Types successfully updated and saved to $OUTPUT_FILE_PATH$( [ $RETRY_COUNT -gt 1 ] && printf ' (on attempt %d)' "$RETRY_COUNT" )."
      GENERATION_SUCCESSFUL=true
      sleep 0.2
    else
      echo "⚠️ Failed to move generated types to $OUTPUT_FILE_PATH. Check permissions." >&2
    fi
  else
    echo "⚠️ Supabase CLI 'gen types' failed or produced empty output (attempt $RETRY_COUNT, exit $CLI_EXIT_CODE)." >&2
    cat "$CLI_STDERR_FILE" >&2
  fi

  rm -f "$CURRENT_ATTEMPT_TYPES_FILE" "$CLI_STDERR_FILE"
done

trap - EXIT

if [ "$GENERATION_SUCCESSFUL" = "false" ]; then
  echo "🚨 CRITICAL: Failed to generate and save Supabase types to '$OUTPUT_FILE_PATH' after $MAX_RETRIES attempts." >&2
  exit 1
fi

echo "✅ Supabase types update process complete for $OUTPUT_FILE_PATH."