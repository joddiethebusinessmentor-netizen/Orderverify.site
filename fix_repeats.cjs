const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// 1. Update comments just in case
code = code.replace(/Exactly 36 Customer Orders \(12 Page 1, 12 Page 2, 12 Page 3\)/g, "Exactly 30 Customer Orders (10 Page 1, 10 Page 2, 10 Page 3)");
code = code.replace(/All 36 products/g, "All 30 products");

// 2. Fix masterHomeProducts array to have exactly 10 distinct items
const newHome = `export const masterHomeProducts: ProductTemplate[] = [
  { name: "Air Purifier", price: 340000, image: airPurifierImg, description: "Air Purifier" },
  { name: "Bread Oven", price: 395000, image: breadOvenImg, description: "Bread Oven" },
  { name: "Breakfast Griddle", price: 165000, image: breakfastGriddleImg, description: "Breakfast Griddle" },
  { name: "Cast Iron Grill", price: 215000, image: castIronGrillImg, description: "Cast Iron Grill" },
  { name: "Ceramic Dishes", price: 175000, image: ceramicDishesImg, description: "Ceramic Dishes" },
  { name: "Frying Pan", price: 230000, image: fryingPanImg, description: "Frying Pan" },
  { name: "Ice Cream Maker", price: 260000, image: iceCreamMakerImg, description: "Ice Cream Maker" },
  { name: "Kitchen Scale", price: 145000, image: kitchenScaleImg, description: "Kitchen Scale" },
  { name: "Tabletop Stove", price: 285000, image: tabletopStoveImg, description: "Tabletop Stove" },
  { name: "Water Boiler", price: 195000, image: waterBoilerImg, description: "Water Boiler" }
];`;
code = code.replace(/export const masterHomeProducts: ProductTemplate\[\] = \[.*?\];/s, newHome);

// 3. Fix masterTechProducts array to have exactly 10 distinct items
const newTech = `export const masterTechProducts: ProductTemplate[] = [
  { name: "Bluetooth Speaker", price: 195000, image: bluetoothSpeakerImg, description: "Bluetooth Speaker" },
  { name: "Digital Tablet", price: 470000, image: digitalTabletImg, description: "Digital Tablet" },
  { name: "DSLR Camera", price: 345000, image: dslrCameraImg, description: "DSLR Camera" },
  { name: "Game Console", price: 320000, image: gameConsoleImg, description: "Game Console" },
  { name: "Projector", price: 460000, image: projectorImg, description: "Projector" },
  { name: "Smartwatch", price: 290000, image: smartwatchImg, description: "Smartwatch" },
  { name: "Studio Microphone", price: 215000, image: studioMicImg, description: "Studio Microphone" },
  { name: "VR Headset", price: 380000, image: vrHeadsetImg, description: "VR Headset" },
  { name: "Wi-Fi Router", price: 285000, image: wifiRouterImg, description: "Wi-Fi Router" },
  { name: "Wireless Charger", price: 185000, image: wirelessChargerImg, description: "Wireless Charger" }
];`;
code = code.replace(/export const masterTechProducts: ProductTemplate\[\] = \[.*?\];/s, newTech);

// 4. Fix masterIndustrialProducts array to have exactly 10 distinct items
const newInd = `export const masterIndustrialProducts: ProductTemplate[] = [
  { name: "Air Compressor", price: 470000, image: airCompressorImg, description: "Air Compressor" },
  { name: "Demolition Hammer", price: 465000, image: demolitionHammerImg, description: "Demolition Hammer" },
  { name: "Floor Scrubber", price: 485000, image: floorScrubberImg, description: "Floor Scrubber" },
  { name: "Laser Temp Gun", price: 220000, image: laserTempGunImg, description: "Laser Temp Gun" },
  { name: "Mechanic Toolbox", price: 345000, image: mechanicToolboxImg, description: "Mechanic Toolbox" },
  { name: "Metal Cut Saw", price: 440000, image: metalCutSawImg, description: "Metal Cut Saw" },
  { name: "Metal Grinder", price: 310000, image: metalGrindingMachineImg, description: "Metal Grinder" },
  { name: "Microscope", price: 395000, image: microscopeImg, description: "Microscope" },
  { name: "Multimeter", price: 195000, image: multimeterImg, description: "Multimeter" },
  { name: "Oil Press Machine", price: 420000, image: oilPressMachineImg, description: "Oil Press Machine" }
];`;
code = code.replace(/export const masterIndustrialProducts: ProductTemplate\[\] = \[.*?\];/s, newInd);

// 5. Fix the loop generation limits from 12 to 10
code = code.replace(/page1Items\.length < 12/g, "page1Items.length < 10");
code = code.replace(/page2Items\.length < 12/g, "page2Items.length < 10");
code = code.replace(/page3Items\.length < 12/g, "page3Items.length < 10");

// 6. Update the storage version tag again so the app forces a refresh and clears the cache
code = code.replace(/STORAGE_VERSION_TAG = "ov_v11_english_fixed_images"/g, 'STORAGE_VERSION_TAG = "ov_v12_no_duplicates"');

fs.writeFileSync('src/data.ts', code);
console.log("Updated limits to 10 per page, eliminated duplicates, bumped cache version.");
