#!/usr/bin/env bash
# File: scripts/verify-schema-types.sh
# Purpose: Compares local src/lib/database.types.ts against fresh remote types.

set -euo pipefail

# --- More reliable project reference detection ---
# Reads the ref from the file created by `supabase link`.
PROJECT_REF_FILE="supabase/.temp/project-ref"

if [ ! -f "$PROJECT_REF_FILE" ]; then
    echo "🚨 Supabase project reference file not found at '$PROJECT_REF_FILE'." >&2
    echo "   Please link your project first using 'supabase link --project-ref <your-project-ref>'." >&2
    exit 1
fi

SUPABASE_PROJECT_REF=$(cat "$PROJECT_REF_FILE")

# Path inside your 'src' directory
LOCAL_TYPES_FILE="src/lib/database.types.ts"
MAX_RETRIES_FOR_TEMP_GEN=3
RETRY_DELAY_SECONDS=3

echo "🔎 Verifying local Supabase types in '$LOCAL_TYPES_FILE' against linked remote schema '$SUPABASE_PROJECT_REF'..."

# Fail immediately if the local types file is missing
if [ ! -f "$LOCAL_TYPES_FILE" ]; then
    echo "🚨 Local types file '$LOCAL_TYPES_FILE' not found." >&2
    echo "   Run 'pnpm run types:update' to generate it." >&2
    exit 1
fi

# Prepare for remote generation and diff
_cleanup_verify_temps() {
  rm -f "$TEMP_REMOTE_TYPES_FILE" "$CLI_STDERR_FILE_VERIFY" "$DIFF_OUTPUT_FILE"
}
trap _cleanup_verify_temps EXIT INT TERM

RETRY_COUNT=0
REMOTE_GEN_SUCCESSFUL=false

while [ $RETRY_COUNT -lt $MAX_RETRIES_FOR_TEMP_GEN ] && [ "$REMOTE_GEN_SUCCESSFUL" = "false" ]; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  TEMP_REMOTE_TYPES_FILE="$(mktemp)"
  CLI_STDERR_FILE_VERIFY="$(mktemp)"

  if [ $RETRY_COUNT -gt 1 ]; then
    echo "   Retrying temporary type generation (attempt $RETRY_COUNT of $MAX_RETRIES_FOR_TEMP_GEN) after $RETRY_DELAY_SECONDS second(s)..." >&2
    sleep $RETRY_DELAY_SECONDS
  fi
  
  CLI_EXIT_CODE=0
  if ! supabase gen types typescript --project-id "$SUPABASE_PROJECT_REF" --schema public > "$TEMP_REMOTE_TYPES_FILE" 2> "$CLI_STDERR_FILE_VERIFY"; then
    CLI_EXIT_CODE=$?
  fi

  if [ "$CLI_EXIT_CODE" -eq 0 ] && [ -s "$TEMP_REMOTE_TYPES_FILE" ]; then
    REMOTE_GEN_SUCCESSFUL=true
  else
    echo "⚠️ Supabase CLI 'gen types' for comparison failed or empty output (attempt $RETRY_COUNT, exit $CLI_EXIT_CODE)." >&2
    cat "$CLI_STDERR_FILE_VERIFY" >&2
    rm -f "$TEMP_REMOTE_TYPES_FILE"
  fi

  rm -f "$CLI_STDERR_FILE_VERIFY"
done

if [ "$REMOTE_GEN_SUCCESSFUL" = "false" ]; then
  echo "🚨 CRITICAL: Failed to generate fresh remote types after $MAX_RETRIES_FOR_TEMP_GEN attempts. Cannot verify schema." >&2
  exit 1
fi

DIFF_OUTPUT_FILE="$(mktemp)"

if diff -u "$LOCAL_TYPES_FILE" "$TEMP_REMOTE_TYPES_FILE" > "$DIFF_OUTPUT_FILE" 2>&1; then
  echo "✅ No schema drift detected. '$LOCAL_TYPES_FILE' is up-to-date with the remote schema."
  exit 0
else
  echo "🚨 Schema drift DETECTED!" >&2
  echo "   Your local '$LOCAL_TYPES_FILE' differs from the live database schema." >&2
  echo "   Differences found (local → remote):" >&2
  cat "$DIFF_OUTPUT_FILE" >&2
  echo "" >&2
  echo "   To fix this, run: pnpm run types:update" >&2
  echo "   Then, add and commit the updated '$LOCAL_TYPES_FILE' file." >&2
  exit 1
fi