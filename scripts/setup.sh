#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Colors for Output ---
C_RESET='\033[0m'
C_RED='\033[0;31m'
C_GREEN='\033[0;32m'
C_YELLOW='\033[0;33m'
C_CYAN='\033[0;36m'

# --- Main Script Logic ---

echo -e "${C_CYAN}What is the name of your new SaaS project?${C_RESET}"
read -p "> " PROJECT_NAME

if ! [[ "$PROJECT_NAME" =~ ^[a-z][a-z0-9-]*$ ]]; then
  echo -e "\n${C_RED}Error: Project name must be in kebab-case (e.g., my-awesome-project).${C_RESET}"
  exit 1
fi

# --- Robust Path Detection ---
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
  DIR="$( cd -P "$( dirname "$SOURCE" )" &>/dev/null && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
SCRIPT_DIR="$( cd -P "$( dirname "$SOURCE" )" &>/dev/null && pwd )"
STARTER_PATH="$(dirname "$SCRIPT_DIR")"
PROJECT_PATH="$(pwd)/$PROJECT_NAME"


if [ -d "$PROJECT_PATH" ]; then
  echo -e "\n${C_RED}Error: Directory '$PROJECT_PATH' already exists. Please choose a different name.${C_RESET}"
  exit 1
fi

echo -e "\n${C_GREEN}🚀 Creating a new project in ${PROJECT_PATH}...${C_RESET}"

# Copy files using rsync with the correct exclusions
rsync -av --progress "$STARTER_PATH/" "$PROJECT_PATH/" \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude ".DS_Store" \
  --exclude ".next" \
  --exclude "coverage" \
  --exclude "scripts/setup.sh"

# --- Safely Edit package.json using Node.js ---
echo -e "${C_YELLOW}🔧 Configuring project name in package.json...${C_RESET}"
PACKAGE_JSON_PATH="$PROJECT_PATH/package.json"

node -e "
  const fs = require('fs');
  const packageJson = JSON.parse(fs.readFileSync('$PACKAGE_JSON_PATH', 'utf-8'));
  packageJson.name = '$PROJECT_NAME';
  delete packageJson.version;
  delete packageJson.bin;
  if (packageJson.devDependencies) {
    delete packageJson.devDependencies.inquirer;
    delete packageJson.devDependencies['fs-extra'];
  }
  fs.writeFileSync('$PACKAGE_JSON_PATH', JSON.stringify(packageJson, null, 2));
"

cd "$PROJECT_PATH"

echo -e "${C_YELLOW}🔄 Initializing a new Git repository...${C_RESET}"
git init > /dev/null 2>&1
git add . > /dev/null 2>&1
git commit -m "Initial commit from Coriyon's Starter Kit" > /dev/null 2>&1

echo -e "${C_YELLOW}📦 Installing dependencies with npx pnpm...${C_RESET}"
npx pnpm install

echo -e "\n${C_GREEN}✅ Success! Your new project \"$PROJECT_NAME\" is ready.${C_RESET}"
echo -e "\nTo get started, follow the instructions in the new project's README.md file.${C_RESET}"