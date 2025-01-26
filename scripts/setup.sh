#!/bin/bash

# Install all project dependencies. Supports MacOS and Linux.
# USAGE: run from project root, via `bash scripts/setup.sh`

if ! command -v uv &> /dev/null
then
  curl -LsSf https://astral.sh/uv/install.sh | sh
else
  echo "[setup.sh] uv is installed!"
fi

if ! command -v nvm &> /dev/null
then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
else
  echo "[setup.sh] nvm is installed!"
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
# source ~/.bashrc

nvm install
nvm use

echo "[setup.sh] using Node version: $(node -v)"
echo "[setup.sh] using NPM version: $(npm -v)"

npm ci

echo "[setup.sh] setup complete!"
