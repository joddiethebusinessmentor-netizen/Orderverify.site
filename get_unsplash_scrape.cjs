const fs = require('fs');
const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const queries = [
    "fertilizer bag", "water pump irrigation", "corn seeds", "pesticide sprayer backpack",
    "chicken feed", "sunflower seeds", "tarpaulin", "farm machine",
    "grain sacks", "jerrycan", "farming tools hoe", "urea bag",
    "solar panel", "solar battery", "solar water heater", "solar inverter",
    "solar street light", "garden light", "portable generator", "solar charge controller",
    "foldable solar panel", "submersible pump", "cctv camera", "standing fan"
  ];
  
  const results = {};
  for (const q of queries) {
    const html = await fetchHtml(`https://unsplash.com/s/photos/${encodeURIComponent(q)}`);
    // find first image match
    const match = html.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?[\w=&]+/);
    if (match) {
      // replace formatting to standard
      let url = match[0].split('?')[0] + "?w=400&q=80";
      results[q] = url;
    } else {
      results[q] = "Not found";
    }
  }
  console.log(JSON.stringify(results, null, 2));
}
main();
