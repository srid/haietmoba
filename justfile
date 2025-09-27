# HAIETMOBA Journal App - Development Commands

# Default target - show available commands
default:
    @just --list

# Open the local web version in default browser
open:
    #!/bin/bash
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open index.html
    else
        xdg-open index.html
    fi

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



# Clean up generated files
clean:
    rm -rf dist/
    echo "🧹 Cleaned up build artifacts"

