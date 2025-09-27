// Simple SVG to PNG converter for Chrome extension icons
const fs = require('fs');

// For browser-based conversion, we'll create a simple HTML file that does the conversion
const htmlConverter = `
<!DOCTYPE html>
<html>
<head><title>Icon Converter</title></head>
<body>
<canvas id="canvas16" width="16" height="16" style="border:1px solid black"></canvas>
<canvas id="canvas48" width="48" height="48" style="border:1px solid black"></canvas>  
<canvas id="canvas128" width="128" height="128" style="border:1px solid black"></canvas>
<div id="downloads"></div>

<script>
const svgData = \`${fs.readFileSync('journal-icon.svg', 'utf8')}\`;

function createIcon(size) {
    const canvas = document.getElementById('canvas' + size);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        ctx.drawImage(img, 0, 0, size, size);
        
        // Create download link
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'icon' + size + '.png';
            a.textContent = 'Download ' + size + 'x' + size + ' PNG';
            a.style.display = 'block';
            document.getElementById('downloads').appendChild(a);
        });
    };
    
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml'});
    const svgUrl = URL.createObjectURL(svgBlob);
    img.src = svgUrl;
}

// Create all sizes
createIcon(16);
createIcon(48);  
createIcon(128);
</script>
</body>
</html>
`;

fs.writeFileSync('icon-converter.html', htmlConverter);
console.log('Created icon-converter.html - open in browser to download PNG icons');