const fs = require('fs');

async function getImages(query) {
  try {
    const res = await fetch(`https://unsplash.com/napi/search/photos?query=${query}&per_page=12`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const data = await res.json();
    return data.results.map(r => r.urls.small);
  } catch(e) {
    console.log("Error fetching " + query, e.message);
    return [];
  }
}

async function main() {
  const agri = await getImages('agriculture');
  const solar = await getImages('solar%20panel');
  console.log("AGRI:", agri);
  console.log("SOLAR:", solar);
}
main();
