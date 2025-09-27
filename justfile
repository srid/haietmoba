# HAIETMOBA Journal App - Development Commands

mod css
mod extension
mod icons

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
    cp manifest.json sw.js dist/web/
    cp -r icons dist/web/
    echo "✅ Web version built in dist/web/"

# Open the local web version in default browser
open: build-web
    #!/bin/bash
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open dist/web/index.html
    else
        xdg-open dist/web/index.html
    fi

# Serve the built web version with a local server
serve: build-web
    #!/bin/bash
    echo "🌐 Serving HAIETMOBA at http://localhost:8080"
    echo "Press Ctrl+C to stop"
    cd dist/web && nix shell nixpkgs#http-server -c http-server -p 8080 -o





# Clean up generated files
clean:
    rm -rf dist/
    echo "🧹 Cleaned up build artifacts"

