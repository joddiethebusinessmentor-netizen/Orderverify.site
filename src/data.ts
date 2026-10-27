// ============================================================================
// ORDERVERIFY DATA ENGINE (VERSION 154 - WATER & OIL WELL CONSTRUCTION PAGE 3)
// ============================================================================
// Page 1: Vifaa vya Ujenzi wa Barabara na Madaraja (Road & Bridge Construction Equipment)
// Page 2: Vifaa vya Ujenzi wa Nyumba na Maghorofa (Building & High-Rise Construction Equipment)
// Page 3: Vifaa vya Ujenzi wa Visima vya Maji na Mafuta (Water & Oil Well Construction Equipment)
// Malipo: 5% (Math.round(productValue * 0.05))
// Zero duplicate names across Orders, Live Notifications, and Comments.
// ============================================================================

import imgJawRockCrusher from "./assets/images/jaw_rock_crusher_1790256407898.jpg";
import imgSlurryDewateringPump from "./assets/images/mining_slurry_pump_1790256438122.jpg";
import imgBridgeCraneScale from "./assets/images/crane_freight_scale_1790258316741.jpg";
import imgBridgeCableWinch from "./assets/images/electric_cargo_winch_1790258223028.jpg";
import imgGirderRollerSkates from "./assets/images/machinery_moving_skates_1790258303733.jpg";
import imgHydraulicMaterialJack from "./assets/images/hydraulic_pallet_truck_1790258207851.jpg";
import imgTunnelVentilationBlower from "./assets/images/mining_ventilation_blower_1790256502211.jpg";
import imgHighwaySolarStreetLight from "./assets/images/solar_street_light_1789537172548.jpg";
import imgBridgeBoltingToolChest from "./assets/images/mechanic_toolbox_1789046768121.jpg";
import imgAsphaltLaserThermometer from "./assets/images/laser_temp_gun_1789046752653.jpg";
import imgBridgeRatchetStraps from "./assets/images/cargo_ratchet_straps_1790258261372.jpg";
import imgRoadCuringTarpaulin from "./assets/images/truck_cargo_tarpaulin_1790258286863.jpg";

import imgConcreteMixerMachine from "./assets/images/concrete_mixer_machine_1790064880449.jpg";
import imgDiamondCoreDrill from "./assets/images/diamond_core_drill_1790256465596.jpg";
import imgGreenLaserLevel from "./assets/images/green_laser_level_1790064891481.jpg";
import imgPneumaticJackhammer from "./assets/images/pneumatic_rock_drill_1790256396223.jpg";
import imgConcreteVibratorPoker from "./assets/images/concrete_vibrator_poker_1790064913250.jpg";
import imgMetalCutSaw from "./assets/images/metal_cut_saw_1789046736190.jpg";
import imgCordlessHammerDrill from "./assets/images/cordless_hammer_drill_1790064868417.jpg";
import imgCeramicTileCutter from "./assets/images/ceramic_tile_cutter_1790064902501.jpg";
import imgWeldingMachine from "./assets/images/welding_machine_1789046717800.jpg";
import imgTelescopicLadder from "./assets/images/telescopic_ladder_1790064923864.jpg";
import imgAirCompressorTank from "./assets/images/air_compressor_tank_1789028891849.jpg";
import imgStairCargoTrolley from "./assets/images/stair_cargo_trolley_1790258245929.jpg";

import imgBoreholeSubmersiblePump from "./assets/images/submersible_solar_pump_1789537226900.jpg";
import imgDieselDrillingMudPump from "./assets/images/irrigation_water_pump_1789537012954.jpg";
import imgWellFlushingTestPump from "./assets/images/petrol_water_pump_1789028875127.jpg";
import imgOilWellExtractionPump from "./assets/images/car_fuel_pump_mod_1790462831255.jpg";
import imgWellheadFlowValve from "./assets/images/car_throttle_body_1790462808489.jpg";
import imgBoreholeCasingWinch from "./assets/images/boat_trailer_winch_1791342187336.jpg";
import imgOilWellheadCompressor from "./assets/images/car_ac_compressor_1790462843485.jpg";
import imgDrillingRigStarterMotor from "./assets/images/car_starter_motor_1790462890861.jpg";
import imgWellPumpVoltageStabilizer from "./assets/images/automatic_voltage_stabilizer_avr_5000va_1790728096362.jpg";
import imgSolarBoreholeMpptController from "./assets/images/mppt_charge_controller_1789537205902.jpg";
import imgCrudeOilWaterDistiller from "./assets/images/lab_distillation_set_1790463451879.jpg";
import imgBoreholePumpMultimeter from "./assets/images/multimeter_1789046685788.jpg";

export interface Order {
  id: number;
  name: string;
  gender: "male" | "female";
  country: string;
  flag: string;
  city: string;
  product: string;
  productValue: number;
  payout: number;
  avatar: string;
  productImage: string;
  productDescription?: string;
}

export interface LivePayout {
  id: number;
  name: string;
  rawTzsAmount: number;
  amountStr: string;
  tzsStr: string;
}

export interface CommentReply {
  id: number;
  name: string;
  text: string;
  time: string;
}

export interface CommentItem {
  id: number;
  name: string;
  location?: string;
  text: string;
  tag?: string;
  time: string;
  replies: CommentReply[];
}

export interface ProductTemplate {
  name: string;
  price: number;
  image: string;
  description: string;
}

// Rates and currency formatting
export const countryRates: Record<string, { curr: string; rate: number }> = {
  "Tanzania": { curr: "TZS", rate: 1 },
  "Kenya": { curr: "KES", rate: 0.05 },
  "Uganda": { curr: "UGX", rate: 1.45 },
  "Congo (DRC)": { curr: "FC", rate: 1.15 },
  "Rwanda": { curr: "RWF", rate: 0.5 },
  "Burundi": { curr: "BIF", rate: 1.1 },
  "South Africa": { curr: "ZAR", rate: 0.007 },
  "Nigeria": { curr: "NGN", rate: 0.55 },
  "Ghana": { curr: "GHS", rate: 0.0055 },
  "Zambia": { curr: "ZMW", rate: 0.01 },
  "Mozambique": { curr: "MZN", rate: 0.024 }
};

export const formatLocalCurrency = (tzsAmount: number, countryName: string) => {
  const config = countryRates[countryName] || { curr: "TZS", rate: 1 };
  const localAmount = tzsAmount * config.rate;
  if (["USD", "GBP", "AED", "EUR"].includes(config.curr)) {
    return `${config.curr} ${localAmount.toFixed(2)}`;
  }
  return `${config.curr} ${Math.round(localAmount).toLocaleString()}`;
};

export function extractBaseName(fullName: string): string {
  if (!fullName) return "";
  const clean = fullName.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
  return clean.split(/\s+/)[0] || "";
}

export function normalizeProductKey(productName: string): string {
  return productName.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

// STORAGE VERSION TAG - Bumped to clear all client memory & cached orders
export const STORAGE_VERSION_TAG = "ov_v155_fresh_comments_and_live_notifications";
const STORAGE_KEY_VERSION = "orderverify_app_version";
const STORAGE_KEY_ACTIVE_ORDERS = "orderverify_active_orders";
const STORAGE_KEY_ACTIVE_PAYOUTS = "orderverify_active_payouts";
const STORAGE_KEY_ACTIVE_COMMENTS = "orderverify_active_comments";

const memoryStorage: Record<string, string> = {};

function storageGet(key: string): string | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {}
  return memoryStorage[key] || null;
}

function storageSet(key: string, value: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {}
  memoryStorage[key] = value;
}

function storageRemove(key: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (e) {}
  delete memoryStorage[key];
}

// ============================================================================
// 36 MASTER VERIFIED ORDERS (12 PER PAGE, ACCURATE CATEGORIES & PRICING)
// ============================================================================

export const MASTER_EXACT_ORDERS: Order[] = [
  // --------------------------------------------------------------------------
  // UKURASA WA 1: Vifaa vya Ujenzi wa Barabara na Madaraja (Road & Bridge Construction Equipment - Picha Halisi za Bidhaa Zenyewe) - 100k - 800k TZS
  // --------------------------------------------------------------------------
  {
    id: 1,
    name: "Omary Mwakasege",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dar es Salaam",
    product: "Road Aggregate Jaw Crusher Machine",
    productValue: 785000,
    payout: 39250,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    productImage: imgJawRockCrusher
  },
  {
    id: 2,
    name: "Kelvin Omondi",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nairobi",
    product: "Bridge Foundation Slurry Dewatering Pump",
    productValue: 690000,
    payout: 34500,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    productImage: imgSlurryDewateringPump
  },
  {
    id: 3,
    name: "Salma Mwakalukwa",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dodoma",
    product: "30-Ton Bridge Crane Hanging Scale",
    productValue: 740000,
    payout: 37000,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    productImage: imgBridgeCraneScale
  },
  {
    id: 4,
    name: "Denis Ssekandi",
    gender: "male",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Kampala",
    product: "13000Lbs Heavy-Duty Bridge Cable Winch",
    productValue: 640000,
    payout: 32000,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    productImage: imgBridgeCableWinch
  },
  {
    id: 5,
    name: "Athumani Mzava",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Tanga",
    product: "Heavy-Duty Bridge Girder Roller Skates",
    productValue: 530000,
    payout: 26500,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    productImage: imgGirderRollerSkates
  },
  {
    id: 6,
    name: "Olivier Habimana",
    gender: "male",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Kigali",
    product: "3-Ton Hydraulic Curbstone & Material Jack",
    productValue: 590000,
    payout: 29500,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgHydraulicMaterialJack
  },
  {
    id: 7,
    name: "Wanjiku Kamau",
    gender: "female",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nakuru",
    product: "Axial Tunnel & Bridge Culvert Blower Fan",
    productValue: 460000,
    payout: 23000,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    productImage: imgTunnelVentilationBlower
  },
  {
    id: 8,
    name: "Suleiman Mapunda",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mwanza",
    product: "Highway & Bridge Solar LED Street Light",
    productValue: 380000,
    payout: 19000,
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&q=80",
    productImage: imgHighwaySolarStreetLight
  },
  {
    id: 9,
    name: "Sipho Ndlovu",
    gender: "male",
    country: "South Africa",
    flag: "🇿🇦",
    city: "Pretoria",
    product: "Heavy-Duty Bridge Bolting Socket Tool Chest",
    productValue: 320000,
    payout: 16000,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    productImage: imgBridgeBoltingToolChest
  },
  {
    id: 10,
    name: "Tresor Tshibangu",
    gender: "male",
    country: "Congo (DRC)",
    flag: "🇨🇩",
    city: "Lubumbashi",
    product: "Infrared Asphalt Paving Thermometer",
    productValue: 185000,
    payout: 9250,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    productImage: imgAsphaltLaserThermometer
  },
  {
    id: 11,
    name: "Halima Mwandambo",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Arusha",
    product: "Bridge Beam Tension Ratchet Straps Set",
    productValue: 145000,
    payout: 7250,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    productImage: imgBridgeRatchetStraps
  },
  {
    id: 12,
    name: "Mutale Bwalya",
    gender: "male",
    country: "Zambia",
    flag: "🇿🇲",
    city: "Ndola",
    product: "Waterproof Road Concrete Curing Tarpaulin",
    productValue: 230000,
    payout: 11500,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    productImage: imgRoadCuringTarpaulin
  },

  // --------------------------------------------------------------------------
  // UKURASA WA 2: Vifaa vya Ujenzi wa Nyumba na Maghorofa (Building & High-Rise Construction Equipment - Picha Halisi za Bidhaa Zenyewe) - 100k - 600k TZS
  // --------------------------------------------------------------------------
  {
    id: 13,
    name: "Selemani Mkude",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dar es Salaam",
    product: "Electric Concrete Mixer Machine",
    productValue: 590000,
    payout: 29500,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    productImage: imgConcreteMixerMachine
  },
  {
    id: 14,
    name: "Geoffrey Kiprop",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nairobi",
    product: "Diamond Concrete Core Drilling Rig",
    productValue: 560000,
    payout: 28000,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    productImage: imgDiamondCoreDrill
  },
  {
    id: 15,
    name: "Subira Mwakipesile",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mbeya",
    product: "3D Green Beam Construction Laser Level",
    productValue: 240000,
    payout: 12000,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    productImage: imgGreenLaserLevel
  },
  {
    id: 16,
    name: "Ronald Tumusiime",
    gender: "male",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Kampala",
    product: "Pneumatic Concrete Breaker Jackhammer",
    productValue: 510000,
    payout: 25500,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    productImage: imgPneumaticJackhammer
  },
  {
    id: 17,
    name: "Jean-Claude Mugabo",
    gender: "male",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Kigali",
    product: "Electric Concrete Vibrator Poker",
    productValue: 280000,
    payout: 14000,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    productImage: imgConcreteVibratorPoker
  },
  {
    id: 18,
    name: "Lucas Masanja",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mwanza",
    product: "Industrial Rebar & Steel Cut-Off Saw",
    productValue: 340000,
    payout: 17000,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgMetalCutSaw
  },
  {
    id: 19,
    name: "Kagiso Molefe",
    gender: "male",
    country: "South Africa",
    flag: "🇿🇦",
    city: "Johannesburg",
    product: "Cordless Rotary Hammer Drill Kit",
    productValue: 390000,
    payout: 19500,
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&q=80",
    productImage: imgCordlessHammerDrill
  },
  {
    id: 20,
    name: "Hawa Mazengo",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dodoma",
    product: "Heavy-Duty Manual Ceramic Tile Cutter",
    productValue: 165000,
    payout: 8250,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    productImage: imgCeramicTileCutter
  },
  {
    id: 21,
    name: "Derrick Lungu",
    gender: "male",
    country: "Zambia",
    flag: "🇿🇲",
    city: "Lusaka",
    product: "Digital Inverter Arc Welding Machine",
    productValue: 310000,
    payout: 15500,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    productImage: imgWeldingMachine
  },
  {
    id: 22,
    name: "Faith Mutua",
    gender: "female",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Mombasa",
    product: "Multi-Purpose Aluminum Extension Ladder",
    productValue: 220000,
    payout: 11000,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    productImage: imgTelescopicLadder
  },
  {
    id: 23,
    name: "Adebayo Ogunleye",
    gender: "male",
    country: "Nigeria",
    flag: "🇳🇬",
    city: "Lagos",
    product: "Heavy-Duty Building Air Compressor",
    productValue: 450000,
    payout: 22500,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    productImage: imgAirCompressorTank
  },
  {
    id: 24,
    name: "Mateus Mabunda",
    gender: "male",
    country: "Mozambique",
    flag: "🇲🇿",
    city: "Maputo",
    product: "Stair-Climbing Building Material Trolley",
    productValue: 140000,
    payout: 7000,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    productImage: imgStairCargoTrolley
  },

  // --------------------------------------------------------------------------
  // UKURASA WA 3: Vifaa vya Ujenzi wa Visima vya Maji na Mafuta (Water & Oil Well Construction Equipment - Picha Halisi za Bidhaa Zenyewe) - 100k - 600k TZS
  // --------------------------------------------------------------------------
  {
    id: 25,
    name: "Ramadhani Mwakalebela",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dar es Salaam",
    product: "Deep Borehole Stainless Submersible Pump",
    productValue: 590000,
    payout: 29500,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    productImage: imgBoreholeSubmersiblePump
  },
  {
    id: 26,
    name: "Nakato Namuganza",
    gender: "female",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Kampala",
    product: "Diesel Borehole Drilling Mud & Water Pump",
    productValue: 550000,
    payout: 27500,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    productImage: imgDieselDrillingMudPump
  },
  {
    id: 27,
    name: "Mwangi Njoroge",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nairobi",
    product: "High-Flow Well Flushing & Test Pump 7HP",
    productValue: 480000,
    payout: 24000,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    productImage: imgWellFlushingTestPump
  },
  {
    id: 28,
    name: "Latifa Mwakinyo",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Tanga",
    product: "Submersible Oil Well Extraction Pump Unit",
    productValue: 430000,
    payout: 21500,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    productImage: imgOilWellExtractionPump
  },
  {
    id: 29,
    name: "Patrice Mutombo",
    gender: "male",
    country: "Congo (DRC)",
    flag: "🇨🇩",
    city: "Kinshasa",
    product: "Motorized Wellhead Pipeline Flow Valve",
    productValue: 340000,
    payout: 17000,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    productImage: imgWellheadFlowValve
  },
  {
    id: 30,
    name: "Jafari Mwakalindile",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mbeya",
    product: "2-Ton Borehole Casing & Pump Hoist Winch",
    productValue: 260000,
    payout: 13000,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    productImage: imgBoreholeCasingWinch
  },
  {
    id: 31,
    name: "Zena Mwakapugi",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dodoma",
    product: "Rotary Oil Wellhead Pressure Compressor",
    productValue: 460000,
    payout: 23000,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    productImage: imgOilWellheadCompressor
  },
  {
    id: 32,
    name: "Kofi Mensah",
    gender: "male",
    country: "Ghana",
    flag: "🇬🇭",
    city: "Accra",
    product: "Drilling Rig Diesel Engine Starter Motor",
    productValue: 285000,
    payout: 14250,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgDrillingRigStarterMotor
  },
  {
    id: 33,
    name: "Nasra Mwakipesa",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Morogoro",
    product: "5KVA Deep Well Pump Voltage Stabilizer",
    productValue: 310000,
    payout: 15500,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    productImage: imgWellPumpVoltageStabilizer
  },
  {
    id: 34,
    name: "Lunga Dlamini",
    gender: "male",
    country: "South Africa",
    flag: "🇿🇦",
    city: "Johannesburg",
    product: "Solar Borehole Water Pump MPPT Controller",
    productValue: 195000,
    payout: 9750,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    productImage: imgSolarBoreholeMpptController
  },
  {
    id: 35,
    name: "Chinedu Okafor",
    gender: "male",
    country: "Nigeria",
    flag: "🇳🇬",
    city: "Port Harcourt",
    product: "Crude Oil & Well Water Distillation Tester",
    productValue: 240000,
    payout: 12000,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgCrudeOilWaterDistiller
  },
  {
    id: 36,
    name: "Mercy Chepkirui",
    gender: "female",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Eldoret",
    product: "Borehole Pump Electrical Diagnostic Multimeter",
    productValue: 160000,
    payout: 8000,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    productImage: imgBoreholePumpMultimeter
  }
];

// ============================================================================
// BRAND NEW AUTHENTIC SWAHILI COMMENTS (40+ RICH EMOTIONAL ITEMS WITH EMOJIS)
// ============================================================================

export interface CommentTemplateDef {
  name: string;
  text: string;
  time: string;
  replies: { name: string; text: string; time: string }[];
}

export const rawSwahiliCommentsData: CommentTemplateDef[] = [
  {
    name: "Mariam Kihwele",
    text: "Wallahi sikutarajia kama nitapokea pesa haraka hivi, nimeomba kutoa saa nne asubuhi na meseji ya M-Pesa imeingia sasa hivi 😭🙏",
    time: "Dakika 1 iliyopita",
    replies: [
      { name: "Erick Mwandu", text: "Hongera sana dada, hata mimi jana nilitoa bila usumbufu wowote.", time: "Sasa hivi" }
    ]
  },
  {
    name: "Shabani Lugendo",
    text: "Hii kitu ni uhakika 100% hakuna cha kuumiza kichwa",
    time: "Dakika 3 zilizopita",
    replies: []
  },
  {
    name: "Vumilia Nchimbi",
    text: "Yaani nimeweza kulipa kodi ya chumba changu mwezi huu kupitia kamisheni za kuthibitisha order tu. Mungu awabariki sana OrderVerify ❤️🙌",
    time: "Dakika 5 zilizopita",
    replies: []
  },
  {
    name: "Fadhili Kanyama",
    text: "Kazi safi sana, ukiwa na bando lako tu unatengeneza pesa ukiwa nyumbani.",
    time: "Dakika 7 zilizopita",
    replies: []
  },
  {
    name: "Saumu Bwire",
    text: "Mwanzoni niliona kama hadithi za mtandaoni ila nilipojaribu mwenyewe nimebaki mdomo wazi, Tigo Pesa imesoma laki na themanini leo 🔥💸",
    time: "Dakika 10 zilizopita",
    replies: [
      { name: "Gideon Maganga", text: "Kabisa dada, uoga wetu ndio unatuchelewesha kupata maendeleo 👏", time: "Dakika 6 zilizopita" }
    ]
  },
  {
    name: "Ismail Mpangala",
    text: "Huduma nzuri na malipo yanaenda kwa wakati",
    time: "Dakika 14 zilizopita",
    replies: []
  },
  {
    name: "Sikudhani Ngonyani",
    text: "Nimefurahi sana kuona malipo yanaingia bila longolongo. Hii website imeniokoa sana kipindi hiki cha majukumu mengi ya familia 🥰",
    time: "Dakika 18 zilizopita",
    replies: []
  },
  {
    name: "Benson Kasebele",
    text: "Kila nikiingia kuthibitisha order napata nguvu mpya maana matokeo yake yanaonekana wazi kwenye simu yangu 📱💰",
    time: "Dakika 21 zilizopita",
    replies: []
  },
  {
    name: "Mwanaidi Lukinja",
    text: "Airtel Money imeingia chap bila kuchelewa, asanteni sana",
    time: "Dakika 25 zilizopita",
    replies: []
  },
  {
    name: "Tumsifu Mlowezi",
    text: "Nilianza kwa kuthibitisha order chache tu za majaribio, leo hii imekuwa sehemu yangu kubwa ya kuingiza kipato cha kila siku. Nawapongeza sana waanzilishi wa mfumo huu 🙏✨",
    time: "Dakika 30 zilizopita",
    replies: []
  },
  {
    name: "Farida Nditi",
    text: "Uhakika mtupu jamani msisite kujiunga 👌",
    time: "Dakika 34 zilizopita",
    replies: []
  },
  {
    name: "Nuhu Kalenga",
    text: "Nimetoka kununua mahitaji ya watoto wa shule kwa hela niliyoitoa hapa jana jioni. Sina cha kuwalipa zaidi ya kuwaombea heri",
    time: "Dakika 39 zilizopita",
    replies: []
  },
  {
    name: "Happiness Rwegasira",
    text: "Simu yangu sasa hivi imekuwa ofisi kamili, kila saa napiga kazi na salio linasoma vizuri 😍💵",
    time: "Dakika 44 zilizopita",
    replies: [
      { name: "Stanley Byabato", text: "Safi sana, tuendelee kuchangamkia fursa hii.", time: "Dakika 29 zilizopita" }
    ]
  },
  {
    name: "Rajabu Mponda",
    text: "Hapa ni kazi na malipo tu hakuna blabla",
    time: "Dakika 48 zilizopita",
    replies: []
  },
  {
    name: "Mwanahamisi Kibao",
    text: "Nilikuwa nimeshakata tamaa na kazi za online kutokana na matapeli wengi, lakini OrderVerify imenifuta machozi. Pesa inaingia kweli jamani 😭❤️",
    time: "Dakika 53 zilizopita",
    replies: []
  },
  {
    name: "Cyprian Tibaijuka",
    text: "Kamisheni za order ni nzuri sana, ukithibitisha order zako kwa umakini unapata faida kubwa kwa muda mfupi 📈💪",
    time: "Dakika 58 zilizopita",
    replies: []
  },
  {
    name: "Rukia Mzighani",
    text: "Asanteni sana kwa uaminifu wenu, nimepokea elfu tisini na tano muda si mrefu",
    time: "Saa 1 lililopita",
    replies: []
  },
  {
    name: "Deogratius Kanyigo",
    text: "Mfumo uko fasta sana haukwami kwami 🚀",
    time: "Saa 1 lililopita",
    replies: []
  },
  {
    name: "Hidaya Mwinuka",
    text: "Leo ni siku yangu ya nne tangu nianze na tayari nimeshatoa mara mbili kwa HaloPesa. Kweli penye nia pana njia 🙌🎉",
    time: "Saa 2 zilizopita",
    replies: [
      { name: "Waziri Mbena", text: "Hongera sana Hidaya, hapa ni mwendo wa kuingiza faida tu.", time: "Saa 1 lililopita" }
    ]
  },
  {
    name: "Mudathir Kaseja",
    text: "Kazi rahisi inayoeleweka hata kama huna ujuzi mkubwa wa simu.",
    time: "Saa 2 zilizopita",
    replies: []
  },
  {
    name: "Ashura Mbembati",
    text: "Nimepata mtaji wa kuongeza bidhaa kwenye genge langu kutokana na faida nilizokusanya wiki hii. Asante Mungu 🙏❤️",
    time: "Saa 3 zilizopita",
    replies: []
  },
  {
    name: "Sylvester Kapinga",
    text: "Safi sana OrderVerify, malipo yangu yamefika salama",
    time: "Saa 3 zilizopita",
    replies: []
  },
  {
    name: "Bahati Nditu",
    text: "Mimi nilijiunga baada ya kuona mdogo wangu analipwa kila wiki, sasa hivi na mimi nimekuwa shahidi wa huu ukweli 💯🔥",
    time: "Saa 4 zilizopita",
    replies: []
  },
  {
    name: "Twalib Msangi",
    text: "Hakuna kucheleweshwa, ukiomba kutoa pesa inashughulikiwa haraka sana.",
    time: "Saa 4 zilizopita",
    replies: []
  },
  {
    name: "Khairat Mzamil",
    text: "Najivunia sana kuijua hii website mapema, imenipunguzia stress za kukosa hela ya matumizi madogo madogo 💃✨",
    time: "Saa 5 zilizopita",
    replies: []
  },
  {
    name: "Japhet Komba",
    text: "Mambo ni mazuri huku, mwenye macho haambiwi tazama 💰",
    time: "Saa 5 zilizopita",
    replies: []
  },
  {
    name: "Sifa Lusinde",
    text: "Hata ukiwa safarini au umepumzika nyumbani bado unaweza kuthibitisha order na kuingiza kamisheni yako safi kabisa.",
    time: "Saa 6 zilizopita",
    replies: []
  },
  {
    name: "Abdulmalik Chande",
    text: "Nimehakiki order zangu za leo na nimeshatoa faida yangu tayari 📲✅",
    time: "Saa 6 zilizopita",
    replies: []
  },
  {
    name: "Veronica Mwageni",
    text: "Jamani msiogope kujaribu, mimi nilianza kwa mashaka mengi lakini sasa hivi nashukuru siku niliyoamua kuanza 🙏😭",
    time: "Saa 7 zilizopita",
    replies: [
      { name: "Issa Ndembo", text: "Kweli kabisa Veronica, hatua ya kwanza ndio muhimu zaidi.", time: "Saa 6 zilizopita" }
    ]
  },
  {
    name: "Khamis Basso",
    text: "Uaminifu wao uko juu sana",
    time: "Saa 7 zilizopita",
    replies: []
  },
  {
    name: "Tatu Ngalawa",
    text: "Nimetumiwa pesa yangu kwenye M-Pesa ndani ya muda mfupi tu. Nimefurahi mpaka nimeruka juu kwa furaha 🥳❤️",
    time: "Saa 8 zilizopita",
    replies: []
  },
  {
    name: "Goodluck Mayanja",
    text: "Hii fursa imekuja wakati muafaka sana kwangu, kila siku naona ongezeko kwenye akaunti yangu.",
    time: "Saa 8 zilizopita",
    replies: []
  },
  {
    name: "Swaumu Kambi",
    text: "Asanteni wasimamizi wa mfumo, mko vizuri sana 👏",
    time: "Saa 9 zilizopita",
    replies: []
  },
  {
    name: "Boniface Mapigano",
    text: "Kwa vijana wenzangu mnaolalamika hakuna kazi, ingieni hapa mthibitishe order muone jinsi simu zenu zinavyoweza kuwalipa 🔥💪",
    time: "Saa 9 zilizopita",
    replies: []
  },
  {
    name: "Husna Kidevu",
    text: "Pesa inaingia kweli bila chenga",
    time: "Saa 10 zilizopita",
    replies: []
  },
  {
    name: "Ezekiel Lwanyantika",
    text: "Nimependa jinsi kila order inavyoonyesha wazi kamisheni yake kabla hata hujaithibitisha. Uwazi mkubwa sana.",
    time: "Saa 10 zilizopita",
    replies: []
  },
  {
    name: "Mwajuma Sefu",
    text: "Leo nimefanikiwa kutoa laki mbili kamili, namshukuru Mungu kwa kunionyesha njia hii ya halali 🙏💸",
    time: "Saa 11 zilizopita",
    replies: []
  },
  {
    name: "Clarence Mziwanda",
    text: "Kazi inaenda vizuri, muhimu kufuata maelekezo tu",
    time: "Saa 11 zilizopita",
    replies: []
  },
  {
    name: "Jamila Kidunda",
    text: "Familia yangu inafurahia matunda ya OrderVerify kila wiki. Mbarikiwe sana kwa kuanzisha huduma hii 🥰🌸",
    time: "Saa 12 zilizopita",
    replies: []
  },
  {
    name: "Felix Mwakitwange",
    text: "Malipo ni ya uhakika asilimia mia moja 💯",
    time: "Saa 13 zilizopita",
    replies: []
  },
  {
    name: "Habiba Mjema",
    text: "Nilipoona jirani yangu amenunua friji mpya kutokana na kazi hii ndipo nilipoamini. Sasa na mimi nimeshaanza kuona faida yake.",
    time: "Saa 14 zilizopita",
    replies: []
  },
  {
    name: "Yohana Ndugai",
    text: "Hongereni sana kwa huduma bora na ya haraka ⚡",
    time: "Saa 15 zilizopita",
    replies: []
  },
  {
    name: "Chiku Mlawa",
    text: "Kila asubuhi kabla sijaenda kwenye mihangaiko yangu napitia kuthibitisha order zangu kwanza. Inalipa sana jamani ❤️📲",
    time: "Saa 16 zilizopita",
    replies: []
  },
  {
    name: "Abubakar Kilonzo",
    text: "Tigo Pesa imesoma salama kabisa, sina shaka tena na huu mtandao.",
    time: "Saa 17 zilizopita",
    replies: []
  },
  {
    name: "Consolata Nyoni",
    text: "Mungu azidi kuwapa nguvu viongozi wa OrderVerify, mmetutoa kimasomaso wengi tulioamini fursa hii 🙏✨",
    time: "Saa 18 zilizopita",
    replies: []
  }
];

export const rawSwahiliComments = rawSwahiliCommentsData.map(c => ({
  text: c.text,
  replies: c.replies
}));

export function buildCompliantComments(): CommentItem[] {
  return rawSwahiliCommentsData.map((item, idx) => ({
    id: 1000 + idx,
    name: item.name,
    text: item.text,
    time: item.time,
    replies: item.replies.map((r, rIdx) => ({
      id: (1000 + idx) * 10 + rIdx,
      name: r.name,
      text: r.text,
      time: r.time
    }))
  }));
}

// ============================================================================
// BRAND NEW LIVE PAYOUT NOTIFICATIONS (68 COMPLETELY DISTINCT MEMBERS)
// ============================================================================

export const RAW_LIVE_PAYOUT_MEMBERS: { name: string; amount: number }[] = [
  { name: "Amiri Katimba", amount: 26500 },
  { name: "Blandina Nkomola", amount: 41000 },
  { name: "Cassian Mvela", amount: 18500 },
  { name: "Devotha Haule", amount: 52000 },
  { name: "Edson Ruhinda", amount: 34500 },
  { name: "Fauzia Mkopi", amount: 47500 },
  { name: "Germanus Gama", amount: 23000 },
  { name: "Hadija Matimbwa", amount: 58000 },
  { name: "Ibrahimu Soka", amount: 31000 },
  { name: "Janeth Kihongo", amount: 44500 },
  { name: "Khalfan Mpenda", amount: 19500 },
  { name: "Lightness Rwiza", amount: 53000 },
  { name: "Mussa Chilunda", amount: 28500 },
  { name: "Nuru Kabela", amount: 39000 },
  { name: "Ombeni Luvanda", amount: 49500 },
  { name: "Penina Mrosso", amount: 21500 },
  { name: "Qassim Mbaruku", amount: 37000 },
  { name: "Restituta Mhaiki", amount: 55000 },
  { name: "Sadiki Msemo", amount: 24000 },
  { name: "Tabitha Rugambwa", amount: 46000 },
  { name: "Ulimboka Kasege", amount: 32000 },
  { name: "Vaileth Milinga", amount: 51500 },
  { name: "William Nditie", amount: 17500 },
  { name: "Yusuph Kapufi", amount: 43500 },
  { name: "Zaituni Mlaponi", amount: 29500 },
  { name: "Anselm Kabyemera", amount: 56500 },
  { name: "Bertha Mwanri", amount: 35000 },
  { name: "Cosmas Njovu", amount: 22500 },
  { name: "Dorah Kipobota", amount: 48000 },
  { name: "Ephraim Mwandosya", amount: 30500 },
  { name: "Frida Kalombo", amount: 54500 },
  { name: "Gerald Kihampa", amount: 25000 },
  { name: "Haika Mziray", amount: 42000 },
  { name: "Isaya Mwangaza", amount: 19000 },
  { name: "Joyce Kamugisha", amount: 50000 },
  { name: "Kenneth Mbwambo", amount: 36000 },
  { name: "Leila Mkombozi", amount: 27500 },
  { name: "Majaliwa Simba", amount: 57000 },
  { name: "Najma Kijazi", amount: 33500 },
  { name: "Othman Makamba", amount: 45000 },
  { name: "Pili Mwananzila", amount: 20000 },
  { name: "Raphael Rutashobya", amount: 38500 },
  { name: "Salome Kagine", amount: 52500 },
  { name: "Thomas Lukuvi", amount: 26000 },
  { name: "Upendo Kipesha", amount: 47000 },
  { name: "Vincent Mpogolo", amount: 31500 },
  { name: "Witness Ndibalema", amount: 53500 },
  { name: "Yahya Mchomvu", amount: 24500 },
  { name: "Zamda Kichwabuta", amount: 40000 },
  { name: "Anwar Mkuchika", amount: 18000 },
  { name: "Belinda Kingunge", amount: 49000 },
  { name: "Christian Mzindakaya", amount: 35500 },
  { name: "Domina Kawawa", amount: 56000 },
  { name: "Eliud Kambona", amount: 23500 },
  { name: "Fatma Sokoine", amount: 41500 },
  { name: "Gabriel Kolimba", amount: 29000 },
  { name: "Hussein Rupia", amount: 50500 },
  { name: "Irene Kahama", amount: 34000 },
  { name: "Julius Bomani", amount: 21000 },
  { name: "Khadija Malecela", amount: 46500 },
  { name: "Leonard Warioba", amount: 37500 },
  { name: "Magreth Cleopa", amount: 54000 },
  { name: "Nassoro Fundikira", amount: 25500 },
  { name: "Oliver Sykes", amount: 43000 },
  { name: "Paschal Mzena", amount: 30000 },
  { name: "Rahel Mbilinyi", amount: 48500 },
  { name: "Steven Mwakikosa", amount: 22000 },
  { name: "Tumaini Mwanjisi", amount: 51000 }
];

export function buildCompliantLivePayouts(): LivePayout[] {
  return RAW_LIVE_PAYOUT_MEMBERS.map((m, i) => ({
    id: 2000 + i,
    name: m.name,
    rawTzsAmount: m.amount,
    amountStr: `TZS ${m.amount.toLocaleString()}`,
    tzsStr: `TZS ${m.amount.toLocaleString()}`
  }));
}

// ============================================================================
// SYSTEM DATA EXPORT & INITIALIZATION
// ============================================================================

export function initOrLoadSystemData() {
  const storedVersion = storageGet(STORAGE_KEY_VERSION);
  if (storedVersion !== STORAGE_VERSION_TAG) {
    storageRemove(STORAGE_KEY_ACTIVE_ORDERS);
    storageRemove(STORAGE_KEY_ACTIVE_PAYOUTS);
    storageRemove(STORAGE_KEY_ACTIVE_COMMENTS);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem("orderverify_active_orders");
        window.localStorage.removeItem("orderverify_verified_orders");
        window.localStorage.setItem("orderverify_orders_catalog_version", STORAGE_VERSION_TAG);
      }
    } catch (e) {}
  }

  const livePayouts = buildCompliantLivePayouts();
  const comments = buildCompliantComments();
  const orderData = MASTER_EXACT_ORDERS;

  storageSet(STORAGE_KEY_VERSION, STORAGE_VERSION_TAG);
  storageSet(STORAGE_KEY_ACTIVE_ORDERS, JSON.stringify(orderData));
  storageSet(STORAGE_KEY_ACTIVE_PAYOUTS, JSON.stringify(livePayouts));
  storageSet(STORAGE_KEY_ACTIVE_COMMENTS, JSON.stringify(comments));

  return {
    orderData,
    livePayouts,
    comments
  };
}

const initialSystemState = initOrLoadSystemData();

export let orderData: Order[] = initialSystemState.orderData;
export let livePayouts: LivePayout[] = initialSystemState.livePayouts;
export let initialComments: CommentItem[] = initialSystemState.comments;

export const update6HourDataIfChanged = () => {};
export const generate6HourComments = (): CommentItem[] => initialComments;
