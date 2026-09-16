const fs = require('fs');

async function searchWiki(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=${query}&gsrlimit=12&pithumbsize=400`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data.query.pages;
  return Object.values(pages).map(p => p.thumbnail ? p.thumbnail.source : null).filter(x => x);
}

async function main() {
  const agri = await searchWiki('agriculture tractor farm fertilizer');
  const solar = await searchWiki('solar panel photovoltaics');
  console.log("AGRI:", agri);
  console.log("SOLAR:", solar);
}
main();
