#!/usr/bin/env bash
# File: scripts/preflight-check.sh
# Runs a series of checks to ensure the project is in a good state before commit/deployment.

set -e # Exit immediately if a command exits with a non-zero status.

log_step() {
  echo ""
  echo "🚀 Step: $1"
  echo "--------------------------------------------------"
}
log_success() { echo "✅ $1"; }
log_info() { echo "ℹ️ $1"; }

echo "🏁 Starting Pre-flight Checks..."

# 1. Verify Supabase Schema Types
log_step "Supabase Schema Type Verification"
if [ -f scripts/verify-schema-types.sh ]; then
  if pnpm run types:verify; then
    log_success "Local Supabase types are IN SYNC with the remote schema."
  else
    echo "   👆 Schema drift detected or verification failed. Pre-flight check cannot continue." >&2
    exit 1
  fi
else
  log_info "scripts/verify-schema-types.sh not found. Skipping."
fi

# 2. Linting
log_step "Linting & Formatting"
echo "   Running 'pnpm lint'..."
pnpm lint
log_success "Linting passed."

# 3. TypeScript Type Check (NEW STEP)
log_step "TypeScript Type Check"
echo "   Running 'npx tsc --noEmit' for full project type validation..."
npx tsc --noEmit
log_success "TypeScript validation passed."

# 4. Run Tests (Unit & Integration)
log_step "Running Tests"
echo "   Running 'pnpm test'..."
pnpm test
log_success "All tests passed."

# 5. Production Build Check
log_step "Production Build Check"
echo "   Attempting production build using 'pnpm build'..."
pnpm build
log_success "Production build successful."

echo ""
echo "🎉🎉🎉 All Pre-flight Checks Passed Successfully! Ready for PR/Deployment. 🎉🎉🎉"