# HAIETMOBA Journal App - Development Commands

# Default target - show available commands
default:
    @just --list

# Start local development server (Python)
serve:
    python3 -m http.server 8000

# Build Tailwind CSS
build-css:
    nix shell nixpkgs#tailwindcss -c tailwindcss -i ./src/input.css -o ./styles.css --minify

# Package Chrome extension for distribution
package: build-css
    #!/bin/bash
    mkdir -p dist
    zip -r dist/haietmoba-extension.zip . -x "dist/*" ".git/*" "*.md" "justfile" "sample.json" "src/*" "tailwind.config.js" "package.json" "node_modules/*"
    echo "✅ Extension packaged as dist/haietmoba-extension.zip"

# Test Chrome extension locally (opens Chrome developer mode instructions)
test-extension:
    #!/bin/bash
    echo "🔧 To test the Chrome extension:"
    echo "1. Open Chrome and go to chrome://extensions/"
    echo "2. Enable 'Developer mode' (top right)"
    echo "3. Click 'Load unpacked' and select this directory"
    echo "4. The extension should appear in your toolbar"
    echo ""
    echo "📱 To test sync:"
    echo "1. Install extension on multiple Chrome browsers (same Google account)"
    echo "2. Add journal entries on one device"
    echo "3. Check if they appear on other devices automatically"

# Deploy web version to GitHub Pages (commits and pushes)
deploy:
    git add .
    git commit -m "Deploy latest version"
    git push origin master
    echo "🚀 Deployed to https://srid.github.io/haietmoba"

# Clean up generated files
clean:
    rm -rf dist/
    echo "🧹 Cleaned up build artifacts"

# Show project info
info:
    @echo "📱 HAIETMOBA - How am I experiencing this moment of being alive?"
    @echo ""
    @echo "🌐 Web App: https://srid.github.io/haietmoba"
    @echo "📦 Chrome Extension: Load unpacked from this directory"
    @echo "🔗 Repository: https://github.com/srid/haietmoba"
    @echo "✨ Features: Cross-device sync, mood tracking, timeline view"