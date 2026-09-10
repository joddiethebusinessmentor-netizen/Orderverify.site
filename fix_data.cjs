const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// Replace imports
const newImports = `
import airPurifierImg from "./assets/images/air_purifier_1789046401231.jpg";
import bluetoothSpeakerImg from "./assets/images/bluetooth_speaker_1789046601734.jpg";
import breadOvenImg from "./assets/images/bread_oven_1789046380485.jpg";
import breakfastGriddleImg from "./assets/images/breakfast_griddle_1789046519746.jpg";
import castIronGrillImg from "./assets/images/cast_iron_grill_1789046502889.jpg";
import ceramicDishesImg from "./assets/images/ceramic_dishes_1789046485920.jpg";
import digitalTabletImg from "./assets/images/digital_tablet_1789046671677.jpg";
import dslrCameraImg from "./assets/images/dslr_camera_lens_1789028805582.jpg";
import fryingPanImg from "./assets/images/frying_pan_1789046463785.jpg";
import gameConsoleImg from "./assets/images/game_console_1789046635274.jpg";
import iceCreamMakerImg from "./assets/images/ice_cream_maker_1789046430315.jpg";
import kitchenScaleImg from "./assets/images/kitchen_scale_1789046341402.jpg";
import laserTempGunImg from "./assets/images/laser_temp_gun_1789046752653.jpg";
import mechanicToolboxImg from "./assets/images/mechanic_toolbox_1789046768121.jpg";
import metalCutSawImg from "./assets/images/metal_cut_saw_1789046736190.jpg";
import microscopeImg from "./assets/images/microscope_1789046700293.jpg";
import multimeterImg from "./assets/images/multimeter_1789046685788.jpg";
import projectorImg from "./assets/images/projector_1789046539460.jpg";
import smartwatchImg from "./assets/images/smartwatch_1789046569329.jpg";
import studioMicImg from "./assets/images/studio_mic_1789046657218.jpg";
import tabletopStoveImg from "./assets/images/tabletop_stove_1789046449616.jpg";
import vrHeadsetImg from "./assets/images/vr_headset_1789046554655.jpg";
import waterBoilerImg from "./assets/images/water_boiler_1789046364665.jpg";
import weldingMachineImg from "./assets/images/welding_machine_1789046717800.jpg";
import wifiRouterImg from "./assets/images/wifi_router_1789046584997.jpg";
import wirelessChargerImg from "./assets/images/wireless_charger_1789046617340.jpg";
import airCompressorImg from "./assets/images/air_compressor_tank_1789028891849.jpg";
import demolitionHammerImg from "./assets/images/demolition_jackhammer_1789028939535.jpg";
import floorScrubberImg from "./assets/images/floor_scrubber_1789028954800.jpg";
import metalGrindingMachineImg from "./assets/images/metal_grinding_machine_1789028825448.jpg";
import oilPressMachineImg from "./assets/images/oil_press_machine_1789028847105.jpg";
import waterPumpImg from "./assets/images/petrol_water_pump_1789028875127.jpg";
`;

code = code.replace(/import cameraImg.*?\n\n/s, newImports + "\n");

// Replace masterHomeProducts
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
  { name: "Water Boiler", price: 195000, image: waterBoilerImg, description: "Water Boiler" },
  { name: "Microwave Oven", price: 210000, image: breadOvenImg, description: "Microwave Oven" },
  { name: "Coffee Maker", price: 155000, image: waterBoilerImg, description: "Coffee Maker" }
];`;
code = code.replace(/export const masterHomeProducts.*?\];/s, newHome);

// Replace masterTechProducts
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
  { name: "Wireless Charger", price: 185000, image: wirelessChargerImg, description: "Wireless Charger" },
  { name: "Wireless Earbuds", price: 150000, image: bluetoothSpeakerImg, description: "Wireless Earbuds" },
  { name: "Laptop Stand", price: 135000, image: digitalTabletImg, description: "Laptop Stand" }
];`;
code = code.replace(/export const masterTechProducts.*?\];/s, newTech);

// Replace masterIndustrialProducts
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
  { name: "Oil Press Machine", price: 420000, image: oilPressMachineImg, description: "Oil Press Machine" },
  { name: "Water Pump", price: 410000, image: waterPumpImg, description: "Water Pump" },
  { name: "Welding Machine", price: 390000, image: weldingMachineImg, description: "Welding Machine" }
];`;
code = code.replace(/export const masterIndustrialProducts.*?\];/s, newInd);

// Fix generateFreshProceduralProduct 
const newGen = `export function generateFreshProceduralProduct(category: "home" | "tech" | "industrial", usedKeys: Set<string>): ProductTemplate {
  const homeBases = ["Gas Stove", "Electric Oven", "Air Purifier", "Ceramic Pan", "Water Dispenser", "Digital Scale", "Dinnerware Set", "Blender"];
  const techBases = ["Cinema Projector", "VR Goggles", "Microphone", "DSLR Camera", "Health Watch", "Wi-Fi Router", "Digital Microscope", "Waterproof Speaker"];
  const industrialBases = ["Metal Cutter", "Petrol Water Pump", "Toolbox", "Nail Gun", "Laser Thermometer", "Air Compressor", "Welding Machine"];

  const modifiers = ["Pro", "Max", "Plus", "Ultra", "Elite", "Premium", "HD"];

  let baseList = homeBases;
  if (category === "tech") baseList = techBases;
  if (category === "industrial") baseList = industrialBases;

  let attempts = 0;
  while (attempts < 100) {
    const base = baseList[Math.floor(Math.random() * baseList.length)];
    const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
    const newName = \`\${base} \${mod}\`;
    const newKey = normalizeProductKey(newName);
    
    if (!usedKeys.has(newKey) && !PERMANENTLY_RETIRED_PRODUCTS.has(newKey)) {
      let image = airPurifierImg;
      if (category === "tech") image = smartwatchImg;
      if (category === "industrial") image = multimeterImg;
      
      return {
        name: newName,
        price: 150000 + Math.floor(Math.random() * 25) * 10000,
        image: image,
        description: newName
      };
    }
    attempts++;
  }
  
  return {
    name: "Standard Product " + Math.floor(Math.random() * 10000),
    price: 100000,
    image: airPurifierImg,
    description: "Standard Product"
  };
}`;
code = code.replace(/export function generateFreshProceduralProduct.*?return \{.*?description: "Standard Product".*?\};.*?\}/s, newGen);

fs.writeFileSync('src/data.ts', code);
console.log("Done");
