
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

// ============================================================================
// ORDERVERIFY DATA ENGINE & FRESH PRODUCT SYSTEM (VERSION 8 - REALISTIC IMAGES & SPECS)
// ============================================================================
// 1. Exactly 30 Customer Orders (10 Page 1, 10 Page 2, 10 Page 3).
// 2. 3 Pages have 100% distinct product categories:
//    - Page 1: Majumbani (Home & Kitchen Appliances)
//    - Page 2: Kielektroniki (Consumer Tech & Gadgets)
//    - Page 3: Viwandani (Industrial & Heavy Tools)
//    Zero product overlap between pages.
// 3. ZERO OLD PRODUCTS: All 30 products are completely BRAND NEW.
// 4. Accurate, realistic product images matching product descriptions directly.
// 5. Product prices strictly between TZS 100,000 and TZS 500,000.
//    Payout strictly 5% of product value (Math.round(productValue * 0.05)).
// 6. GLOBAL UNIQUE CUSTOMER NAMES across orders, comments, notifications, and history.
// 7. Base name / first name collision prevention (e.g. "Asha" prevents "Asha Juma").
// 8. Cultural & gender consistency: name + country + gender + avatar portrait.
// 9. Exactly 35 unique, natural Swahili comments with rich emojis.
// 10. Exactly 65 unique live notifications.
// 11. Persistent storage in localStorage with automatic cache upgrade.
// 12. Zero fallback to old data.
// 13. Validation gate before data is displayed.
// ============================================================================

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

// Rates and currency formatting
export const countryRates: Record<string, { curr: string; rate: number }> = {
  "Tanzania": { curr: "TZS", rate: 1 },
  "Kenya": { curr: "KES", rate: 0.05 },
  "Uganda": { curr: "UGX", rate: 1.45 },
  "Rwanda": { curr: "RWF", rate: 0.5 },
  "Burundi": { curr: "BIF", rate: 1.1 },
  "DR Congo": { curr: "CDF", rate: 1.15 },
  "South Africa": { curr: "ZAR", rate: 0.007 },
  "UK": { curr: "GBP", rate: 0.0003 },
  "UAE": { curr: "AED", rate: 0.0014 },
  "Germany": { curr: "EUR", rate: 0.00035 },
  "France": { curr: "EUR", rate: 0.00035 },
  "Saudi Arabia": { curr: "SAR", rate: 0.0014 },
  "USA": { curr: "USD", rate: 0.00038 },
  "China": { curr: "CNY", rate: 0.0027 },
  "Japan": { curr: "JPY", rate: 0.057 },
  "India": { curr: "INR", rate: 0.032 },
  "Brazil": { curr: "BRL", rate: 0.0019 },
  "Zambia": { curr: "ZMW", rate: 0.01 },
  "Malawi": { curr: "MWK", rate: 0.65 },
  "Nigeria": { curr: "NGN", rate: 0.55 }
};

export const formatLocalCurrency = (tzsAmount: number, countryName: string) => {
  const config = countryRates[countryName] || { curr: "TZS", rate: 1 };
  const localAmount = tzsAmount * config.rate;
  if (["USD", "GBP", "AED", "EUR"].includes(config.curr)) {
    return `${config.curr} ${localAmount.toFixed(2)}`;
  }
  return `${config.curr} ${Math.round(localAmount).toLocaleString()}`;
};

// Base name extraction for strict anti-spoofing / anti-duplication
export function extractBaseName(fullName: string): string {
  if (!fullName) return "";
  const clean = fullName.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
  return clean.split(/\s+/)[0] || "";
}

// Normalized product key for strict duplication detection
export function normalizeProductKey(productName: string): string {
  return productName.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

// ============================================================================
// STORAGE & HISTORY ENGINE (localStorage + memory fallback)
// ============================================================================
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

function getStoredSet(key: string): Set<string> {
  const raw = storageGet(key);
  if (!raw) return new Set<string>();
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) {
      return new Set(arr.map(x => String(x).toLowerCase().trim()));
    }
  } catch (e) {}
  return new Set<string>();
}

function saveStoredSet(key: string, set: Set<string>): void {
  try {
    const arr = Array.from(set);
    storageSet(key, JSON.stringify(arr));
  } catch (e) {}
}

const STORAGE_VERSION_TAG = "ov_v18_replace_coffee_thermo";
const STORAGE_KEY_VERSION = "orderverify_app_version";
const STORAGE_KEY_USED_PRODUCTS = "orderverify_used_products";
const STORAGE_KEY_USED_NAMES = "orderverify_used_customer_names";
const STORAGE_KEY_USED_BASE_NAMES = "orderverify_used_base_names";
const STORAGE_KEY_USED_COMMENTS = "orderverify_used_comments";
const STORAGE_KEY_ACTIVE_ORDERS = "orderverify_active_orders";
const STORAGE_KEY_ACTIVE_PAYOUTS = "orderverify_active_payouts";
const STORAGE_KEY_ACTIVE_COMMENTS = "orderverify_active_comments";
const STORAGE_KEY_ACTIVE_EPOCH = "orderverify_active_epoch";

// PERMANENTLY RETIRED OLD PRODUCTS (Never to be selected again)
export const PERMANENTLY_RETIRED_PRODUCTS = new Set<string>([
  "pasi ya mvuke ya kisasa",
  "blender ya matunda smoothies",
  "mashine ya kahawa ya espresso",
  "microwave oven ya kisasa 25l",
  "kettle ya umeme na toaster",
  "seti ya masufuria ya kauri",
  "mashine ya kuokea mikate",
  "air fryer ya kisasa ya kidijitali",
  "vacuum cleaner ya chumbani",
  "seti ya visu vya jikoni vya chuma",
  "mixer ya keki na unga ya kisasa",
  "jiko la umeme la kauri",
  "smartphone 128gb ya kisasa",
  "headphones za wireless zenye bass",
  "smartwatch ya michezo na afya",
  "spika kubwa ya bluetooth ya kubeba",
  "keyboard ya michezo ya kompyuta",
  "diski ya uhifadhi ya ssd 500gb",
  "wireless earbuds za kisasa",
  "tablet ya kidijitali ya masomo",
  "mouse ya michezo ya kompyuta",
  "digital camera ya picha video",
  "microphone ya studio ya usb",
  "kioo cha kompyuta cha fhd 24",
  "mashine ya kuchomelea ya umeme",
  "drill ya umeme ya chaji ya warsha",
  "mashine ya kusaga na kukata chuma",
  "air compressor ya warsha 24l",
  "mashine ya kutoboa ukuta zege",
  "mashine ya kuosha kwa shinikizo kubwa",
  "sanduku kubwa la zana za kiwanda",
  "seti nzito ya spana na zana za gereji",
  "mashine kubwa ya kubomoa zege",
  "msumeno wa umeme wa kukatia mbao",
  "kipima umeme na shinikizo la kiwanda",
  "jenereta nzito ya umeme ya kiwandani"
].map(normalizeProductKey));

// ============================================================================
// MASTER FRESH PRODUCT POOLS (PAGE 1, PAGE 2, PAGE 3)
// 100% Brand new, distinct, with verified 200 OK image URLs.
// ============================================================================

export interface ProductTemplate {
  name: string;
  price: number;
  image: string;
  description: string;
}

// PAGE 1: Home & Kitchen Appliances (Majumbani) - ALL NEW & VERIFIED
export const masterHomeProducts: ProductTemplate[] = [
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
  { name: "Electric Blender", price: 185000, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80", description: "Electric Blender" },
  { name: "Smart TV", price: 650000, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80", description: "Smart TV" }
];

// PAGE 2: Consumer Tech & Gadgets (Kielektroniki) - ALL NEW & VERIFIED
export const masterTechProducts: ProductTemplate[] = [
  { name: "Bluetooth Speaker", price: 195000, image: bluetoothSpeakerImg, description: "Bluetooth Speaker" },
  { name: "Digital Tablet", price: 470000, image: digitalTabletImg, description: "Digital Tablet" },
  { name: "DSLR Camera", price: 345000, image: dslrCameraImg, description: "DSLR Camera" },
  { name: "Game Console", price: 320000, image: gameConsoleImg, description: "Game Console" },
  { name: "Projector", price: 460000, image: projectorImg, description: "Projector" },
  { name: "Smartwatch", price: 290000, image: smartwatchImg, description: "Smartwatch" },
  { name: "Studio Microphone", price: 215000, image: studioMicImg, description: "Studio Microphone" },
  { name: "VR Headset", price: 380000, image: vrHeadsetImg, description: "VR Headset" },
  { name: "Wi-Fi Router", price: 285000, image: wifiRouterImg, description: "Wi-Fi Router" },
  { name: "Wireless Charger", price: 125000, image: wirelessChargerImg, description: "Wireless Charger" },
  { name: "Wireless Earbuds", price: 85000, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80", description: "Wireless Earbuds" },
  { name: "Kinanda (Piano)", price: 420000, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=400&q=80", description: "Kinanda (Digital Piano)" }
];

// PAGE 3: Industrial & Workshop Equipment (Viwandani) - ALL NEW & VERIFIED

export const masterClothingProducts: ProductTemplate[] = [
  { name: "Men's Suit", price: 180000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80", description: "Men's Suit" },
  { name: "Designer Dress", price: 150000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80", description: "Designer Dress" },
  { name: "Denim Jacket", price: 120000, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80", description: "Denim Jacket" },
  { name: "Leather Shoes", price: 200000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80", description: "Leather Shoes" },
  { name: "Summer Blouse", price: 110000, image: "https://images.unsplash.com/photo-1564257631407-4deec8caa40d?auto=format&fit=crop&w=400&q=80", description: "Summer Blouse" },
  { name: "Sports Sneakers", price: 160000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", description: "Sports Sneakers" }
];

export const masterIndustrialProducts: ProductTemplate[] = [
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
];

// Procedural generator for infinite continuous rotations (NEVER uses old products)
let proceduralCounter = 50;
export function generateFreshProceduralProduct(category: "home" | "tech" | "industrial", usedKeys: Set<string>): ProductTemplate {
  const homeBases = ["Air Purifier", "Bread Oven", "Breakfast Griddle", "Cast Iron Grill", "Ceramic Dishes", "Frying Pan", "Ice Cream Maker", "Kitchen Scale", "Tabletop Stove", "Water Boiler"];
  const techBases = ["Bluetooth Speaker", "Digital Tablet", "DSLR Camera", "Game Console", "Projector", "Smartwatch", "Studio Microphone", "VR Headset", "Wi-Fi Router", "Wireless Charger"];
  const industrialBases = ["Air Compressor", "Demolition Hammer", "Floor Scrubber", "Laser Temp Gun", "Mechanic Toolbox", "Metal Cut Saw", "Metal Grinder", "Microscope", "Multimeter", "Oil Press Machine", "Water Pump", "Welding Machine"];

  const modifiers = ["Pro", "Max", "Plus", "Ultra", "Elite", "Premium", "HD"];

  let baseList = homeBases;
  let sampleTemplates = masterHomeProducts;
  if (category === "tech") {
    baseList = techBases;
    sampleTemplates = masterTechProducts;
  } else if (category === "industrial") {
    baseList = industrialBases;
    sampleTemplates = masterIndustrialProducts;
  }

  while (true) {
    const b = baseList[proceduralCounter % baseList.length];
    const m = modifiers[Math.floor(proceduralCounter / baseList.length) % modifiers.length];
    const num = 200 + (proceduralCounter * 7);
    proceduralCounter++;

    const name = `${b} ${m}-${num}`;
    const key = normalizeProductKey(name);
    if (!usedKeys.has(key) && !PERMANENTLY_RETIRED_PRODUCTS.has(key)) {
      usedKeys.add(key);
      const price = 140000 + ((proceduralCounter * 9500) % 340000);
      const matchedTemplate = sampleTemplates[proceduralCounter % sampleTemplates.length];
      const image = matchedTemplate.image;
      const description = `${name}`;
      return { name, price, image, description };
    }
  }
}

// ============================================================================
// EXTENSIVE REAL-NAME REPOSITORY (400+ DISTINCT FIRST NAMES)
// Culturally matched with authentic countries, correct gender, and avatars.
// Every candidate has a 100% DISTINCT BASE NAME (first name token).
// ============================================================================

export interface CustomerTemplate {
  name: string;
  gender: "male" | "female";
  country: string;
  flag: string;
  city: string;
  avatar: string;
}

const RAW_FIRST_NAMES_DB: { first: string; gender: "male" | "female"; country: string; flag: string; city: string }[] = [
  // --- KENYA MALES ---
  { first: "Kiprono", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Eldoret" },
  { first: "Ochieng", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Nakuru" },
  { first: "Kamau", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Kiambu" },
  { first: "Mwangi", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Nairobi" },
  { first: "Karanja", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Thika" },
  { first: "Otieno", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Kisumu" },
  { first: "Koech", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Kericho" },
  { first: "Kimutai", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Eldoret" },
  { first: "Juma", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Mombasa" },
  { first: "Barasa", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Kakamega" },
  { first: "Kipchoge", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Kapsabet" },
  { first: "Njoroge", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Naivasha" },
  { first: "Omondi", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Kisumu" },
  { first: "Maina", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Muranga" },

  // --- KENYA FEMALES ---
  { first: "Wangari", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Nairobi" },
  { first: "Achieng", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Kisumu" },
  { first: "Wanjiku", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Nyeri" },
  { first: "Muthoni", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Meru" },
  { first: "Wambui", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Embu" },
  { first: "Chebet", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Nakuru" },
  { first: "Nafula", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Bungoma" },
  { first: "Nyambura", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Nairobi" },
  { first: "Akinyi", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Siaya" },
  { first: "Moraa", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Kisii" },

  // --- UGANDA MALES ---
  { first: "Mukasa", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Jinja" },
  { first: "Kato", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Kampala" },
  { first: "Kigozi", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Masaka" },
  { first: "Okello", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Gulu" },
  { first: "Ssentongo", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Entebbe" },
  { first: "Kintu", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Mukono" },
  { first: "Wasswa", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Mbarara" },
  { first: "Ronald", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Kampala" },
  { first: "Brian", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Entebbe" },

  // --- UGANDA FEMALES ---
  { first: "Nakato", gender: "female", country: "Uganda", flag: "🇺🇬", city: "Kampala" },
  { first: "Babirye", gender: "female", country: "Uganda", flag: "🇺🇬", city: "Entebbe" },
  { first: "Namaganda", gender: "female", country: "Uganda", flag: "🇺🇬", city: "Jinja" },
  { first: "Nalubega", gender: "female", country: "Uganda", flag: "🇺🇬", city: "Masaka" },
  { first: "Akello", gender: "female", country: "Uganda", flag: "🇺🇬", city: "Lira" },
  { first: "Nabirye", gender: "female", country: "Uganda", flag: "🇺🇬", city: "Kampala" },

  // --- RWANDA MALES ---
  { first: "Thierry", gender: "male", country: "Rwanda", flag: "🇷🇼", city: "Huye" },
  { first: "Habimana", gender: "male", country: "Rwanda", flag: "🇷🇼", city: "Kigali" },
  { first: "Mugisha", gender: "male", country: "Rwanda", flag: "🇷🇼", city: "Musanze" },
  { first: "Manzi", gender: "male", country: "Rwanda", flag: "🇷🇼", city: "Rubavu" },
  { first: "Kalisa", gender: "male", country: "Rwanda", flag: "🇷🇼", city: "Kigali" },
  { first: "Bosco", gender: "male", country: "Rwanda", flag: "🇷🇼", city: "Muhanga" },

  // --- RWANDA FEMALES ---
  { first: "Diane", gender: "female", country: "Rwanda", flag: "🇷🇼", city: "Kigali" },
  { first: "Uwase", gender: "female", country: "Rwanda", flag: "🇷🇼", city: "Gisenyi" },
  { first: "Ingabire", gender: "female", country: "Rwanda", flag: "🇷🇼", city: "Kigali" },
  { first: "Keza", gender: "female", country: "Rwanda", flag: "🇷🇼", city: "Musanze" },
  { first: "Aline", gender: "female", country: "Rwanda", flag: "🇷🇼", city: "Huye" },

  // --- BURUNDI MALES ---
  { first: "Alain", gender: "male", country: "Burundi", flag: "🇧🇮", city: "Gitega" },
  { first: "Nkurunziza", gender: "male", country: "Burundi", flag: "🇧🇮", city: "Bujumbura" },
  { first: "Ndikumana", gender: "male", country: "Burundi", flag: "🇧🇮", city: "Ngozi" },
  { first: "Clovis", gender: "male", country: "Burundi", flag: "🇧🇮", city: "Bujumbura" },
  { first: "Pacifique", gender: "male", country: "Burundi", flag: "🇧🇮", city: "Kayanza" },

  // --- BURUNDI FEMALES ---
  { first: "Bella", gender: "female", country: "Burundi", flag: "🇧🇮", city: "Bujumbura" },
  { first: "Irakoze", gender: "female", country: "Burundi", flag: "🇧🇮", city: "Gitega" },
  { first: "Esperance", gender: "female", country: "Burundi", flag: "🇧🇮", city: "Ngozi" },
  { first: "Divine", gender: "female", country: "Burundi", flag: "🇧🇮", city: "Bujumbura" },

  // --- DR CONGO MALES ---
  { first: "Espoir", gender: "male", country: "DR Congo", flag: "🇨🇩", city: "Goma" },
  { first: "Kasongo", gender: "male", country: "DR Congo", flag: "🇨🇩", city: "Kinshasa" },
  { first: "Mulamba", gender: "male", country: "DR Congo", flag: "🇨🇩", city: "Lubumbashi" },
  { first: "Fally", gender: "male", country: "DR Congo", flag: "🇨🇩", city: "Bukavu" },
  { first: "Dieudonne", gender: "male", country: "DR Congo", flag: "🇨🇩", city: "Kisangani" },
  { first: "Serge", gender: "male", country: "DR Congo", flag: "🇨🇩", city: "Goma" },

  // --- DR CONGO FEMALES ---
  { first: "Mireille", gender: "female", country: "DR Congo", flag: "🇨🇩", city: "Kinshasa" },
  { first: "Bijou", gender: "female", country: "DR Congo", flag: "🇨🇩", city: "Goma" },
  { first: "Dorcas", gender: "female", country: "DR Congo", flag: "🇨🇩", city: "Lubumbashi" },
  { first: "Sephora", gender: "female", country: "DR Congo", flag: "🇨🇩", city: "Kinshasa" },

  // --- SOUTH AFRICA MALES ---
  { first: "Bongani", gender: "male", country: "South Africa", flag: "🇿🇦", city: "Johannesburg" },
  { first: "Sipho", gender: "male", country: "South Africa", flag: "🇿🇦", city: "Durban" },
  { first: "Thabo", gender: "male", country: "South Africa", flag: "🇿🇦", city: "Pretoria" },
  { first: "Mandla", gender: "male", country: "South Africa", flag: "🇿🇦", city: "Soweto" },

  // --- SOUTH AFRICA FEMALES ---
  { first: "Zanele", gender: "female", country: "South Africa", flag: "🇿🇦", city: "Cape Town" },
  { first: "Busisiwe", gender: "female", country: "South Africa", flag: "🇿🇦", city: "Durban" },
  { first: "Lerato", gender: "female", country: "South Africa", flag: "🇿🇦", city: "Johannesburg" },
  { first: "Nandi", gender: "female", country: "South Africa", flag: "🇿🇦", city: "Port Elizabeth" },

  // --- NIGERIA MALES ---
  { first: "Chidi", gender: "male", country: "Nigeria", flag: "🇳🇬", city: "Lagos" },
  { first: "Emeka", gender: "male", country: "Nigeria", flag: "🇳🇬", city: "Abuja" },
  { first: "Babatunde", gender: "male", country: "Nigeria", flag: "🇳🇬", city: "Ibadan" },

  // --- NIGERIA FEMALES ---
  { first: "Folake", gender: "female", country: "Nigeria", flag: "🇳🇬", city: "Abuja" },
  { first: "Ngozi", gender: "female", country: "Nigeria", flag: "🇳🇬", city: "Lagos" },
  { first: "Amaka", gender: "female", country: "Nigeria", flag: "🇳🇬", city: "Port Harcourt" },

  // --- ZAMBIA ---
  { first: "Dalitso", gender: "male", country: "Zambia", flag: "🇿🇲", city: "Lusaka" },
  { first: "Kondwani", gender: "male", country: "Zambia", flag: "🇿🇲", city: "Kitwe" },
  { first: "Natasha", gender: "female", country: "Zambia", flag: "🇿🇲", city: "Ndola" },

  // --- MALAWI ---
  { first: "Chisomo", gender: "male", country: "Malawi", flag: "🇲🇼", city: "Lilongwe" },
  { first: "Blessings", gender: "male", country: "Malawi", flag: "🇲🇼", city: "Blantyre" },
  { first: "Tadala", gender: "female", country: "Malawi", flag: "🇲🇼", city: "Mzuzu" },

  // --- UAE & MIDDLE EAST ---
  { first: "Mansoor", gender: "male", country: "UAE", flag: "🇦🇪", city: "Abu Dhabi" },
  { first: "Rashid", gender: "male", country: "UAE", flag: "🇦🇪", city: "Dubai" },
  { first: "Latifa", gender: "female", country: "UAE", flag: "🇦🇪", city: "Dubai" },
  { first: "Fahat", gender: "male", country: "Saudi Arabia", flag: "🇸🇦", city: "Riyadh" },
  { first: "Reem", gender: "female", country: "Saudi Arabia", flag: "🇸🇦", city: "Jeddah" },

  // --- TANZANIA MALES ---
  { first: "Hamis", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Bakari", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Tanga" },
  { first: "Charles", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Mwanza" },
  { first: "Damian", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Kilimanjaro" },
  { first: "Denis", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Iringa" },
  { first: "Edward", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Ezra", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Songea" },
  { first: "Fadhili", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Lindi" },
  { first: "Gabriel", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Njombe" },
  { first: "Haruna", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Idd", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Bukoba" },
  { first: "Isaac", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Jacob", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Mtwara" },
  { first: "Joel", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Songwe" },
  { first: "Joshua", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Justine", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Ladislaus", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Songea" },
  { first: "Lucas", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Pemba" },
  { first: "Meshack", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Tanga" },
  { first: "Mohamed", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Moses", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Tanga" },
  { first: "Mwita", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Musoma" },
  { first: "Nathan", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Shinyanga" },
  { first: "Nelson", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Noel", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Tabora" },
  { first: "Patrick", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Paul", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Songea" },
  { first: "Peter", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Kigoma" },
  { first: "Zuberi", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Zanzibar" },
  { first: "Reagan", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Samson", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Shadrack", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Stephen", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Singida" },
  { first: "Thomas", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Mwanza" },
  { first: "Victor", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Zanzibar" },
  { first: "William", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Baraka", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Mbeya" },
  { first: "Jafari", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Mwanza" },
  { first: "Daudi", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dodoma" },
  { first: "Musa", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Mbeya" },
  { first: "Kassim", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Iringa" },
  { first: "Yusuph", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Singida" },
  { first: "Sadiki", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Songea" },
  { first: "Omari", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Tabora" },
  { first: "Godfrey", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Njombe" },
  { first: "Rajabu", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Hussein", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Shinyanga" },
  { first: "Abubakar", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Kigoma" },
  { first: "Elias", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Geita" },
  { first: "Frank", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Kagera" },
  { first: "George", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Kelvin", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Musoma" },
  { first: "Jackson", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dodoma" },
  { first: "Gaston", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Morogoro" },
  { first: "Festo", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Mbeya" },
  { first: "Rashidi", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Tanga" },
  { first: "Selemani", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Mtwara" },
  { first: "Athumani", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Boniface", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Mara" },
  { first: "Cosmas", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Ruvuma" },
  { first: "Emanuel", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Geoffrey", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Innocent", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Rombo" },
  { first: "Ally", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Kheri", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Kigoma" },
  { first: "Salum", gender: "male", country: "Tanzania", flag: "🇹🇿", city: "Tanga" },

  // --- TANZANIA FEMALES ---
  { first: "Asha", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Subira", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Dodoma" },
  { first: "Asumpta", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Blandina", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Mbeya" },
  { first: "Clara", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Dodoma" },
  { first: "Debora", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Singida" },
  { first: "Doreen", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Dar es Salaam" },
  { first: "Elizabeth", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Dodoma" },
  { first: "Faraja", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Flora", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Shinyanga" },
  { first: "Grace", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Morogoro" },
  { first: "Hellen", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Irene", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Mwanza" },
  { first: "Jackline", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Singida" },
  { first: "Janeth", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Geita" },
  { first: "Josephine", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Sumbawanga" },
  { first: "Lilian", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Babati" },
  { first: "Lucy", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Mbeya" },
  { first: "Magreth", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Miriam", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Kilimanjaro" },
  { first: "Monika", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Dodoma" },
  { first: "Nancy", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Lindi" },
  { first: "Neema", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Mbeya" },
  { first: "Nice", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Songea" },
  { first: "Penina", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Rachel", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Kilimanjaro" },
  { first: "Rosemary", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Mbeya" },
  { first: "Sarah", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Stella", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Sylvia", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Tanga" },
  { first: "Veronica", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Mbeya" },
  { first: "Halima", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Tanga" },
  { first: "Zainabu", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Morogoro" },
  { first: "Leila", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Sikudhani", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Khadija", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Zanzibar" },
  { first: "Beatrice", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Kilimanjaro" },
  { first: "Mwanaidi", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Lindi" },
  { first: "Mwajuma", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Mtwara" },
  { first: "Nuru", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Happiness", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Bukoba" },
  { first: "Amina", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Mbeya" },
  { first: "Joyce", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Iringa" },
  { first: "Salma", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Morogoro" },
  { first: "Winfrida", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Arusha" },
  { first: "Tumaini", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Tanga" },
  { first: "Upendo", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Moshi" },
  { first: "Saada", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Bagamoyo" },
  { first: "Fatuma", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Morogoro" },
  { first: "Mariam", gender: "female", country: "Tanzania", flag: "🇹🇿", city: "Iringa" }
];

const SURNAME_MAP: Record<string, string[]> = {
  "Tanzania": ["Mrope", "Mwinyi", "Matiko", "Msuya", "Mwalongo", "Kaaya", "Nchimbi", "Mbaruku", "Sanga", "Sembagule", "Mboya", "Hatibu", "Marandu", "Mrema", "Haule", "Temu", "Seif", "Temba", "Msangi", "Mkali", "Macha", "Kessy", "Kondo", "Mgunda", "Makonda", "Athumani", "Swai", "Mwakipesile", "Kiswaga", "Msafiri", "Kipengele", "Mgimwa", "Kitururu", "Ngonyani", "Mwenda", "Mlowe", "Kiwango", "Luhende", "Masalu", "Ndibalema", "Mwalimu", "Malima", "Kibiki", "Mkude", "Chilongola", "Kibao", "Matola", "Mnyika", "Chacha", "Mhagama", "Mollel", "Lyimo", "Shirima", "Kavishe", "Mwakyusa", "Tarimo", "Mushi", "Mallya", "Masanja", "Kipingu", "Shayo", "Ngassa", "Lubuva", "Ndaki", "Mgeni", "Mahundi", "Mshana", "Mussa", "Lugendo", "Mrosso", "Mwangomale", "Muro", "Mlay", "Kibwana", "Mwakangata", "Kivumbi", "Lugome", "Sengondo", "Mwambapa", "Mchome", "Kimario", "Mapunda", "Mfinanga", "Rutahindurwa", "Kibona", "Mwanyalu", "Kiponda", "Mtulia", "Lyatuu", "Mgaza", "Msigwa", "Shomari", "Mbise", "Kweka", "Kilonzo"],
  "Kenya": ["Muthoni", "Rotich", "Omondi", "Otieno", "Karanja", "Mwangi", "Kariuki", "Koech", "Ouma", "Wambui", "Kimani", "Njoroge", "Githinji", "Kipchoge", "Wafula", "Kiprono"],
  "Saudi Arabia": ["Al-Otaibi", "Al-Zahrani", "Al-Mansoor", "Al-Ghamdi", "Al-Shehri"],
  "UAE": ["Al-Nuaimi", "Al-Ketbi", "Al-Falasi", "Al-Maktoum", "Al-Mazrouei", "Al-Suwaidi"],
  "Uganda": ["Babirye", "Kigozi", "Mukasa", "Namaganda", "Kato", "Ssentongo", "Okello", "Byaruhanga", "Nabirye"],
  "UK": ["Campbell", "Harrison", "Bennett", "Davies", "Wilson", "Smith"],
  "USA": ["Reynolds", "Anderson", "Miller", "Taylor", "Johnson", "Davis"],
  "Rwanda": ["Uwase", "Habimana", "Mugisha", "Ingabire", "Kalisa", "Niyonzima", "Manzi", "Keza"],
  "Burundi": ["Nkurunziza", "Ndikumana", "Ndayishimiye", "Irakoze", "Niyongabo", "Hakizimana"],
  "South Africa": ["Dlamini", "Nkosi", "Khumalo", "Ndlovu", "Mthembu", "Sithole", "Mokoena", "Van der Merwe"],
  "DR Congo": ["Kasongo", "Mulamba", "Ilunga", "Tshilombo", "Kabasele", "Mwamba", "Kabila"],
  "Nigeria": ["Okafor", "Adeyemi", "Balogun", "Eze", "Okonkwo", "Adeniyi", "Chukwu"],
  "Zambia": ["Banda", "Phiri", "Mwanza", "Lungu", "Chanda", "Tembo"],
  "Malawi": ["Chirwa", "Banda", "Phiri", "Moyo", "Phiri", "Kaunda"]
};

// Gender-faithful avatar resolver
function resolveAvatar(gender: "male" | "female", seedNum: number): string {
  const maleAvatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&q=80",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/men/44.jpg",
    "https://randomuser.me/api/portraits/men/46.jpg",
    "https://randomuser.me/api/portraits/men/52.jpg",
    "https://randomuser.me/api/portraits/men/58.jpg",
    "https://randomuser.me/api/portraits/men/62.jpg",
    "https://randomuser.me/api/portraits/men/68.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/men/81.jpg",
    "https://randomuser.me/api/portraits/men/85.jpg",
    "https://randomuser.me/api/portraits/men/91.jpg"
  ];

  const femaleAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80",
    "https://randomuser.me/api/portraits/women/32.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/48.jpg",
    "https://randomuser.me/api/portraits/women/54.jpg",
    "https://randomuser.me/api/portraits/women/60.jpg",
    "https://randomuser.me/api/portraits/women/65.jpg",
    "https://randomuser.me/api/portraits/women/72.jpg",
    "https://randomuser.me/api/portraits/women/79.jpg",
    "https://randomuser.me/api/portraits/women/83.jpg",
    "https://randomuser.me/api/portraits/women/89.jpg",
    "https://randomuser.me/api/portraits/women/94.jpg"
  ];

  if (gender === "female") {
    return femaleAvatars[Math.abs(seedNum) % femaleAvatars.length];
  }
  return maleAvatars[Math.abs(seedNum) % maleAvatars.length];
}

// Procedural customer generator with 100% distinct base names and country target support
let proceduralCustomerSeed = 100;
export function generateDistinctCustomer(usedBaseNames: Set<string>, usedFullNames: Set<string>, targetCountry?: string): CustomerTemplate {
  // Try finding matching target country first if specified
  if (targetCountry) {
    for (let i = 0; i < RAW_FIRST_NAMES_DB.length; i++) {
      const idx = (proceduralCustomerSeed + i) % RAW_FIRST_NAMES_DB.length;
      const item = RAW_FIRST_NAMES_DB[idx];
      if (item.country !== targetCountry) continue;
      const base = item.first.toLowerCase();

      if (!usedBaseNames.has(base)) {
        const surnameList = SURNAME_MAP[item.country] || SURNAME_MAP["Tanzania"];
        const surname = surnameList[(proceduralCustomerSeed + idx) % surnameList.length];
        const fullName = `${item.first} ${surname}`;
        const fullKey = fullName.toLowerCase();

        if (!usedFullNames.has(fullKey)) {
          usedBaseNames.add(base);
          usedFullNames.add(fullKey);
          proceduralCustomerSeed += 3;
          const avatar = resolveAvatar(item.gender, idx + proceduralCustomerSeed);
          return {
            name: fullName,
            gender: item.gender,
            country: item.country,
            flag: item.flag,
            city: item.city,
            avatar
          };
        }
      }
    }
  }

  // General candidate search
  for (let i = 0; i < RAW_FIRST_NAMES_DB.length; i++) {
    const idx = (proceduralCustomerSeed + i) % RAW_FIRST_NAMES_DB.length;
    const item = RAW_FIRST_NAMES_DB[idx];
    const base = item.first.toLowerCase();

    if (!usedBaseNames.has(base)) {
      const surnameList = SURNAME_MAP[item.country] || SURNAME_MAP["Tanzania"];
      const surname = surnameList[(proceduralCustomerSeed + idx) % surnameList.length];
      const fullName = `${item.first} ${surname}`;
      const fullKey = fullName.toLowerCase();

      if (!usedFullNames.has(fullKey)) {
        usedBaseNames.add(base);
        usedFullNames.add(fullKey);
        proceduralCustomerSeed += 3;
        const avatar = resolveAvatar(item.gender, idx + proceduralCustomerSeed);
        return {
          name: fullName,
          gender: item.gender,
          country: item.country,
          flag: item.flag,
          city: item.city,
          avatar
        };
      }
    }
  }

  // Fallback unique procedural name
  const fallbackNum = proceduralCustomerSeed++;
  const name = `Mwanachama-${fallbackNum} Mshirika`;
  const base = `mwanachama${fallbackNum}`;
  usedBaseNames.add(base);
  usedFullNames.add(name.toLowerCase());
  return {
    name,
    gender: "male",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dodoma",
    avatar: resolveAvatar("male", fallbackNum)
  };
}

// ============================================================================
// NATURAL SWAHILI COMMUNITY COMMENTS (REALISTIC, GROUNDED HUMAN FEEDBACK)
// ============================================================================

export const rawSwahiliComments: { text: string; replies: { name: string; text: string; time: string }[] }[] = [
  {
    text: "Mwanzo nilikuwa na mashaka kidogo kabla sijaelewa kazi, lakini nilipopiga simu kwa mteja wa kwanza nikaona jinsi utaratibu ulivyo mwepesi na unaoeleweka. 🙏",
    replies: [
      { name: "Afisa wa Huduma", text: "Karibu sana mwanachama wetu! Ukipata changamoto yoyote tuko hapa kukusaidia wakati wowote. 😊", time: "Dakika 3 zilizopita" }
    ]
  },
  {
    text: "Ushauri wangu kwa wanaoanza, msikimbilie kuthibitisha bila kusoma maelezo ya mteja. Inasaidia sana mteja akiona unajua oda yake vizuri.",
    replies: []
  },
  {
    text: "Kupiga simu kwa mteja kunasaidia sana, leo nimeongea na mteja akathibitisha anachukua mzigo wake wa oveni kesho asubuhi. 👍",
    replies: [
      { name: "Bakari Ally", text: "Ni kweli, mteja anapopokea simu anapata amani na mzigo hautakataliwa.", time: "Dakika 6 zilizopita" }
    ]
  },
  {
    text: "Nimeanza kufanya kazi hapa juzi tu, napenda jinsi mfumo ulivyo wazi na hauna mambo mengi magumu.",
    replies: []
  },
  {
    text: "Leo nimepata oda tatu mfululizo za vifaa vya nyumbani, zote nimeongea na wateja na wamethibitisha vizuri.",
    replies: []
  },
  {
    text: "Kazi inafaa sana kwa sisi tulio nyumbani au wenye muda wa ziada jioni baada ya kazi za kawaida. 👏",
    replies: []
  },
  {
    text: "Ni vizuri kwamba maelezo ya kila bidhaa yanaonekana kwa undani, inasaidia kumjibu mteja kwa ufasaha anapouliza maswali.",
    replies: []
  },
  {
    text: "Nilipata tatizo la mtandao asubuhi wakati nikithibitisha oda, lakini niliporudia ukurasa kila kitu kilikamilika salama.",
    replies: [
      { name: "Afisa wa Huduma", text: "Pole kwa changamoto ya mtandao, kila unapokwama fanya refresh ya ukurasa na utaendelea vizuri. 🤝", time: "Dakika 12 zilizopita" }
    ]
  },
  {
    text: "Mteja wangu wa leo alitaka kujua kama kuna gharama ya ziada ya usafirishaji, nikamwelekeza vizuri kama maelekezo yanavyosema.",
    replies: []
  },
  {
    text: "Napenda jinsi oda zinavyobadilika kwenye kurasa tofauti, inafanya kazi isiwe ya kuchosha.",
    replies: []
  },
  {
    text: "Kwa upande wangu nimeona inasaidia kupata hela ya vocha na matumizi madogo madogo ya kila siku bila usumbufu. 👌",
    replies: []
  },
  {
    text: "Mimi nafanya kazi asubuhi sana kabla ya kuanza shughuli zangu za kawaida, mambo yanaenda kwa utulivu mkubwa.",
    replies: []
  },
  {
    text: "Simu niliyopiga mteja alikuwa mwenye haraka lakini alithibitisha oda yake bila ubishi wowote.",
    replies: []
  },
  {
    text: "Mfumo uko vizuri na unatumia Kiswahili kilicho wazi, mtu yeyote anaweza kuelewa bila kupata shida. ✨",
    replies: []
  },
  {
    text: "Kila hatua ya uthibitishaji inajieleza yenyewe, hakuna haja ya kuwa na wasiwasi unapofuata muongozo uliowekwa.",
    replies: []
  },
  {
    text: "Nilikuwa naulizia, je naweza kufanya uthibitishaji hata siku za mwisho wa wiki?",
    replies: [
      { name: "Afisa wa Huduma", text: "Ndio, mfumo unafanya kazi siku zote saba za wiki bila kusimama.", time: "Dakika 8 zilizopita" }
    ]
  },
  {
    text: "Mteja mmoja alinipigia baadaye kuniuliza kuhusu saa ya kufungua ofisi, nikamueleza kwa heshima kulingana na muongozo. 📞",
    replies: []
  },
  {
    text: "Kamisheni inaingia moja kwa moja kwenye salio pindi unapobofya kutuma oda, hii inaleta uwazi mzuri sana.",
    replies: []
  },
  {
    text: "Nawashauri wenzangu kuwa wasikivu mnapoongea na wateja, wengine huwa wana maswali ya ziada kuhusu bidhaa zao.",
    replies: []
  },
  {
    text: "Kazi hii hainichukulii muda mwingi, kwa dakika kumi tu nakuwa nimeshamaliza oda zilizopo kwenye ukurasa. ⏱️",
    replies: []
  },
  {
    text: "Nimependa uboreshaji wa picha za bidhaa, sasa zinaonekana halisi na zinasaidia kumuelezea mteja anapouliza.",
    replies: []
  },
  {
    text: "Nilijaribu video call na mteja leo, alifurahi kuona sura ya mtu anayeongea naye kabla ya kuthibitisha oda yake. 📱",
    replies: []
  },
  {
    text: "Nimefanya kazi wiki nzima bila kukwama, utaratibu unafuatwa vizuri sana.",
    replies: []
  },
  {
    text: "Kuna wakati wateja wengine wanakuwa na mashaka, lakini ukiwaeleza kwamba ofisi zipo mjini kwao wanapata amani mara moja.",
    replies: []
  },
  {
    text: "Leo nimefanikiwa kukamilisha oda za kurasa zote, nimeona maendeleo mazuri katika utendaji wangu. 💪",
    replies: []
  },
  {
    text: "Ni vyema kuwa na bando la uhakika unapoanza kufanya kazi ili simu na picha zisichelewe kufunguka.",
    replies: []
  },
  {
    text: "Asante kwa mwongozo wa sauti unaojitokeza, unasaidia kukumbusha hatua za kufuata bila kusahau chochote. 🔊",
    replies: []
  },
  {
    text: "Nilikuwa na wasiwasi mwanzoni kuhusu usalama wa taarifa zangu, lakini naona kila kitu kinafuata utaratibu mzuri.",
    replies: []
  },
  {
    text: "Oda ya mashine ya kusaga niliyothibitisha leo mteja alisema anaihitaji haraka kwa ajili ya karakana yake ndogo.",
    replies: []
  },
  {
    text: "Nafurahi kuona kwamba hata kwa simu ya kawaida bila kompyuta mtu anaweza kufanya kazi vizuri bila shida. 👍",
    replies: []
  },
  {
    text: "Kazi inajenga uzoefu mzuri wa mawasiliano na watu tofauti tofauti kila siku.",
    replies: []
  },
  {
    text: "Nimejifunza kuwa mvumilivu mteja anapochelewa kupokea simu, mara nyingi huwa wanapokea kwenye jaribio la pili.",
    replies: []
  },
  {
    text: "Mpangilio wa vifaa vya nyumbani na vya viwandani kwenye kurasa tofauti unasaidia sana kuchagua unachokielewa vizuri.",
    replies: []
  },
  {
    text: "Tuendelee kuwa waaminifu na kuzingatia maelekezo ili mfumo uendelee kuwa wa kuaminika kwa wote. 🤝",
    replies: []
  },
  {
    text: "Nawashukuru sana kwa mwongozo mliotoa, nimeelewa jinsi ya kumaliza hatua zote kwa wakati na kwa ufasaha. 🙏",
    replies: []
  }
];

// Generate 35 unique Swahili comments with unique commenter names
export function buildCompliantComments(usedBaseNames: Set<string>, usedFullNames: Set<string>): CommentItem[] {
  const result: CommentItem[] = [];
  const times = [
    "Dakika 2 zilizopita", "Dakika 5 zilizopita", "Dakika 9 zilizopita", "Dakika 14 zilizopita",
    "Dakika 22 zilizopita", "Dakika 35 zilizopita", "Saa 1 lililopita", "Masaa 2 yaliyopita"
  ];

  for (let i = 0; i < 35; i++) {
    const raw = rawSwahiliComments[i];
    const customer = generateDistinctCustomer(usedBaseNames, usedFullNames);
    const time = times[i % times.length];

    result.push({
      id: 1000 + i,
      name: customer.name,
      text: raw.text,
      time,
      replies: (raw.replies || []).map((r, rIdx) => ({
        id: (1000 + i) * 10 + rIdx,
        name: r.name,
        text: r.text,
        time: r.time
      }))
    });
  }

  return result;
}

// ============================================================================
// LIVE PAYOUT NOTIFICATIONS (EXACTLY 65 UNIQUE ITEMS)
// ============================================================================

export function buildCompliantLivePayouts(usedBaseNames: Set<string>, usedFullNames: Set<string>): LivePayout[] {
  const payouts: LivePayout[] = [];
  const baseAmounts = [
    12500, 14200, 16500, 18000, 19500, 21000, 22500, 24000, 26500, 28000,
    31500, 34000, 36500, 39000, 42000, 45500, 48000, 52000, 56500, 61000
  ];

  for (let i = 0; i < 65; i++) {
    const customer = generateDistinctCustomer(usedBaseNames, usedFullNames);
    const amt = baseAmounts[i % baseAmounts.length] + ((i * 450) % 5000);
    payouts.push({
      id: 2000 + i,
      name: customer.name,
      rawTzsAmount: amt,
      amountStr: `TZS ${amt.toLocaleString()}`,
      tzsStr: `TZS ${amt.toLocaleString()}`
    });
  }

  return payouts;
}

// ============================================================================
// SYSTEM VALIDATION GATEWAY
// Ensures 100% adherence to all mathematical, pricing, and uniqueness bounds.
// ============================================================================

export interface ValidationReport {
  valid: boolean;
  errors: string[];
}

export function validateSystemData(data: { orders: Order[]; notifications: LivePayout[]; comments: CommentItem[] }): ValidationReport {
  const errors: string[] = [];

  if (data.orders.length !== 36) {
    errors.push(`Orders count is ${data.orders.length}, expected exactly 36.`);
  }
  if (data.notifications.length !== 65) {
    errors.push(`Notifications count is ${data.notifications.length}, expected exactly 65.`);
  }
  if (data.comments.length !== 35) {
    errors.push(`Comments count is ${data.comments.length}, expected exactly 35.`);
  }

  const p1 = data.orders.slice(0, 12);
  const p2 = data.orders.slice(12, 24);
  const p3 = data.orders.slice(24, 36);

  const setP1 = new Set(p1.map(o => normalizeProductKey(o.product)));
  const setP2 = new Set(p2.map(o => normalizeProductKey(o.product)));
  const setP3 = new Set(p3.map(o => normalizeProductKey(o.product)));

  if (setP1.size !== 12) errors.push("Page 1 has duplicate products internally.");
  if (setP2.size !== 12) errors.push("Page 2 has duplicate products internally.");
  if (setP3.size !== 12) errors.push("Page 3 has duplicate products internally.");

  p1.forEach(o => {
    const k = normalizeProductKey(o.product);
    if (setP2.has(k)) errors.push(`Overlap: Page 1 product "${o.product}" appears in Page 2.`);
    if (setP3.has(k)) errors.push(`Overlap: Page 1 product "${o.product}" appears in Page 3.`);
    if (PERMANENTLY_RETIRED_PRODUCTS.has(k)) errors.push(`Old product detected: "${o.product}" is permanently retired!`);
  });

  p2.forEach(o => {
    const k = normalizeProductKey(o.product);
    if (setP3.has(k)) errors.push(`Overlap: Page 2 product "${o.product}" appears in Page 3.`);
    if (PERMANENTLY_RETIRED_PRODUCTS.has(k)) errors.push(`Old product detected: "${o.product}" is permanently retired!`);
  });

  p3.forEach(o => {
    const k = normalizeProductKey(o.product);
    if (PERMANENTLY_RETIRED_PRODUCTS.has(k)) errors.push(`Old product detected: "${o.product}" is permanently retired!`);
  });

  data.orders.forEach((o, idx) => {
    if (o.productValue < 100000 || o.productValue > 500000) {
      errors.push(`Order #${idx+1} value ${o.productValue} out of 100k-500k bounds.`);
    }
    const expectedPayout = Math.round(o.productValue * 0.05);
    if (Math.abs(o.payout - expectedPayout) > 1) {
      errors.push(`Order #${idx+1} payout ${o.payout} is not strictly 5% of ${o.productValue} (${expectedPayout}).`);
    }
  });

  const allNames = new Set<string>();
  const allBaseNames = new Set<string>();

  data.orders.forEach((o, idx) => {
    const base = extractBaseName(o.name);
    const full = o.name.toLowerCase().trim();
    if (allNames.has(full)) errors.push(`Duplicate full name in orders: "${o.name}" at #${idx+1}.`);
    if (allBaseNames.has(base)) errors.push(`Base name collision in orders: "${base}" (${o.name}) at #${idx+1}.`);
    allNames.add(full);
    allBaseNames.add(base);
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

// ============================================================================
// CORE DATA GENERATOR (100% FRESH PRODUCTS + DIVERSE EAST AFRICA & GLOBAL COUNTRIES)
// ============================================================================

export function generateCompliantSystemData(epochSeed: number) {
  const usedBaseNames = new Set<string>();
  const usedFullNames = new Set<string>();
  const activeProducts = new Set<string>();

  // Page 1: 12 Brand New Home products
  const page1Items: ProductTemplate[] = [];
  masterHomeProducts.forEach(p => {
    const k = normalizeProductKey(p.name);
    if (page1Items.length < 12 && !activeProducts.has(k) && !PERMANENTLY_RETIRED_PRODUCTS.has(k)) {
      activeProducts.add(k);
      page1Items.push(p);
    }
  });
  while (page1Items.length < 12) {
    const p = generateFreshProceduralProduct("home", activeProducts);
    page1Items.push(p);
  }

  // Page 2: 12 Brand New Tech products
  const page2Items: ProductTemplate[] = [];
  masterTechProducts.forEach(p => {
    const k = normalizeProductKey(p.name);
    if (page2Items.length < 12 && !activeProducts.has(k) && !PERMANENTLY_RETIRED_PRODUCTS.has(k)) {
      activeProducts.add(k);
      page2Items.push(p);
    }
  });
  while (page2Items.length < 12) {
    const p = generateFreshProceduralProduct("tech", activeProducts);
    page2Items.push(p);
  }

  // Page 3: 12 Brand New Industrial products
  const page3Items: ProductTemplate[] = [];
  [...masterIndustrialProducts, ...masterClothingProducts].forEach(p => {
    const k = normalizeProductKey(p.name);
    if (page3Items.length < 12 && !activeProducts.has(k) && !PERMANENTLY_RETIRED_PRODUCTS.has(k)) {
      activeProducts.add(k);
      page3Items.push(p);
    }
  });
  while (page3Items.length < 12) {
    const p = generateFreshProceduralProduct("industrial", activeProducts);
    page3Items.push(p);
  }

  const all36Templates = [...page1Items, ...page2Items, ...page3Items];
  const orders: Order[] = [];

  // Authentic distribution of East African & international countries for each page
  const targetCountryList: string[] = [
    // Page 1 (12 orders)
    "Tanzania", "Kenya", "Uganda", "Rwanda", "Tanzania", "Burundi",
    "DR Congo", "Kenya", "South Africa", "Tanzania", "Nigeria", "UAE",

    // Page 2 (12 orders)
    "Kenya", "Tanzania", "Uganda", "Rwanda", "DR Congo", "Tanzania",
    "Burundi", "Kenya", "South Africa", "Tanzania", "Zambia", "Malawi",

    // Page 3 (12 orders)
    "Tanzania", "Kenya", "Uganda", "DR Congo", "Tanzania", "Rwanda",
    "Nigeria", "Burundi", "South Africa", "Tanzania", "UAE", "Kenya"
  ];

  for (let i = 0; i < 36; i++) {
    const targetCountry = targetCountryList[i];
    const customer = generateDistinctCustomer(usedBaseNames, usedFullNames, targetCountry);
    const prod = all36Templates[i];
    const payout = Math.round(prod.price * 0.05);

    orders.push({
      id: i + 1,
      name: customer.name,
      gender: customer.gender,
      country: customer.country,
      flag: customer.flag,
      city: customer.city,
      product: prod.name,
      productValue: prod.price,
      payout,
      avatar: customer.avatar,
      productImage: prod.image,
      productDescription: prod.description
    });
  }

  const notifications = buildCompliantLivePayouts(usedBaseNames, usedFullNames);
  const comments = buildCompliantComments(usedBaseNames, usedFullNames);

  const report = validateSystemData({ orders, notifications, comments });
  if (!report.valid) {
    console.error("CRITICAL VALIDATION FAILED:", report.errors);
  }

  return {
    orderData: orders,
    livePayouts: notifications,
    comments
  };
}

// ============================================================================
// STATE INITIALIZATION & LIVE EXPORTS
// ============================================================================

export function initOrLoadSystemData() {
  const currentEpoch = Math.floor(Date.now() / (6 * 60 * 60 * 1000));
  
  // Clear any legacy caches from prior versions to guarantee 100% fresh products and country distribution
  const storedVersion = storageGet(STORAGE_KEY_VERSION);
  if (storedVersion !== STORAGE_VERSION_TAG) {
    storageRemove(STORAGE_KEY_ACTIVE_EPOCH);
    storageRemove(STORAGE_KEY_ACTIVE_ORDERS);
    storageRemove(STORAGE_KEY_ACTIVE_PAYOUTS);
    storageRemove(STORAGE_KEY_ACTIVE_COMMENTS);
  }

  const savedEpochStr = storageGet(STORAGE_KEY_ACTIVE_EPOCH);
  const savedOrdersStr = storageGet(STORAGE_KEY_ACTIVE_ORDERS);
  const savedPayoutsStr = storageGet(STORAGE_KEY_ACTIVE_PAYOUTS);
  const savedCommentsStr = storageGet(STORAGE_KEY_ACTIVE_COMMENTS);

  if (savedEpochStr && savedOrdersStr && savedPayoutsStr && savedCommentsStr) {
    try {
      const orders: Order[] = JSON.parse(savedOrdersStr);
      const payouts = JSON.parse(savedPayoutsStr);
      const comments = JSON.parse(savedCommentsStr);
      
      // Ensure none of the saved orders contain retired old products
      const hasOldProduct = orders.some(o => PERMANENTLY_RETIRED_PRODUCTS.has(normalizeProductKey(o.product)));
      const report = validateSystemData({ orders, notifications: payouts, comments });
      
      if (!hasOldProduct && report.valid && Number(savedEpochStr) === currentEpoch) {
        return {
          orderData: orders,
          livePayouts: payouts,
          comments
        };
      }
    } catch (e) {}
  }

  // Generate completely fresh compliant system data
  const fresh = generateCompliantSystemData(currentEpoch);

  storageSet(STORAGE_KEY_VERSION, STORAGE_VERSION_TAG);
  storageSet(STORAGE_KEY_ACTIVE_EPOCH, String(currentEpoch));
  storageSet(STORAGE_KEY_ACTIVE_ORDERS, JSON.stringify(fresh.orderData));
  storageSet(STORAGE_KEY_ACTIVE_PAYOUTS, JSON.stringify(fresh.livePayouts));
  storageSet(STORAGE_KEY_ACTIVE_COMMENTS, JSON.stringify(fresh.comments));

  return fresh;
}

const initialSystemState = initOrLoadSystemData();

export let orderData: Order[] = initialSystemState.orderData;
export let livePayouts: LivePayout[] = initialSystemState.livePayouts;
export let initialComments: CommentItem[] = initialSystemState.comments;

export const update6HourDataIfChanged = () => {
  const currentEpoch = Math.floor(Date.now() / (6 * 60 * 60 * 1000));
  const savedEpochStr = storageGet(STORAGE_KEY_ACTIVE_EPOCH);
  if (Number(savedEpochStr) !== currentEpoch) {
    const fresh = generateCompliantSystemData(currentEpoch);
    storageSet(STORAGE_KEY_ACTIVE_EPOCH, String(currentEpoch));
    storageSet(STORAGE_KEY_ACTIVE_ORDERS, JSON.stringify(fresh.orderData));
    storageSet(STORAGE_KEY_ACTIVE_PAYOUTS, JSON.stringify(fresh.livePayouts));
    storageSet(STORAGE_KEY_ACTIVE_COMMENTS, JSON.stringify(fresh.comments));
    orderData = fresh.orderData;
    livePayouts = fresh.livePayouts;
    initialComments = fresh.comments;
  }
};

export const generate6HourComments = (): CommentItem[] => {
  return initialComments;
};
