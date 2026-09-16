const fs = require('fs');

async function getExactImage(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&pithumbsize=400`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.query || !data.query.pages) return null;
    const pages = Object.values(data.query.pages);
    for (const p of pages) {
      if (p.thumbnail && p.thumbnail.source && !p.thumbnail.source.endsWith('.svg.png')) {
        return p.thumbnail.source;
      }
    }
  } catch(e) {}
  return null;
}

async function main() {
  const queries = [
    "sack of fertilizer", "irrigation water pump", "maize seeds corn", "backpack sprayer pesticide",
    "poultry feed chicken", "sunflower seeds", "tarpaulin plastic", "chaff cutter machine",
    "grain storage sacks", "herbicide chemical", "farming tools hoe", "urea fertilizer sack",
    "solar panel", "deep cycle battery solar", "solar water heater", "solar inverter",
    "solar street light", "solar garden light", "portable solar generator", "solar charge controller",
    "foldable solar panel", "solar submersible pump", "cctv camera", "solar fan"
  ];
  
  const results = {};
  for (const q of queries) {
    results[q] = await getExactImage(q);
  }
  console.log(JSON.stringify(results, null, 2));
}
main();
