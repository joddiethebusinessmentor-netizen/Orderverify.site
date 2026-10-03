// ============================================================================
// ORDERVERIFY DATA ENGINE (VERSION 121 - PURE PRODUCT SHOTS FOR AGRICULTURE)
// ============================================================================
// Page 1: Vifaa vya Kilimo (Agricultural & Farming Equipment - Picha Halisi za Bidhaa Zenyewe Bila Watu)
// Page 2: Mapambo ya Ukumbini & Vifaa vya Mapishi ya Keki tu
// Page 3: Phone Accessories Tu
// Malipo: 5% (Math.round(productValue * 0.05))
// Zero duplicate names across Orders, Live Notifications, and Comments.
// ============================================================================

import imgBackpackSprayer from "./assets/images/backpack_sprayer_1789537034152.jpg";
import imgPetrolWaterPump from "./assets/images/petrol_water_pump_1789028875127.jpg";
import imgSubmersiblePump from "./assets/images/submersible_solar_pump_1789537226900.jpg";
import imgChaffCutter from "./assets/images/chaff_cutter_machine_1790726956111.jpg";
import imgMaizeSeeds from "./assets/images/maize_seeds_bag_1789537024362.jpg";
import imgSunflowerSeeds from "./assets/images/sunflower_seeds_1789537055135.jpg";
import imgCropTarpaulin from "./assets/images/blue_tarpaulin_1789537065716.jpg";
import imgGrainBags from "./assets/images/grain_storage_bags_1789537087191.jpg";
import imgHerbicideCan from "./assets/images/herbicide_jerrycan_1789537098028.jpg";
import imgFarmToolsKit from "./assets/images/farming_tools_kit_1789537108300.jpg";
import imgDapFertilizer from "./assets/images/dap_fertilizer_bag_1789537001954.jpg";
import imgEggIncubator from "./assets/images/digital_egg_incubator_1790726922490.jpg";

import imgWeddingArch from "./assets/images/decor_wedding_arch_1791018057899.jpg";
import imgFogMachine from "./assets/images/decor_fog_machine_1791018075245.jpg";
import imgParLights from "./assets/images/decor_par_lights_1791018086492.jpg";
import imgFlowerWall from "./assets/images/decor_flower_wall_1791018096016.jpg";
import imgBalloonPump from "./assets/images/decor_balloon_pump_1791018108167.jpg";
import imgChandelier from "./assets/images/decor_chandelier_1791018118614.jpg";
import imgSequinWall from "./assets/images/decor_sequin_wall_1791018130193.jpg";
import imgCenterpieces from "./assets/images/decor_centerpieces_1791018142089.jpg";
import imgSparkMachine from "./assets/images/decor_spark_machine_1791018153901.jpg";
import imgBackdropStand from "./assets/images/decor_backdrop_stand_1791018163950.jpg";
import imgCurtainLights from "./assets/images/decor_curtain_lights_1791018170982.jpg";
import imgDiscoLight from "./assets/images/decor_disco_light_1791018181377.jpg";

import imgPodcastMic from "./assets/images/professional_podcast_mic_xlr_1790727473042.jpg";
import imgWirelessLavalier from "./assets/images/wireless_lavalier_mic_system_1790727496215.jpg";
import imgStudioSoftbox from "./assets/images/rgb_studio_softbox_lighting_1790727486604.jpg";
import imgSmartphoneGimbal from "./assets/images/smartphone_video_rig_gimbal_1790727507413.jpg";
import imgGreenScreen from "./assets/images/green_screen_chromakey_kit_1790727518025.jpg";
import imgTeleprompter from "./assets/images/teleprompter_for_tablet_smartphone_1790727529132.jpg";
import imgAudioMixer from "./assets/images/portable_audio_mixer_interface_1790727541971.jpg";
import imgVideoCapture from "./assets/images/video_capture_card_4k_hdr_1790727555537.jpg";
import imgOverheadRig from "./assets/images/overhead_camera_mount_rig_1790727569277.jpg";
import imgVideoTripod from "./assets/images/professional_video_tripod_fluid_head_1790727579728.jpg";
import imgVloggingCamera from "./assets/images/vlogging_camera_kit_4k_1790727461352.jpg";
import imgAcousticPanels from "./assets/images/acoustic_sound_proofing_panels_pack_1790727590889.jpg";

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
  "Zambia": { curr: "ZMW", rate: 0.01 }
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
export const STORAGE_VERSION_TAG = "ov_v123_pure_product_shots_audio_video_final";
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
  // UKURASA WA 1: Vifaa vya Kilimo (Picha Halisi za Bidhaa Zenyewe Bila Watu) - 100k - 400k TZS
  // --------------------------------------------------------------------------
  {
    id: 1,
    name: "Kamau Njoroge",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nairobi",
    product: "Heavy-Duty Backpack Knapsack Farm Sprayer 16L",
    productValue: 145000,
    payout: 7250,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    productImage: imgBackpackSprayer
  },
  {
    id: 2,
    name: "Kondo Mwalimu",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mbeya",
    product: "Petrol Engine Irrigation Water Pump 2-Inch 5.5HP",
    productValue: 385000,
    payout: 19250,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    productImage: imgPetrolWaterPump
  },
  {
    id: 3,
    name: "Lameck Lungu",
    gender: "male",
    country: "Zambia",
    flag: "🇿🇲",
    city: "Lusaka",
    product: "Submersible Solar Farm Borehole Water Pump 24V",
    productValue: 340000,
    payout: 17000,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgSubmersiblePump
  },
  {
    id: 4,
    name: "Jean Nizeyimana",
    gender: "male",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Kigali",
    product: "Motorized Electric Chaff Cutter & Fodder Chopper 2.2kW",
    productValue: 390000,
    payout: 19500,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    productImage: imgChaffCutter
  },
  {
    id: 5,
    name: "Sula Mukasa",
    gender: "male",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Kampala",
    product: "Certified Hybrid Maize Planting Seeds (50kg Bag)",
    productValue: 180000,
    payout: 9000,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    productImage: imgMaizeSeeds
  },
  {
    id: 6,
    name: "Kofi Boateng",
    gender: "male",
    country: "Ghana",
    flag: "🇬🇭",
    city: "Accra",
    product: "High-Yield Sunflower Planting Seeds (25kg Sack)",
    productValue: 155000,
    payout: 7750,
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&q=80",
    productImage: imgSunflowerSeeds
  },
  {
    id: 7,
    name: "Dieudonne Kasongo",
    gender: "male",
    country: "Congo (DRC)",
    flag: "🇨🇩",
    city: "Kinshasa",
    product: "Heavy Reinforced Agricultural Crop Drying Tarpaulin (10x12m)",
    productValue: 160000,
    payout: 8000,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    productImage: imgCropTarpaulin
  },
  {
    id: 8,
    name: "Njeri Karanja",
    gender: "female",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Mombasa",
    product: "Grain Storage Hermetic Protection Bags (Bundle of 25)",
    productValue: 135000,
    payout: 6750,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    productImage: imgGrainBags
  },
  {
    id: 9,
    name: "Mwamtumu Kikwete",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Zanzibar",
    product: "Selective Crop Herbicide & Weed Control Canister 5L",
    productValue: 115000,
    payout: 5750,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    productImage: imgHerbicideCan
  },
  {
    id: 10,
    name: "Flavia Nabirye",
    gender: "female",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Jinja",
    product: "Complete Farm Hand Tools Kit (Hoes, Machetes & Rakes)",
    productValue: 175000,
    payout: 8750,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    productImage: imgFarmToolsKit
  },
  {
    id: 11,
    name: "Rajabu Mwigulu",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Tabora",
    product: "DAP High-Grade Crop Planting Fertilizer (50kg Bag)",
    productValue: 210000,
    payout: 10500,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    productImage: imgDapFertilizer
  },
  {
    id: 12,
    name: "Aline Gasana",
    gender: "female",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Musanze",
    product: "Automatic Digital Poultry Egg Incubator Machine (96 Eggs)",
    productValue: 295000,
    payout: 14750,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    productImage: imgEggIncubator
  },

  // --------------------------------------------------------------------------
  // UKURASA WA 2: Vifaa vya Kufanyia Decoration (Picha Halisi za Bidhaa Zenyewe Bila Watu) - 100k - 400k TZS
  // --------------------------------------------------------------------------
  {
    id: 13,
    name: "Wanjiku Mutua",
    gender: "female",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nairobi",
    product: "Circular Golden Metal Wedding Arch Frame Stand (2.4m)",
    productValue: 195000,
    payout: 9750,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    productImage: imgWeddingArch
  },
  {
    id: 14,
    name: "Juma Mwakipesile",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mwanza",
    product: "Stage Low-Lying Dry Ice Fog Smoke Machine 1500W",
    productValue: 380000,
    payout: 19000,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    productImage: imgFogMachine
  },
  {
    id: 15,
    name: "Chanda Mwila",
    gender: "female",
    country: "Zambia",
    flag: "🇿🇲",
    city: "Kitwe",
    product: "Wireless Rechargeable RGB Stage Uplighting Par Lights (Set of 4)",
    productValue: 275000,
    payout: 13750,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    productImage: imgParLights
  },
  {
    id: 16,
    name: "Muwonge Ssebaggala",
    gender: "male",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Kampala",
    product: "3D Floral Hydrangea Flower Wall Panels Backdrop (6 Pieces)",
    productValue: 220000,
    payout: 11000,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    productImage: imgFlowerWall
  },
  {
    id: 17,
    name: "Nadine Uwimana",
    gender: "female",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Kigali",
    product: "Electric Dual-Nozzle Balloon Blower Pump Machine",
    productValue: 125000,
    payout: 6250,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    productImage: imgBalloonPump
  },
  {
    id: 18,
    name: "Alain Mutombo",
    gender: "male",
    country: "Congo (DRC)",
    flag: "🇨🇩",
    city: "Lubumbashi",
    product: "Luxury Crystal Hanging Chandelier Ceiling Pendant Light",
    productValue: 350000,
    payout: 17500,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    productImage: imgChandelier
  },
  {
    id: 19,
    name: "Kojo Asante",
    gender: "male",
    country: "Ghana",
    flag: "🇬🇭",
    city: "Kumasi",
    product: "Shimmer Sequin Wall Backdrop Grid Panels (Pack of 24)",
    productValue: 185000,
    payout: 9250,
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&q=80",
    productImage: imgSequinWall
  },
  {
    id: 20,
    name: "Zabibu Mwakajinga",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dodoma",
    product: "Gold Metal Tall Geometric Table Centerpiece Vases (Set of 6)",
    productValue: 165000,
    payout: 8250,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    productImage: imgCenterpieces
  },
  {
    id: 21,
    name: "Kiprono Koech",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Eldoret",
    product: "Cold Spark Fountain Stage Firework Machine 600W",
    productValue: 395000,
    payout: 19750,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    productImage: imgSparkMachine
  },
  {
    id: 22,
    name: "Birungi Nabukalu",
    gender: "female",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Entebbe",
    product: "Heavy-Duty Portable Backdrop Stand Support Pipe & Base Kit",
    productValue: 210000,
    payout: 10500,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    productImage: imgBackdropStand
  },
  {
    id: 23,
    name: "Gaspard Hakizimana",
    gender: "male",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Gisenyi",
    product: "Warm White Waterproof LED Fairy Curtain Waterfall Lights (3x3m)",
    productValue: 140000,
    payout: 7000,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgCurtainLights
  },
  {
    id: 24,
    name: "Selemani Mshana",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Arusha",
    product: "Rotating Multi-Effect Disco Stage Ball Laser Light",
    productValue: 155000,
    payout: 7750,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    productImage: imgDiscoLight
  },

  // --------------------------------------------------------------------------
  // UKURASA WA 3: Vifaa vya Audio na Video Production (Picha Halisi za Bidhaa Zenyewe Bila Watu) - 100k - 400k TZS
  // --------------------------------------------------------------------------
  {
    id: 25,
    name: "Maina Gicheru",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nairobi",
    product: "Professional Studio Podcast XLR Condenser Microphone",
    productValue: 185000,
    payout: 9250,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    productImage: imgPodcastMic
  },
  {
    id: 26,
    name: "Shomari Mponda",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Mtwara",
    product: "Dual Wireless Lavalier Microphone System with Charging Case",
    productValue: 240000,
    payout: 12000,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    productImage: imgWirelessLavalier
  },
  {
    id: 27,
    name: "Mapalo Chileshe",
    gender: "female",
    country: "Zambia",
    flag: "🇿🇲",
    city: "Lusaka",
    product: "Bi-Color RGB Studio Softbox Continuous Video Lighting Kit",
    productValue: 310000,
    payout: 15500,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    productImage: imgStudioSoftbox
  },
  {
    id: 28,
    name: "Kirabo Namaganda",
    gender: "female",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Kampala",
    product: "3-Axis Handheld Smartphone Gimbal Video Stabilizer",
    productValue: 275000,
    payout: 13750,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    productImage: imgSmartphoneGimbal
  },
  {
    id: 29,
    name: "Faustin Habimana",
    gender: "male",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Kigali",
    product: "Collapsible Chromakey Green Screen Backdrop Panel Kit",
    productValue: 160000,
    payout: 8000,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    productImage: imgGreenScreen
  },
  {
    id: 30,
    name: "Serge Tshilombo",
    gender: "male",
    country: "Congo (DRC)",
    flag: "🇨🇩",
    city: "Kinshasa",
    product: "HD Glass Studio Teleprompter for Tablet & Smartphone",
    productValue: 225000,
    payout: 11250,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    productImage: imgTeleprompter
  },
  {
    id: 31,
    name: "Akua Darko",
    gender: "female",
    country: "Ghana",
    flag: "🇬🇭",
    city: "Accra",
    product: "Multi-Channel USB Studio Audio Interface Mixer Board",
    productValue: 365000,
    payout: 18250,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    productImage: imgAudioMixer
  },
  {
    id: 32,
    name: "Upendo Mwakalebela",
    gender: "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Iringa",
    product: "4K HDR Ultra-Low Latency HDMI Video Capture Card",
    productValue: 145000,
    payout: 7250,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    productImage: imgVideoCapture
  },
  {
    id: 33,
    name: "Brian Kiprotich",
    gender: "male",
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nakuru",
    product: "Heavy-Duty Overhead Desk Camera & Microphone Mount Rig",
    productValue: 195000,
    payout: 9750,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    productImage: imgOverheadRig
  },
  {
    id: 34,
    name: "Ronald Kigozi",
    gender: "male",
    country: "Uganda",
    flag: "🇺🇬",
    city: "Mbarara",
    product: "Heavy-Duty Professional Video Fluid Head Tripod (1.8m)",
    productValue: 320000,
    payout: 16000,
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&q=80",
    productImage: imgVideoTripod
  },
  {
    id: 35,
    name: "Yvette Mugabekazi",
    gender: "female",
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Butare",
    product: "Ultra HD 4K Vlogging & Live Streaming Camera Kit",
    productValue: 390000,
    payout: 19500,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    productImage: imgVloggingCamera
  },
  {
    id: 36,
    name: "Haruna Nchimbi",
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Songea",
    product: "High-Density Studio Acoustic Soundproofing Foam Panels (Pack of 24)",
    productValue: 130000,
    payout: 6500,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    productImage: imgAcousticPanels
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
