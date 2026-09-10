const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// 1. Add clothing master list
const clothingStr = `
export const masterClothingProducts: ProductTemplate[] = [
  { name: "Men's Suit", price: 180000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80", description: "Men's Suit" },
  { name: "Designer Dress", price: 150000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80", description: "Designer Dress" },
  { name: "Denim Jacket", price: 120000, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80", description: "Denim Jacket" },
  { name: "Leather Shoes", price: 200000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80", description: "Leather Shoes" },
  { name: "Summer Blouse", price: 110000, image: "https://images.unsplash.com/photo-1564257631407-4deec8caa40d?auto=format&fit=crop&w=400&q=80", description: "Summer Blouse" },
  { name: "Sports Sneakers", price: 160000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", description: "Sports Sneakers" }
];
`;

code = code.replace(/export const masterIndustrialProducts: ProductTemplate\[\] = \[/s, clothingStr + '\nexport const masterIndustrialProducts: ProductTemplate[] = [');

// 2. Change 10 to 12
code = code.replace(/page1Items\.length < 10/g, "page1Items.length < 12");
code = code.replace(/page2Items\.length < 10/g, "page2Items.length < 12");

// For page 3, we add masterIndustrialProducts AND masterClothingProducts
// find this block:
/*
  masterIndustrialProducts.forEach(p => {
    const k = normalizeProductKey(p.name);
    if (page3Items.length < 10 && !activeProducts.has(k) && !PERMANENTLY_RETIRED_PRODUCTS.has(k)) {
      activeProducts.add(k);
      page3Items.push(p);
    }
  });
*/
code = code.replace(/masterIndustrialProducts\.forEach\(p => \{/, 
`[...masterIndustrialProducts, ...masterClothingProducts].forEach(p => {`);
code = code.replace(/page3Items\.length < 10/g, "page3Items.length < 12");

code = code.replace(/const all30Templates =/g, 'const all36Templates =');
code = code.replace(/all30Templates\[i\]/g, 'all36Templates[i]');

// Change loop bound back to 36
code = code.replace(/for \(let i = 0; i < 30; i\+\+\)/, 'for (let i = 0; i < 36; i++)');

const targetCountryList30 = `const targetCountryList: string[] = [
    // Page 1 (10 orders)
    "Tanzania", "Kenya", "Uganda", "Rwanda", "Tanzania", "Burundi",
    "DR Congo", "Kenya", "South Africa", "Tanzania",

    // Page 2 (10 orders)
    "Kenya", "Tanzania", "Uganda", "Rwanda", "DR Congo", "Tanzania",
    "Burundi", "Kenya", "South Africa", "Tanzania",

    // Page 3 (10 orders)
    "Tanzania", "Kenya", "Uganda", "DR Congo", "Tanzania", "Rwanda",
    "Nigeria", "Burundi", "South Africa", "Tanzania"
  ];`;

const targetCountryList36 = `const targetCountryList: string[] = [
    // Page 1 (12 orders)
    "Tanzania", "Kenya", "Uganda", "Rwanda", "Tanzania", "Burundi",
    "DR Congo", "Kenya", "South Africa", "Tanzania", "Nigeria", "UAE",

    // Page 2 (12 orders)
    "Kenya", "Tanzania", "Uganda", "Rwanda", "DR Congo", "Tanzania",
    "Burundi", "Kenya", "South Africa", "Tanzania", "Zambia", "Malawi",

    // Page 3 (12 orders)
    "Tanzania", "Kenya", "Uganda", "DR Congo", "Tanzania", "Rwanda",
    "Nigeria", "Burundi", "South Africa", "Tanzania", "UAE", "Kenya"
  ];`;

code = code.replace(targetCountryList30, targetCountryList36);

// Update validations
code = code.replace(/data\.orders\.length !== 30/g, "data.orders.length !== 36");
code = code.replace(/expected exactly 30/g, "expected exactly 36");

code = code.replace(/const p1 = data\.orders\.slice\(0, 10\);/g, "const p1 = data.orders.slice(0, 12);");
code = code.replace(/const p2 = data\.orders\.slice\(10, 20\);/g, "const p2 = data.orders.slice(12, 24);");
code = code.replace(/const p3 = data\.orders\.slice\(20, 30\);/g, "const p3 = data.orders.slice(24, 36);");

code = code.replace(/if \(setP1\.size !== 10\)/g, "if (setP1.size !== 12)");
code = code.replace(/if \(setP2\.size !== 10\)/g, "if (setP2.size !== 12)");
code = code.replace(/if \(setP3\.size !== 10\)/g, "if (setP3.size !== 12)");

// Bump version
code = code.replace(/STORAGE_VERSION_TAG = "ov_v14_fixed_validation"/g, 'STORAGE_VERSION_TAG = "ov_v15_added_clothes"');

fs.writeFileSync('src/data.ts', code);
console.log("Updated data.ts");
