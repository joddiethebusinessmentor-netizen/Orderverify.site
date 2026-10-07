// ============================================================================
// ORDERVERIFY DATA ENGINE (VERSION 129 - MUSIC BAND EQUIPMENT ALIGNED)
// ============================================================================
// Page 1: Vifaa vya Uvuvi wa Kisasa (Modern Fishing Gear)
// Page 2: Vifaa vya Ufugaji wa Kisasa (Modern Livestock Equipment)
// Page 3: Vifaa vya Music Band (Music Band Equipment - Electric Guitar, Drum Set, Bass, Piano, Speakers, Mixers, Saxophone)
// Malipo: 5% (Math.round(productValue * 0.05))
// Zero duplicate names across Orders, Live Notifications, and Comments.
// ============================================================================

import imgFishFinderSonar from "./assets/images/fish_finder_sonar_1791342090674.jpg";
import imgTelescopicFishingRod from "./assets/images/telescopic_fishing_rod_1791342099874.jpg";
import imgNylonCastNet from "./assets/images/nylon_cast_net_1791342110058.jpg";
import imgSubmersibleFishingLight from "./assets/images/submersible_fishing_light_1791342119311.jpg";
import imgElectronicBiteAlarms from "./assets/images/electronic_bite_alarms_1791342129473.jpg";
import imgSaltwaterTrollingReel from "./assets/images/saltwater_trolling_reel_1791342140190.jpg";
import imgLiveBaitAeratorPump from "./assets/images/live_bait_aerator_pump_1791342149339.jpg";
import imgFishingTackleBackpack from "./assets/images/fishing_tackle_backpack_1791342158433.jpg";
import imgCrabPrawnTrapNet from "./assets/images/crab_prawn_trap_net_1791342167732.jpg";
import imgFishGripperDigitalScale from "./assets/images/fish_gripper_digital_scale_1791342177614.jpg";
import imgBoatTrailerWinch from "./assets/images/boat_trailer_winch_1791342187336.jpg";
import imgBraidedFishingLineSpool from "./assets/images/braided_fishing_line_spool_1791342196621.jpg";

import imgPoultryEggIncubator from "./assets/images/poultry_egg_incubator_1791345750502.jpg";
import imgElectricMilkingMachine from "./assets/images/electric_milking_machine_1791345760639.jpg";
import imgSheepShearingClipper from "./assets/images/sheep_shearing_clipper_1791345770182.jpg";
import imgSolarFenceEnergizer from "./assets/images/solar_fence_energizer_1791345779321.jpg";
import imgLivestockWaterTrough from "./assets/images/livestock_water_trough_1791345788287.jpg";
import imgHoneyExtractorCentrifuge from "./assets/images/honey_extractor_centrifuge_1791345797071.jpg";
import imgLivestockEarTagScanner from "./assets/images/livestock_ear_tag_scanner_1791345806088.jpg";
import imgVeterinaryDrenchingGun from "./assets/images/veterinary_drenching_gun_1791345815145.jpg";
import imgPoultryNippleDrinkerKit from "./assets/images/poultry_nipple_drinker_kit_1791345825473.jpg";
import imgChickBrooderHeatLamp from "./assets/images/chick_brooder_heat_lamp_1791345833898.jpg";
import imgElectricCalfDehorner from "./assets/images/electric_calf_dehorner_1791345843922.jpg";
import imgTreadleChickenFeeder from "./assets/images/treadle_chicken_feeder_1791345852077.jpg";

import imgElectricGuitarPro from "./assets/images/music_band_gear_set_1_jpg_1791351368065.jpg";
import imgCompleteDrumSet from "./assets/images/music_band_gear_set_2_jpg_1791351382397.jpg";
import imgElectricBassGuitar from "./assets/images/music_band_gear_set_3_jpg_1791351393580.jpg";
import imgDigitalPianoKeyboard from "./assets/images/music_band_gear_set_4_jpg_1791351405088.jpg";
import imgPoweredPASpeaker from "./assets/images/music_band_gear_set_5_jpg_1791351415676.jpg";
import imgProAudioMixer from "./assets/images/music_band_gear_set_6_jpg_1791351427189.jpg";
import imgAltoSaxophone from "./assets/images/music_band_gear_set_7_jpg_1791351439939.jpg";
import imgSilverTrumpet from "./assets/images/music_band_gear_set_8_jpg_1791351454460.jpg";
import imgWirelessMicSystem from "./assets/images/music_band_gear_set_9_jpg_1791351467016.jpg";
import imgStageFloorMonitor from "./assets/images/music_band_gear_set_10_jpg_1791351477959.jpg";
import imgMusicSynthesizer from "./assets/images/music_band_gear_set_11_jpg_1791351489124.jpg";
import imgLightingController from "./assets/images/music_band_gear_set_12_jpg_1791351501210.jpg";

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
export const STORAGE_VERSION_TAG = "ov_v129_music_band_gear_aligned";
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
  // UKURASA WA 1: Vifaa vya Uvuvi wa Kisasa (Modern Fishing Equipment - Picha Halisi za Bidhaa Zenyewe Bila Watu) - 100k - 400k TZS
  // --------------------------------------------------------------------------
  {
    id: 1,
    name: "Bakari Mfaume",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mwanza",
    product: "Portable Digital Sonar Fish Finder & Echo Sounder with LCD Screen",
    productValue: 280000,
    payout: 14000,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    productImage: imgFishFinderSonar
  },
  {
    id: 2,
    name: "Otieno Omondi",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Kisumu",
    product: "Carbon Fiber Telescopic Fishing Rod with Spinning Reel Set",
    productValue: 195000,
    payout: 9750,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    productImage: imgTelescopicFishingRod
  },
  {
    id: 3,
    name: "Athumani Mkude",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Kigoma",
    product: "Heavy-Duty Monofilament Nylon Cast Fishing Net with Sinkers (12ft)",
    productValue: 140000,
    payout: 7000,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    productImage: imgNylonCastNet
  },
  {
    id: 4,
    name: "Kato Ssempijja",
    gender: "male",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Jinja",
    product: "Submersible Green LED Underwater Night Fishing Attractor Light (12V)",
    productValue: 125000,
    payout: 6250,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    productImage: imgSubmersibleFishingLight
  },
  {
    id: 5,
    name: "Joaquim Sitoe",
    gender: "male",
    country: "Mozambique",
    flag: "🇲🇿",
    city: "Maputo",
    product: "Electronic Fishing Bite Alarm Set with Wireless Audio Receiver",
    productValue: 210000,
    payout: 10500,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgElectronicBiteAlarms
  },
  {
    id: 6,
    name: "Mwajuma Mwinyi",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Tanga",
    product: "Heavy-Duty CNC Machined Saltwater Trolling Reel (Level Wind)",
    productValue: 380000,
    payout: 19000,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    productImage: imgSaltwaterTrollingReel
  },
  {
    id: 7,
    name: "Akinyi Odhiambo",
    gender: "female",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Homa Bay",
    product: "Portable 12V Live Bait Tank Aerator Air Pump with Diffuser",
    productValue: 115000,
    payout: 5750,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    productImage: imgLiveBaitAeratorPump
  },
  {
    id: 8,
    name: "Thabo Mokoena",
    gender: "male",
    country: "South Africa",
    flag: "🇿🇦",
    city: "Durban",
    product: "Waterproof Multi-Pocket Fishing Tackle Backpack with Utility Boxes",
    productValue: 175000,
    payout: 8750,
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&q=80",
    productImage: imgFishingTackleBackpack
  },
  {
    id: 9,
    name: "Baraka Mwambungu",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Kyela",
    product: "Collapsible Rectangular Wire Mesh Crab and Prawn Trap Net",
    productValue: 135000,
    payout: 6750,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    productImage: imgCrabPrawnTrapNet
  },
  {
    id: 10,
    name: "Amina Nakato",
    gender: "female",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Entebbe",
    product: "Stainless Steel Floating Fish Lip Gripper with Digital Hanging Scale",
    productValue: 110000,
    payout: 5500,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    productImage: imgFishGripperDigitalScale
  },
  {
    id: 11,
    name: "Emeka Chukwueze",
    gender: "male",
    country: "Nigeria",
    flag: "🇳🇬",
    city: "Port Harcourt",
    product: "Heavy-Duty Manual Boat Trailer Hand Winch with Strap (2500 lbs)",
    productValue: 320000,
    payout: 16000,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    productImage: imgBoatTrailerWinch
  },
  {
    id: 12,
    name: "Halima Salum",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Bagamoyo",
    product: "High-Strength 8-Strand Braided Fishing Line Spool (500m Heavy Test)",
    productValue: 105000,
    payout: 5250,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    productImage: imgBraidedFishingLineSpool
  },

  // --------------------------------------------------------------------------
  // UKURASA WA 2: Vifaa vya Ufugaji wa Kisasa (Modern Livestock Equipment - Picha Halisi za Bidhaa Zenyewe Bila Watu) - 100k - 400k TZS
  // --------------------------------------------------------------------------
  {
    id: 13,
    name: "Rashid Mussa",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Morogoro",
    product: "Digital Automatic Poultry Egg Incubator with Temperature & Humidity Control",
    productValue: 285000,
    payout: 14250,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    productImage: imgPoultryEggIncubator
  },
  {
    id: 14,
    name: "Waweru Mwangi",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nakuru",
    product: "Portable Electric Goat & Cow Milking Machine with Stainless Steel Bucket",
    productValue: 380000,
    payout: 19000,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    productImage: imgElectricMilkingMachine
  },
  {
    id: 15,
    name: "Neema Mwampashi",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mbeya",
    product: "Electric Heavy-Duty Sheep & Goat Shearing Hair Clipper Machine (690W)",
    productValue: 240000,
    payout: 12000,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    productImage: imgSheepShearingClipper
  },
  {
    id: 16,
    name: "Ronald Mukasa",
    gender: "male",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Mbarara",
    product: "Solar Powered Livestock Electric Fence Energizer Unit (10km Range)",
    productValue: 350000,
    payout: 17500,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    productImage: imgSolarFenceEnergizer
  },
  {
    id: 17,
    name: "Jean-Paul Habimana",
    gender: "male",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Kigali",
    product: "Automatic Stainless Steel Livestock Water Trough Float Bowl for Cattle & Pigs",
    productValue: 145000,
    payout: 7250,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    productImage: imgLivestockWaterTrough
  },
  {
    id: 18,
    name: "Zakaria Milinga",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Tabora",
    product: "Stainless Steel Manual 2-Frame Beekeeping Honey Extractor Centrifuge Drum",
    productValue: 320000,
    payout: 16000,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgHoneyExtractorCentrifuge
  },
  {
    id: 19,
    name: "Sipho Ndlovu",
    gender: "male",
    country: "South Africa",
    flag: "🇿🇦",
    city: "Polokwane",
    product: "Handheld Electronic RFID Microchip Animal Ear Tag Scanner for Cattle & Sheep",
    productValue: 260000,
    payout: 13000,
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&q=80",
    productImage: imgLivestockEarTagScanner
  },
  {
    id: 20,
    name: "Asha Salum",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dodoma",
    product: "Adjustable Stainless Steel Continuous Livestock Drenching & Syringe Gun (50ml)",
    productValue: 125000,
    payout: 6250,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    productImage: imgVeterinaryDrenchingGun
  },
  {
    id: 21,
    name: "Emmanuel Banda",
    gender: "male",
    country: "Zambia",
    flag: "🇿🇲",
    city: "Chipata",
    product: "Complete Automatic Poultry Nipple Water Line System with Pressure Regulator (20m)",
    productValue: 180000,
    payout: 9000,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    productImage: imgPoultryNippleDrinkerKit
  },
  {
    id: 22,
    name: "Amina Khalfan",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Arusha",
    product: "Heavy-Duty Aluminum Infrared Chick Brooder Hanging Heat Lamp Fixture (250W)",
    productValue: 110000,
    payout: 5500,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    productImage: imgChickBrooderHeatLamp
  },
  {
    id: 23,
    name: "Chinedu Eze",
    gender: "male",
    country: "Nigeria",
    flag: "🇳🇬",
    city: "Enugu",
    product: "Electric Rapid Calf Dehorning Iron Tool for Cattle & Dairy Goats (220V)",
    productValue: 215000,
    payout: 10750,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    productImage: imgElectricCalfDehorner
  },
  {
    id: 24,
    name: "Antonio Cossa",
    gender: "male",
    country: "Mozambique",
    flag: "🇲🇿",
    city: "Chokwe",
    product: "Automatic Galvanized Steel Step-On Treadle Poultry Feeder (10kg Capacity)",
    productValue: 165000,
    payout: 8250,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    productImage: imgTreadleChickenFeeder
  },

  // --------------------------------------------------------------------------
  // UKURASA WA 3: Vifaa vya Music Band (Music Band Equipment - Picha Halisi za Bidhaa Zenyewe Bila Watu) - 100k - 600k TZS
  // --------------------------------------------------------------------------
  {
    id: 25,
    name: "Baraka Msuya",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Arusha",
    product: "Professional Solid Body Electric Guitar (Sunburst Finish)",
    productValue: 385000,
    payout: 19250,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    productImage: imgElectricGuitarPro
  },
  {
    id: 26,
    name: "Nanyange Nakato",
    gender: "female",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Kampala",
    product: "5-Piece Complete Studio Drum Kit with Brass Cymbals",
    productValue: 595000,
    payout: 29750,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    productImage: imgCompleteDrumSet
  },
  {
    id: 27,
    name: "Maina Waweru",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nairobi",
    product: "4-String Electric Bass Guitar (Natural Maple Finish)",
    productValue: 340000,
    payout: 17000,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    productImage: imgElectricBassGuitar
  },
  {
    id: 28,
    name: "Pendo Maleko",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Moshi",
    product: "88-Key Weighted Digital Piano Keyboard with Stand",
    productValue: 560000,
    payout: 28000,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    productImage: imgDigitalPianoKeyboard
  },
  {
    id: 29,
    name: "Jean-Pierre Kabangu",
    gender: "male",
    country: "Congo (DRC)",
    flag: "🇨🇩",
    city: "Kinshasa",
    product: "15-inch Powered Active PA Speaker (1000 Watts Peak)",
    productValue: 480000,
    payout: 24000,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    productImage: imgPoweredPASpeaker
  },
  {
    id: 30,
    name: "Shadrack Temba",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dar es Salaam",
    product: "12-Channel Professional Audio Mixer Console with Effects",
    productValue: 425000,
    payout: 21250,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    productImage: imgProAudioMixer
  },
  {
    id: 31,
    name: "Amina Bakari",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dodoma",
    product: "Polished Brass Alto Saxophone with Premium Hard Case",
    productValue: 540000,
    payout: 27000,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    productImage: imgAltoSaxophone
  },
  {
    id: 32,
    name: "Kwame Osei",
    gender: "male",
    country: "Ghana",
    flag: "🇬🇭",
    city: "Accra",
    product: "Professional Silver Trumpet with Standard Mouthpiece",
    productValue: 310000,
    payout: 15500,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgSilverTrumpet
  },
  {
    id: 33,
    name: "Zuhura Shayo",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mbeya",
    product: "Dual Handheld Wireless Microphone System (UHF Band)",
    productValue: 285000,
    payout: 14250,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    productImage: imgWirelessMicSystem
  },
  {
    id: 34,
    name: "Thabo Mbeki",
    gender: "male",
    country: "South Africa",
    flag: "🇿🇦",
    city: "Johannesburg",
    product: "Active Stage Floor Monitor Speaker (500 Watts)",
    productValue: 415000,
    payout: 20750,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    productImage: imgStageFloorMonitor
  },
  {
    id: 35,
    name: "Saidi Kibwana",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Tanga",
    product: "61-Key Music Production Synthesizer with MIDI Support",
    productValue: 590000,
    payout: 29500,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgMusicSynthesizer
  },
  {
    id: 36,
    name: "Faith Njeri",
    gender: "female",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nakuru",
    product: "Digital DMX Stage Lighting Controller Console (192 Channels)",
    productValue: 260000,
    payout: 13000,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    productImage: imgLightingController
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
    name: "Neema Kilasara",
    text: "Mungu ni mwema sana jamani! Nilikuwa na wasiwasi mwanzoni lakini leo asubuhi nimetoa laki 2 na 40 nikalipia ada ya mdogo wangu papo hapo bila kuchelewa 🙏😭❤️",
    time: "Dakika 2 zilizopita",
    replies: [
      { name: "Daudi Mgonja", text: "Hongera sana dada yangu! Hii website imekuwa ukombozi kwa vijana wengi sana mtaani kwetu 👏🔥", time: "Dakika 1 iliyopita" }
    ]
  },
  {
    name: "Baraka Mwashambwa",
    text: "Hii kitu inalipa kweli bila longolongo yoyote! Kazi yangu ni kuthibitisha order nikiwa kwenye daladala tu na pesa inaingia safi kabisa 💯📱💸",
    time: "Dakika 4 zilizopita",
    replies: []
  },
  {
    name: "Zuhura Kipingu",
    text: "Nashukuru sana huduma ya wateja walivyonielekeza kwa uvumilivu. Nimepata faida yangu ya kwanza leo jioni na nina furaha kupitiliza! 🥰✨💃",
    time: "Dakika 8 zilizopita",
    replies: []
  },
  {
    name: "Emmanuel Sanga",
    text: "Kazi rahisi na ya uhakika. Kila order ninayothibitisha inaniongezea kipato. Nimeshaacha kukopa kopa hovyo 🙌💰",
    time: "Dakika 12 zilizopita",
    replies: []
  },
  {
    name: "Fatuma Ndauka",
    text: "Nilidhani ni utani mpaka balance yangu ilipoongezeka na nikaweza kutoa kwa Vodacom M-Pesa. Asanteni sana OrderVerify! 🟢📱🎉",
    time: "Dakika 15 zilizopita",
    replies: []
  },
  {
    name: "Godfrey Maleko",
    text: "Hii ndio maana halisi ya kutumia simu ya kiganjani kutengeneza pesa. Uthibitishaji unaenda fasta bila usumbufu wowote ⚡🚀",
    time: "Dakika 22 zilizopita",
    replies: []
  },
  {
    name: "Amina Rashidi",
    text: "Niliamka asubuhi na shida ya hela ya matumizi ya nyumbani, nimeingia nikathibitisha order zangu mara pesa iko tayari. Mbarikiwe sana! 🍲🧺❤️",
    time: "Dakika 28 zilizopita",
    replies: [
      { name: "Salim Bakari", text: "Ukweli mtupu Amina, hata mimi nimefanya hivyohivyo na imenisaidia sana leo 🤝✨", time: "Dakika 18 zilizopita" }
    ]
  },
  {
    name: "Josephat Mrema",
    text: "Kila nikipata muda wa mapumziko kazini naingia nazo. Nimeshaingiza zaidi ya laki tano mwezi huu pekee! 📈💵💪",
    time: "Dakika 35 zilizopita",
    replies: []
  },
  {
    name: "Rehema Mwakyoma",
    text: "Uaminifu wao ndio unanifanya niwapende. Hakuna kupoteza muda wala masharti magumu. Karibuni wote mjionee wenyewe 😍👌",
    time: "Dakika 42 zilizopita",
    replies: []
  },
  {
    name: "Kassim Mndeme",
    text: "Hii website imebadilisha kabisa mtazamo wangu kuhusu kazi za mtandaoni. Hapa ni vitendo tu sio maneno mengi 🏆🌟",
    time: "Dakika 50 zilizopita",
    replies: []
  },
  {
    name: "Grace Lyatuu",
    text: "Nalipwa kila ninapoomba kutoa, hakuna hata siku moja nimekataliwa. Nawashauri msichelewe kujiunga 💃🥳📲",
    time: "Saa 1 lililopita",
    replies: []
  },
  {
    name: "Joshua Mwakatobe",
    text: "Siri ni kuwa makini na taarifa za wateja na kuhakiki haraka. Faida inajikusanya vizuri sana kila siku 💼📊",
    time: "Saa 1 lililopita",
    replies: []
  },
  {
    name: "Subira Mgaza",
    text: "Hatimaye nimepata mtandao unaoheshimu muda wangu. Hongereni sana waandaaji wa mfumo huu 🙏✨",
    time: "Saa 2 zilizopita",
    replies: []
  },
  {
    name: "Shadrack Mwamlima",
    text: "Nilikuwa siamini kabisa mambo ya mtandaoni, lakini rafiki yangu alinionyesha ushahidi wa malipo yake nikajaribu. Sasa hivi nimeamini kwa vitendo! 🤝🔥",
    time: "Saa 2 zilizopita",
    replies: []
  },
  {
    name: "Pendo Chambo",
    text: "Pesa zangu zinaingia Airtel Money haraka bila makato makubwa. Nimeridhika asilimia zote mia moja 🔴📱💖",
    time: "Saa 3 zilizopita",
    replies: []
  },
  {
    name: "Frank Msigwa",
    text: "Order za leo zimekuwa na faida kubwa sana! Nimefurahia kila sekunde niliyotumia hapa 🤑🚀",
    time: "Saa 3 zilizopita",
    replies: []
  },
  {
    name: "Lilian Kweka",
    text: "Nawashukuru sana kwa huduma yenu nzuri na ya kuaminika. Nimepata mtaji wa kuanzisha biashara yangu ndogo ya nguo 👗🛍️🥰",
    time: "Saa 4 zilizopita",
    replies: []
  },
  {
    name: "Rashid Kibwana",
    text: "Uthibitishaji unaenda chap chap! Hakuna kigugumizi, mfumo uko vizuri sana ⚡👌",
    time: "Saa 4 zilizopita",
    replies: []
  },
  {
    name: "Diana Mmasi",
    text: "Kila mwanamke anapaswa kujitegemea kiuchumi. Kupitia OrderVerify nimeweza kujiwekea akiba yangu mwenyewe 👑🌸💰",
    time: "Saa 5 zilizopita",
    replies: []
  },
  {
    name: "Ally Msuya",
    text: "Malipo ya Tigo Pesa yameingia ndani ya dakika chache tu baada ya kumaliza kazi. Ni raha tupu! 🔵📲🎉",
    time: "Saa 5 zilizopita",
    replies: []
  },
  {
    name: "Hellen Kimario",
    text: "Hii ni fursa ya dhahabu kwa mtu yeyote mwenye smartphone. Usikubali ibaki kuwa ya kuangalia picha tu tumia uingize hela 📲💎✨",
    time: "Saa 6 zilizopita",
    replies: []
  },
  {
    name: "Moses Mboya",
    text: "Nimeridhika sana na usalama wa taarifa na ufanisi wa malipo. Tuko pamoja sana mpaka mwisho 🛡️🤝",
    time: "Saa 6 zilizopita",
    replies: []
  },
  {
    name: "Asha Ngowi",
    text: "Kila siku asubuhi na jioni lazima nithibitishe order zangu. Hii ni ajira yangu ya ziada isiyonisumbua kabisa 🌞☕💵",
    time: "Saa 7 zilizopita",
    replies: []
  },
  {
    name: "Jackson Temba",
    text: "Nilipokea pesa zangu asubuhi ya leo moja kwa moja benki. Huduma hii haina mfano Afrika Mashariki nzima 🌍💳🏆",
    time: "Saa 7 zilizopita",
    replies: []
  },
  {
    name: "Martha Kisamo",
    text: "Wapendwa changamkieni fursa hii bado ipo. Mimi nimejionea matunda yake kwa macho yangu mawili 👀🙌💸",
    time: "Saa 8 zilizopita",
    replies: []
  },
  {
    name: "Elias Mchome",
    text: "Hakuna maneno mengi, hapa ni kazi na kupokea haki yako. Asanteni wote mnaosimamia mtandao huu 👏💼",
    time: "Saa 8 zilizopita",
    replies: []
  },
  {
    name: "Judith Mmbaga",
    text: "Nimevutiwa sana na uwazi uliopo. Kila order inaonyesha wazi thamani yake na kamisheni unayopata 📊🎯❤️",
    time: "Saa 9 zilizopita",
    replies: []
  },
  {
    name: "Victor Moshi",
    text: "Kuanzia mwezi uliopita maisha yangu yamebadilika sana kifedha. Sasa naweza kusaidia wazazi wangu kijijini kwa wakati 🏡🌾🙏",
    time: "Saa 9 zilizopita",
    replies: []
  },
  {
    name: "Winfrida Lyimo",
    text: "Huduma hii ni ya kipekee kabisa. Nimepata faida yangu bila usumbufu wowote leo asubuhi 🥰💸✨",
    time: "Saa 10 zilizopita",
    replies: []
  },
  {
    name: "Hamisi Tarimo",
    text: "Nawatakia mafanikio mema wote mnaoendelea kuthibitisha order. Tuendelee kupambana ushindi upo mkononi 🚀💪🔥",
    time: "Saa 10 zilizopita",
    replies: []
  },
  {
    name: "Gladness Mrema",
    text: "Sikujua kama kuthibitisha order kunaweza kuwa na tija kiasi hiki. Nimefurahia sana kujiunga nanyi 🎉💃",
    time: "Saa 11 zilizopita",
    replies: []
  },
  {
    name: "Charles Shayo",
    text: "Uaminifu wa OrderVerify unazidi kuonekana kila kukicha. Endeleeni na moyo huo huo wa kuwasaidia watu 🌟🤝",
    time: "Saa 11 zilizopita",
    replies: []
  },
  {
    name: "Paulina Kaaya",
    text: "Nalala nikijua kesho yangu iko salama kiuchumi kwa sababu nina chanzo hiki cha uhakika cha mapato 🌙😴💖",
    time: "Saa 12 zilizopita",
    replies: []
  },
  {
    name: "Geoffrey Mtei",
    text: "Nimetoka kutoa laki moja na nusu hivi punde, simu imelia meseji ya pesa mara moja. Ni uhakika mtupu! 📱🔔💰",
    time: "Saa 12 zilizopita",
    replies: []
  },
  {
    name: "Sophia Massawe",
    text: "Kila ninayemshirikisha fursa hii anashukuru sana baada ya kupokea malipo yake ya kwanza 🌸👭✨",
    time: "Saa 13 zilizopita",
    replies: []
  },
  {
    name: "Dominic Lema",
    text: "Mfumo ni thabiti sana na hauleti hitilafu yoyote wakati wa kufanya kazi. Safi sana wataalamu wetu 💻⚙️👍",
    time: "Saa 14 zilizopita",
    replies: []
  },
  {
    name: "Beatrice Shirima",
    text: "Hongereni sana kwa kutuletea mfumo huu unaoeleweka kwa urahisi hata kwa wanaoanza leo 👏📚💐",
    time: "Saa 15 zilizopita",
    replies: []
  },
  {
    name: "Samwel Kimaro",
    text: "Nimefanya kazi asubuhi hii na tayari nimelipwa. Hakuna haja ya kusubiri mwisho wa mwezi tena 🚀⏰💵",
    time: "Saa 16 zilizopita",
    replies: []
  },
  {
    name: "Agnes Mushi",
    text: "Kazi hii hainizuii kufanya shughuli zangu nyingine za nyumbani. Naifanya nikiwa na furaha tele 🏡👩‍👧‍👦❤️",
    time: "Saa 17 zilizopita",
    replies: []
  },
  {
    name: "Festus Maro",
    text: "Huu ndio mfano wa kuigwa kwa biashara za kidijitali Tanzania na Afrika nzima. Kila la heri kwa wote 🇹🇿🌍🌟",
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
// BRAND NEW LIVE PAYOUT NOTIFICATIONS (70+ COMPLETELY DISTINCT MEMBERS)
// ============================================================================

export const RAW_LIVE_PAYOUT_MEMBERS: { name: string; amount: number }[] = [
  { name: "Bakari Mgonja", amount: 24500 },
  { name: "Clementina Shayo", amount: 38000 },
  { name: "Damas Lyimo", amount: 19500 },
  { name: "Eusebia Kavishe", amount: 46000 },
  { name: "Filbert Mndeme", amount: 31000 },
  { name: "Gasper Kimambo", amount: 53500 },
  { name: "Hilda Minja", amount: 22500 },
  { name: "Innocent Nkya", amount: 41000 },
  { name: "Justina Assenga", amount: 35000 },
  { name: "Kajiru Tarimo", amount: 48500 },
  { name: "Leokadia Maro", amount: 27000 },
  { name: "Mathias Kweka", amount: 55000 },
  { name: "Novatus Lema", amount: 18500 },
  { name: "Octavian Mushi", amount: 39500 },
  { name: "Prisca Shirima", amount: 44000 },
  { name: "Quintus Massawe", amount: 26000 },
  { name: "Regina Swai", amount: 52000 },
  { name: "Severin Mallya", amount: 33500 },
  { name: "Telesphor Mosha", amount: 47000 },
  { name: "Ursula Meela", amount: 21000 },
  { name: "Valerian Macha", amount: 36500 },
  { name: "Wilhelmina Tesha", amount: 50500 },
  { name: "Xaveria Kaaya", amount: 29000 },
  { name: "Yustino Mmbando", amount: 43000 },
  { name: "Zablon Kisamo", amount: 17500 },
  { name: "Albano Mchome", amount: 54000 },
  { name: "Bernadetha Moshi", amount: 32500 },
  { name: "Costantine Lyakurwa", amount: 45500 },
  { name: "Desideria Sikana", amount: 20500 },
  { name: "Emiliana Mwangosi", amount: 37500 },
  { name: "Fulgence Songa", amount: 51500 },
  { name: "Gervas Mwambapa", amount: 28500 },
  { name: "Helena Mwankenja", amount: 42500 },
  { name: "Ildefons Mwashitete", amount: 16000 },
  { name: "Julitha Ndunguru", amount: 49000 },
  { name: "Kipara Kinyaga", amount: 34000 },
  { name: "Laurentia Mbwilo", amount: 23000 },
  { name: "Melkior Mtweve", amount: 56000 },
  { name: "Norbert Ndalama", amount: 30000 },
  { name: "Onesmo Mhagama", amount: 47500 },
  { name: "Petronila Msuvva", amount: 25500 },
  { name: "Quirinus Mwita", amount: 38500 },
  { name: "Rosalia Kileo", amount: 52500 },
  { name: "Silvester Msacky", amount: 19000 },
  { name: "Theresia Kibona", amount: 44500 },
  { name: "Urbanus Mbise", amount: 27500 },
  { name: "Veneranda Ngowi", amount: 51000 },
  { name: "Wilbard Lyatuu", amount: 36000 },
  { name: "Yulitha Chalamila", amount: 22000 },
  { name: "Zephania Temba", amount: 48000 },
  { name: "Abelard Mboya", amount: 33000 },
  { name: "Bonifasia Kimario", amount: 54500 },
  { name: "Celestin Mgaza", amount: 26500 },
  { name: "Dionisia Mmasi", amount: 40500 },
  { name: "Elpidius Sanga", amount: 18000 },
  { name: "Fortunatha Ndauka", amount: 49500 },
  { name: "Gorgonius Kipingu", amount: 31500 },
  { name: "Hermenegild Mwashambwa", amount: 45000 },
  { name: "Immaculata Kilasara", amount: 24000 },
  { name: "Juvenalis Mwakatobe", amount: 53000 },
  { name: "Kassiana Mndeme", amount: 37000 },
  { name: "Liberatus Msigwa", amount: 21500 },
  { name: "Modestus Chambo", amount: 46500 },
  { name: "Nazarius Kibwana", amount: 29500 },
  { name: "Odilia Mmbaga", amount: 55500 },
  { name: "Prosper Tarimo", amount: 17000 },
  { name: "Renatus Mrema", amount: 41500 },
  { name: "Scholastica Shayo", amount: 35500 },
  { name: "Tarcisius Kaaya", amount: 50000 },
  { name: "Venance Mtei", amount: 28000 }
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
