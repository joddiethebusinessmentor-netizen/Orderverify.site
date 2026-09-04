const fs = require('fs');
let metadata = JSON.parse(fs.readFileSync('metadata.json', 'utf8'));
metadata.name = "Orderverify.site";
fs.writeFileSync('metadata.json', JSON.stringify(metadata, null, 2));

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<title>.*<\/title>/, '<title>Orderverify.site</title>');
fs.writeFileSync('index.html', html);
