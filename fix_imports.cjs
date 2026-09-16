const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const imports = `
import imgDap from './assets/images/dap_fertilizer_bag_1789537001954.jpg';
import imgPump from './assets/images/irrigation_water_pump_1789537012954.jpg';
import imgMaize from './assets/images/maize_seeds_bag_1789537024362.jpg';
import imgSprayer from './assets/images/backpack_sprayer_1789537034152.jpg';
import imgPoultry from './assets/images/poultry_feed_sack_1789537045322.jpg';
import imgSunflowers from './assets/images/sunflower_seeds_1789537055135.jpg';
import imgTarpaulin from './assets/images/blue_tarpaulin_1789537065716.jpg';
import imgChaffCutter from './assets/images/chaff_cutter_1789537075638.jpg';
import imgGrainBags from './assets/images/grain_storage_bags_1789537087191.jpg';
import imgHerbicide from './assets/images/herbicide_jerrycan_1789537098028.jpg';
import imgFarmTools from './assets/images/farming_tools_kit_1789537108300.jpg';
import imgUrea from './assets/images/urea_fertilizer_sack_1789537119091.jpg';

import imgSolar200W from './assets/images/solar_panel_200w_1789537129783.jpg';
import imgSolarBattery from './assets/images/solar_battery_100ah_1789537140689.jpg';
import imgSolarHeater from './assets/images/solar_water_heater_1789537151734.jpg';
import imgSolarInverter from './assets/images/solar_inverter_1000w_1789537161233.jpg';
import imgSolarStreet from './assets/images/solar_street_light_1789537172548.jpg';
import imgSolarGarden from './assets/images/solar_garden_lights_1789537183127.jpg';
import imgSolarGen from './assets/images/portable_solar_generator_1789537195320.jpg';
import imgSolarMppt from './assets/images/mppt_charge_controller_1789537205902.jpg';
import imgSolarFoldable from './assets/images/foldable_solar_panel_1789537216344.jpg';
import imgSolarSubPump from './assets/images/submersible_solar_pump_1789537226900.jpg';
import imgSolarCctv from './assets/images/solar_cctv_camera_1789537236789.jpg';
import imgSolarFan from './assets/images/solar_standing_fan_1789537246446.jpg';

// Re-map images in procedural generator just in case
const genericFarmImg = imgFarmTools;
const genericSolarImg = imgSolar200W;
`;

if (!content.includes('import imgDap')) {
  // Just prepend it to the file
  content = imports + '\n' + content;
  fs.writeFileSync('src/data.ts', content);
  console.log("Added imports successfully.");
} else {
  console.log("Imports already present.");
}
