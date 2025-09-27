# HAIETMOBA Journal App - Development Commands

mod css
mod extension

# Default target - show available commands
default:
    @just --list

# Build local web version  
build-web:
    #!/bin/bash
    just css build
    mkdir -p dist/web
    cp index.html app.js dist/web/
    cp css/styles.css dist/web/styles.css
    echo "✅ Web version built in dist/web/"

# Open the local web version in default browser
open: build-web
    #!/bin/bash
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open dist/web/index.html
    else
        xdg-open dist/web/index.html
    fi





# Clean up generated files
clean:
    rm -rf dist/
    echo "🧹 Cleaned up build artifacts"

