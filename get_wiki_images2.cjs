const fs = require('fs');

async function searchWiki(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=${query}&gsrlimit=30&pithumbsize=400`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data.query.pages;
  return Object.values(pages).map(p => p.thumbnail ? p.thumbnail.source : null).filter(x => x && !x.endsWith('.svg.png') && !x.endsWith('.gif')).slice(0, 12);
}

async function main() {
  const agri = await searchWiki('agriculture tractor farm fertilizer');
  const solar = await searchWiki('solar panel photovoltaics');
  
  let content = fs.readFileSync('src/data.ts', 'utf8');

  // Match the existing masterHomeProducts block and replace images
  let hMatch = content.match(/export const masterHomeProducts: ProductTemplate\[\] = \[([\s\S]*?)\];/);
  if (hMatch) {
    let lines = hMatch[1].split('\n').filter(l => l.trim().length > 0);
    for (let i = 0; i < Math.min(lines.length, agri.length); i++) {
       lines[i] = lines[i].replace(/image: "[^"]*"/, `image: "${agri[i]}"`);
    }
    content = content.replace(hMatch[1], '\n' + lines.join('\n') + '\n');
  }

  // Match the existing masterTechProducts block and replace images
  let tMatch = content.match(/export const masterTechProducts: ProductTemplate\[\] = \[([\s\S]*?)\];/);
  if (tMatch) {
    let lines = tMatch[1].split('\n').filter(l => l.trim().length > 0);
    for (let i = 0; i < Math.min(lines.length, solar.length); i++) {
       lines[i] = lines[i].replace(/image: "[^"]*"/, `image: "${solar[i]}"`);
    }
    content = content.replace(tMatch[1], '\n' + lines.join('\n') + '\n');
  }

  content = content.replace(/STORAGE_VERSION_TAG = "ov_v[0-9a-z_]+"/, 'STORAGE_VERSION_TAG = "ov_v51_wiki_images"');

  fs.writeFileSync('src/data.ts', content);
  console.log("Updated data.ts with robust Wikimedia images!");
}
main();
