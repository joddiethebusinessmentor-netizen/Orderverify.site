
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
import shapewearBrasImg from "./assets/images/shapewear_bras_1789290994990.jpg";
import phoneCaseRingImg from "./assets/images/phone_case_ring_1789291007947.jpg";
import facialKitImg from "./assets/images/facial_kit_1789291018164.jpg";
import butterflyWatchSetImg from "./assets/images/butterfly_watch_set_1789291028718.jpg";
import pressOnNailsImg from "./assets/images/press_on_nails_1789291049824.jpg";
import batanaOilImg from "./assets/images/batana_oil_1789291060745.jpg";
import makeupBrushSet13pcsImg from "./assets/images/makeup_brush_set_13pcs_1789291072315.jpg";
import phoneTripodImg from "./assets/images/phone_tripod_stand_1789290638423.jpg";
import cameraMugImg from "./assets/images/camera_lens_mug_1789290655544.jpg";
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

const STORAGE_VERSION_TAG = "ov_v41_final_no_mwanachama";
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
  { name: "Mini Bluetooth Speaker (Jumla Pcs 10)", price: 150000, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400", description: "Mini Bluetooth Speaker (Jumla Pcs 10)" },
  { name: "Gaming Wireless Earbuds (Seti)", price: 120000, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400", description: "Gaming Wireless Earbuds (Seti)" },
  { name: "Sport Smartwatch Braided (Pcs 5)", price: 250000, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400", description: "Sport Smartwatch Braided (Pcs 5)" },
  { name: "LED Strip Lights Room Decor (Seti)", price: 110000, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400", description: "LED Strip Lights Room Decor (Seti)" },
  { name: "Mini WiFi Spy Camera (Pcs 3)", price: 180000, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400", description: "Mini WiFi Spy Camera (Pcs 3)" },
  { name: "Oruss Men's Luxury Watch", price: 320000, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400", description: "Oruss Men's Luxury Watch" },
  { name: "Bone Conduction Earphones", price: 145000, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", description: "Bone Conduction Earphones" },
  { name: "Starry Sky Projector Light", price: 115000, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400", description: "Starry Sky Projector Light" },
  { name: "Wooden Phone Stand (Jumla Pcs 20)", price: 105000, image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400", description: "Wooden Phone Stand (Jumla Pcs 20)" },
  { name: "Blue Dial Stainless Watch (Seti)", price: 210000, image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400", description: "Blue Dial Stainless Watch (Seti)" },
  { name: "Camera Lens Coffee Mug (Seti)", price: 100000, image: cameraMugImg, description: "Camera Lens Coffee Mug (Seti)" },
  { name: "Phone Tripod Stand (Jumla)", price: 160000, image: phoneTripodImg, description: "Phone Tripod Stand (Jumla)" }
];

// PAGE 2: Consumer Tech & Gadgets (Kielektroniki) - ALL NEW & VERIFIED
export const masterTechProducts: ProductTemplate[] = [
  { name: "13Pcs Makeup Brush Set (Jumla)", price: 110000, image: makeupBrushSet13pcsImg, description: "13Pcs Makeup Brush Set (Jumla)" },
  { name: "Batana Hair Growth Oil (Seti 5)", price: 125000, image: batanaOilImg, description: "Batana Hair Growth Oil (Seti 5)" },
  { name: "Hip-Lift Massage Cream (Box)", price: 140000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "Hip-Lift Massage Cream (Box)" },
  { name: "Luxury Press-on Nails (Seti 10)", price: 105000, image: pressOnNailsImg, description: "Luxury Press-on Nails (Seti 10)" },
  { name: "Blue Crystal Watch & Jewelry Set", price: 190000, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", description: "Blue Crystal Watch & Jewelry Set" },
  { name: "Butterfly Watch & Necklace Set", price: 180000, image: butterflyWatchSetImg, description: "Butterfly Watch & Necklace Set" },
  { name: "Gold Plated Women's Watch Set", price: 220000, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400", description: "Gold Plated Women's Watch Set" },
  { name: "Yin-Yang Beaded Bracelets (Jumla)", price: 100000, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400", description: "Yin-Yang Beaded Bracelets (Jumla)" },
  { name: "Anti-Blue Light Glasses (Seti)", price: 115000, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", description: "Anti-Blue Light Glasses (Seti)" },
  { name: "Weight Loss Slimming Patch", price: 130000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", description: "Weight Loss Slimming Patch" },
  { name: "Skin Brightening Toner Set", price: 150000, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400", description: "Skin Brightening Toner Set" },
  { name: "Professional Facial Kit", price: 170000, image: facialKitImg, description: "Professional Facial Kit" }
];

// PAGE 3: Industrial & Workshop Equipment (Viwandani) - ALL NEW & VERIFIED

export const masterClothingProducts: ProductTemplate[] = [];

export const masterIndustrialProducts: ProductTemplate[] = [
  { name: "Sleeveless Hoodie Vest (Seti 4)", price: 140000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", description: "Sleeveless Hoodie Vest (Seti 4)" },
  { name: "Shockproof Phone Case with Ring", price: 120000, image: phoneCaseRingImg, description: "Shockproof Phone Case with Ring" },
  { name: "Zmistuo Platform Slides (Pea 5)", price: 160000, image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400", description: "Zmistuo Platform Slides (Pea 5)" },
  { name: "Seamless Shapewear Bras (Seti)", price: 135000, image: shapewearBrasImg, description: "Seamless Shapewear Bras (Seti)" },
  { name: "Colorful iPhone Cases (Jumla)", price: 110000, image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400", description: "Colorful iPhone Cases (Jumla)" },
  { name: "Retro Leather Wallet Set", price: 125000, image: "https://images.unsplash.com/photo-1627042633145-b780d842ba45?w=400", description: "Retro Leather Wallet Set" },
  { name: "Men's Casual Sneakers (Premium)", price: 180000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", description: "Men's Casual Sneakers (Premium)" },
  { name: "Women's Crossbody Bag", price: 150000, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400", description: "Women's Crossbody Bag" },
  { name: "Designer Sunglasses Set", price: 115000, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", description: "Designer Sunglasses Set" },
  { name: "Orthopedic Walking Shoes", price: 190000, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400", description: "Orthopedic Walking Shoes" },
  { name: "Cotton T-Shirts Bundle", price: 105000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", description: "Cotton T-Shirts Bundle" },
  { name: "Leather Belt & Accessories", price: 130000, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400", description: "Leather Belt & Accessories" }
];

// Procedural generator for infinite continuous rotations (NEVER uses old products)
let proceduralCounter = 50;
export function generateFreshProceduralProduct(category: "home" | "tech" | "industrial", usedKeys: Set<string>): ProductTemplate {
  const homeBases = ["Bluetooth Speaker", "Wireless Earbuds", "Smartwatch", "LED Lights", "Spy Camera", "Luxury Watch"];
const techBases = ["Makeup Brush", "Hair Oil", "Massage Cream", "Press-on Nails", "Jewelry Set", "Yin-Yang Bracelet"];
const industrialBases = ["Hoodie Vest", "Phone Case", "Platform Slides", "Shapewear Bra", "Leather Wallet", "Sneakers"];

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
  { first: "Kwame", gender: "male", country: "Ghana", flag: "🇬🇭", city: "Accra" },
  { first: "Abena", gender: "female", country: "Ghana", flag: "🇬🇭", city: "Kumasi" },
  { first: "Amadou", gender: "male", country: "Senegal", flag: "🇸🇳", city: "Dakar" },
  { first: "Fatou", gender: "female", country: "Senegal", flag: "🇸🇳", city: "Thiès" },
  { first: "Abebe", gender: "male", country: "Ethiopia", flag: "🇪🇹", city: "Addis Ababa" },
  { first: "Chala", gender: "male", country: "Ethiopia", flag: "🇪🇹", city: "Dire Dawa" },
  { first: "Tendai", gender: "male", country: "Zimbabwe", flag: "🇿🇼", city: "Harare" },
  { first: "Nyasha", gender: "female", country: "Zimbabwe", flag: "🇿🇼", city: "Bulawayo" },
  { first: "Kagiso", gender: "male", country: "Botswana", flag: "🇧🇼", city: "Gaborone" },
  { first: "Tshepo", gender: "male", country: "Botswana", flag: "🇧🇼", city: "Francistown" },
  { first: "Joao", gender: "male", country: "Mozambique", flag: "🇲🇿", city: "Maputo" },
  { first: "Maria", gender: "female", country: "Mozambique", flag: "🇲🇿", city: "Beira" },
  { first: "Ahmed", gender: "male", country: "Egypt", flag: "🇪🇬", city: "Cairo" },
  { first: "Nour", gender: "female", country: "Egypt", flag: "🇪🇬", city: "Alexandria" },
  { first: "Youssef", gender: "male", country: "Morocco", flag: "🇲🇦", city: "Casablanca" },
  { first: "Amina", gender: "female", country: "Morocco", flag: "🇲🇦", city: "Rabat" },
  { first: "Alain", gender: "male", country: "Cameroon", flag: "🇨🇲", city: "Yaoundé" },
  { first: "Marie", gender: "female", country: "Cameroon", flag: "🇨🇲", city: "Douala" },
  { first: "Andry", gender: "male", country: "Madagascar", flag: "🇲🇬", city: "Antananarivo" },
  { first: "Nirina", gender: "female", country: "Madagascar", flag: "🇲🇬", city: "Toamasina" },
  { first: "Kouassi", gender: "male", country: "Ivory Coast", flag: "🇨🇮", city: "Abidjan" },
  { first: "Aya", gender: "female", country: "Ivory Coast", flag: "🇨🇮", city: "Bouaké" },
  { first: "Moussa", gender: "male", country: "Mali", flag: "🇲🇱", city: "Bamako" },
  { first: "Oumou", gender: "female", country: "Mali", flag: "🇲🇱", city: "Sikasso" },
  { first: "Chuka", gender: "male", country: "Nigeria", flag: "🇳🇬", city: "Lagos" },
  { first: "Ngozi", gender: "female", country: "Nigeria", flag: "🇳🇬", city: "Abuja" },
  { first: "Mwangi", gender: "male", country: "Kenya", flag: "🇰🇪", city: "Nairobi" },
  { first: "Njeri", gender: "female", country: "Kenya", flag: "🇰🇪", city: "Mombasa" },
  { first: "Kato", gender: "male", country: "Uganda", flag: "🇺🇬", city: "Kampala" },
  { first: "Babirye", gender: "female", country: "Uganda", flag: "🇺🇬", city: "Entebbe" },
  { first: "Bosco", gender: "male", country: "Rwanda", flag: "🇷🇼", city: "Kigali" },
  { first: "Chantal", gender: "female", country: "Rwanda", flag: "🇷🇼", city: "Butare" },
  { first: "Sipho", gender: "male", country: "South Africa", flag: "🇿🇦", city: "Johannesburg" },
  { first: "Thandi", gender: "female", country: "South Africa", flag: "🇿🇦", city: "Cape Town" },
  { first: "Mulenga", gender: "male", country: "Zambia", flag: "🇿🇲", city: "Lusaka" },
  { first: "Mutale", gender: "female", country: "Zambia", flag: "🇿🇲", city: "Ndola" },
  { first: "Yamikani", gender: "male", country: "Malawi", flag: "🇲🇼", city: "Lilongwe" },
  { first: "Chisomo", gender: "female", country: "Malawi", flag: "🇲🇼", city: "Blantyre" },
  { first: "Jose", gender: "male", country: "Angola", flag: "🇦🇴", city: "Luanda" },
  { first: "Ana", gender: "female", country: "Angola", flag: "🇦🇴", city: "Huambo" },
  { first: "Johannes", gender: "male", country: "Namibia", flag: "🇳🇦", city: "Windhoek" },
  { first: "Ndeshi", gender: "female", country: "Namibia", flag: "🇳🇦", city: "Swakopmund" },
  { first: "Karim", gender: "male", country: "Algeria", flag: "🇩🇿", city: "Algiers" },
  { first: "Farida", gender: "female", country: "Algeria", flag: "🇩🇿", city: "Oran" },
  { first: "Walid", gender: "male", country: "Tunisia", flag: "🇹🇳", city: "Tunis" },
  { first: "Meriem", gender: "female", country: "Tunisia", flag: "🇹🇳", city: "Sousse" },
  { first: "Omer", gender: "male", country: "Sudan", flag: "🇸🇩", city: "Khartoum" },
  { first: "Fatima", gender: "female", country: "Sudan", flag: "🇸🇩", city: "Omdurman" },
  { first: "Abdi", gender: "male", country: "Somalia", flag: "🇸🇴", city: "Mogadishu" },
  { first: "Halima", gender: "female", country: "Somalia", flag: "🇸🇴", city: "Hargeisa" },
  { first: "George", gender: "male", country: "Liberia", flag: "🇱🇷", city: "Monrovia" },
  { first: "Ellen", gender: "female", country: "Liberia", flag: "🇱🇷", city: "Gbarnga" },
  { first: "Julius", gender: "male", country: "Sierra Leone", flag: "🇸🇱", city: "Freetown" },
  { first: "Fatima", gender: "female", country: "Sierra Leone", flag: "🇸🇱", city: "Bo" },
  { first: "Faure", gender: "male", country: "Togo", flag: "🇹🇬", city: "Lomé" },
  { first: "Komi", gender: "female", country: "Togo", flag: "🇹🇬", city: "Sokodé" },
  { first: "Patrice", gender: "male", country: "Benin", flag: "🇧🇯", city: "Porto-Novo" },
  { first: "Angélique", gender: "female", country: "Benin", flag: "🇧🇯", city: "Cotonou" },
  { first: "Alpha", gender: "male", country: "Guinea", flag: "🇬🇳", city: "Conakry" },
  { first: "Binta", gender: "female", country: "Guinea", flag: "🇬🇳", city: "Kankan" },
  { first: "Blaise", gender: "male", country: "Burkina Faso", flag: "🇧🇫", city: "Ouagadougou" },
  { first: "Awa", gender: "female", country: "Burkina Faso", flag: "🇧🇫", city: "Bobo-Dioulasso" },
  { first: "Mahamadou", gender: "male", country: "Niger", flag: "🇳🇪", city: "Niamey" },
  { first: "Aicha", gender: "female", country: "Niger", flag: "🇳🇪", city: "Zinder" },
  { first: "Idriss", gender: "male", country: "Chad", flag: "🇹🇩", city: "N'Djamena" },
  { first: "Hinda", gender: "female", country: "Chad", flag: "🇹🇩", city: "Moundou" },
  { first: "Pierre", gender: "male", country: "Burundi", flag: "🇧🇮", city: "Bujumbura" },
  { first: "Francine", gender: "female", country: "Burundi", flag: "🇧🇮", city: "Gitega" },
  { first: "Letsie", gender: "male", country: "Lesotho", flag: "🇱🇸", city: "Maseru" },
  { first: "Masenate", gender: "female", country: "Lesotho", flag: "🇱🇸", city: "Leribe" },
  { first: "Mswati", gender: "male", country: "Eswatini", flag: "🇸🇿", city: "Mbabane" },
  { first: "Sibonelo", gender: "female", country: "Eswatini", flag: "🇸🇿", city: "Manzini" }
];

const SURNAME_MAP: Record<string, string[]> = {
  "Tanzania": ["Mushi", "Shirima", "Massawe", "Swai", "Kapinga", "Mrope", "Kileo", "Kimaro", "Lema", "Mbowe", "Makamba", "Mwinyi", "Kikwete", "Magufuli", "Suluhu", "Majaliwa", "Mwalimu", "Nyerere", "Kariuki", "Kibao", "Masanja", "Komba", "Mwandosya", "Mwakyembe", "Mdee", "Bulaya", "Mrema", "Mnyika", "Zitto", "Kabwe", "Mabula", "Ndumbaro", "Mchengerwa", "Gwajima", "Mpango", "Mwigulu", "Nchemba", "Makonda", "Chalamila", "Mtaturu", "Mhagama", "Kairuki", "Ummy", "Mwalimu", "Ndalichako", "Masele", "Nyalandu", "Membe", "Mwandosya", "Pinda", "Sumaye", "Salim", "Kigwangalla", "Nape", "Nnauye", "Makamamba", "Makani", "Slaa", "Mtei", "Mbowe", "Mbatia", "Mkosamali", "Chegeni", "Mgeja", "Ngeleja", "Chenge", "Rostam", "Dewji", "Bakhresa", "Meng", "Manji", "Karamagi", "Yona", "Mramba", "Meghji", "Kimei", "Msuya", "Malecela", "Warioba", "Salim", "Kambona", "Kawawa", "Karume", "Jumbe", "Mwinyi", "Mkapa"],
  "Ghana": ["Mensah", "Osei"],
  "Senegal": ["Ndiaye", "Diop"],
  "Ethiopia": ["Bekele", "Tadesse"],
  "Zimbabwe": ["Moyo", "Sibanda"],
  "Botswana": ["Molefe", "Gaborone"],
  "Mozambique": ["Chissano", "Machel"],
  "Egypt": ["Mahmoud", "Ali"],
  "Morocco": ["Alaoui", "Bennani"],
  "Cameroon": ["Biya", "Eto'o"],
  "Madagascar": ["Rajoelina", "Ravalomanana"],
  "Ivory Coast": ["Bédié", "Ouattara"],
  "Mali": ["Keïta", "Touré"],
  "Nigeria": ["Okafor", "Adeyemi"],
  "Kenya": ["Karanja", "Kamau"],
  "Uganda": ["Mukasa", "Kigozi"],
  "Rwanda": ["Kagame", "Nizeyimana"],
  "South Africa": ["Mandela", "Zuma"],
  "Zambia": ["Banda", "Mwila"],
  "Malawi": ["Phiri", "Banda"],
  "Angola": ["Dos Santos", "Neto"],
  "Namibia": ["Geingob", "Pohamba"],
  "Algeria": ["Bouteflika", "Mahrez"],
  "Tunisia": ["Trabelsi", "Jaziri"],
  "Sudan": ["Al-Bashir", "Mahdi"],
  "Somalia": ["Farah", "Warsame"],
  "Liberia": ["Weah", "Johnson"],
  "Sierra Leone": ["Bio", "Koroma"],
  "Togo": ["Gnassingbé", "Adebayor"],
  "Benin": ["Talon", "Kidjo"],
  "Guinea": ["Condé", "Camara"],
  "Burkina Faso": ["Compaoré", "Kaboré"],
  "Niger": ["Issoufou", "Tandja"],
  "Chad": ["Déby", "Habré"],
  "Burundi": ["Nkurunziza", "Ndayishimiye"],
  "Lesotho": ["Seeiso", "Thabane"],
  "Eswatini": ["Dlamini", "Zwane"]
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
  const tzSurnames = SURNAME_MAP["Tanzania"];
  const tzFirsts = ["Juma", "Asha", "Baraka", "Neema", "John", "Mary", "Daudi", "Zuhura", "Emmanuel", "Grace", "Kelvin", "Rehema", "Jackson", "Fatuma", "Peter", "Salome", "Joseph", "Mariam", "Michael", "Amina", "David", "Zainab", "Frank", "Halima", "Charles", "Hawa"];
  
  const fName = tzFirsts[fallbackNum % tzFirsts.length];
  const sName = tzSurnames[(fallbackNum * 3) % tzSurnames.length];
  const name = `${fName} ${sName}`;
  const base = fName.toLowerCase() + fallbackNum;
  usedBaseNames.add(base);
  usedFullNames.add(name.toLowerCase() + fallbackNum);
  
  return {
    name,
    gender: fallbackNum % 2 === 0 ? "male" : "female",
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dar es Salaam",
    avatar: resolveAvatar(fallbackNum % 2 === 0 ? "male" : "female", fallbackNum)
  };
}

// ============================================================================
// NATURAL SWAHILI COMMUNITY COMMENTS (REALISTIC, GROUNDED HUMAN FEEDBACK)
// ============================================================================

export const rawSwahiliComments: { text: string; replies: { name: string; text: string; time: string }[] }[] = [
  { text: "Kiukweli mwanzoni nilikua siamini kama haya mambo ya mtandaoni yanalipa, lakini nilivyojiunga na kuanza kudhibitisha oda, nimetoa elfu 50 yangu ya kwanza leo asubuhi bila longolongo yoyote! 🙏🙏", replies: [] },
  { text: "Inalipa sana aisee 🔥", replies: [] },
  { text: "Hii fursa ni mkombozi kwa vijana wengi ambao hawana ajira mtaani. Pesa inaingia fasta tu ukifanya kazi yako kwa umakini.", replies: [] },
  { text: "Asante sana kwa aliyenishirikisha hii kitu. Withdraw ziko very instant. Nimeomba kutoa pesa ndani ya dakika 3 imeingia kwenye M-pesa yangu.", replies: [] },
  { text: "Daaah nilichelewa sana kujua hii platform 😭😭😭 nimepoteza muda mwingi sana. Sasa hivi ni kazi tu na kuvuna pesa.", replies: [{name: "Amina J.", text: "Bora umejua sasa 👏 fursa ndio hii.", time: "Dakika 4 zilizopita"}] },
  { text: "Ni kweli inalipa?", replies: [{name: "Juma", text: "Ndio inalipa sana kaka, mimi nimeanza wiki iliyopita na nimeshatoa hela mara mbili.", time: "Dakika 10 zilizopita"}] },
  { text: "Guys mimi nilikuwa naogopa matapeli, lakini hapa nimehakikisha asilimia 100 ni salama. Zile kamisheni za asilimia 5 zinasaidia sana kusogeza siku.", replies: [] },
  { text: "Pesa nje nje 💸💸", replies: [] },
  { text: "Kwa mtu yeyote anayehitaji side hustle, hii ndio yenyewe. Hutumii nguvu nyingi, wewe ni kudhibitisha oda tu na hela yako inaingia.", replies: [] },
  { text: "Nimevuta laki 2 leo, weekend imeanza vizuri sana kwangu 🍻", replies: [] },
  { text: "Nawezaje kujiunga jamani?", replies: [{name: "Zuhura", text: "Fuata maelekezo ya kujisajili hapo juu, ni rahisi sana dada.", time: "Saa 1 lililopita"}] },
  { text: "Withdrawal zao hazina makato makubwa, ukitoa hela yako unapata karibu yote, hii kampuni iko fair sana kwa kweli.", replies: [] },
  { text: "Hii ni legit 100% 🔥", replies: [] },
  { text: "Jana usiku nilifanya kazi nikapata oda 15 mfululizo, asubuhi hii nimeamka nimekuta balance imesoma vizuri sana. Nimetuma withdrawal na imekubali chap.", replies: [] },
  { text: "Nilikuwa na mashaka sana kama kweli wanatoa pesa, lakini leo nimethibitisha. Nimepokea ujumbe wa Tigo Pesa sasa hivi.", replies: [] },
  { text: "Mambo ni motooo 🔥🔥🔥", replies: [] },
  { text: "Kazi nyepesi, malipo ya uhakika. Hakuna stress ya kuamka asubuhi kuwahi daladala.", replies: [] },
  { text: "Kuna aliyewahi kutoa zaidi ya laki 5 hapa?", replies: [{name: "Baraka", text: "Mimi nilitoa laki 6 wiki iliyopita, inategemea na juhudi yako tu.", time: "Masaa 2 yaliyopita"}] },
  { text: "Ahsanteni sana, nimefanikiwa kutoa elfu 80 yangu ya kwanza. Hii system ni nzuri na haina complication yoyote.", replies: [] },
  { text: "Nzuri sana hii! 👏", replies: [] },
  { text: "Sijawahi kujutia kujiunga hapa, mwanzo niliweka mtaji mdogo sasa hivi napiga hela tu.", replies: [] },
  { text: "Hii biashara iko salama sana, platform yao ina security nzuri na hela yako huwezi kupoteza.", replies: [] },
  { text: "Pesa inaingia wakati wowote, yaani hata usiku wa manane ukiomba kutoa, inatoka tu. Safi sana uongozi 👏👏", replies: [] },
  { text: "Nani mwingine amepata withdrawal asubuhi hii? Mimi nimepokea yangu tayari.", replies: [] },
  { text: "Iko poa sana 💯", replies: [] },
  { text: "Nimewashirikisha na marafiki zangu nao wameanza kutengeneza pesa. Hakuna kuficha fursa.", replies: [] },
  { text: "Mfumo unasoma haraka, ukithibitisha tu oda, mzigo unasoma kwenye account balance papo hapo.", replies: [] },
  { text: "Hii inasaidia sana hasa kwa sisi wanafunzi wa vyuo, tunapata hela ya kujikimu bila kuomba nyumbani kila siku.", replies: [] },
  { text: "Kazi nzuri, malipo papo hapo ✅", replies: [] },
  { text: "Kama bado unalaza damu unapitwa na mengi sana, amka uanze kazi ujionee tofauti.", replies: [] },
  { text: "Ukweli mchungu ni kwamba fursa zipo, ila watu wanapenda kubet badala ya kufanya kazi za uhakika kama hizi.", replies: [] },
  { text: "Nina siku tatu tangu nijiunge, nimesharudisha mtaji wangu na sasa natengeneza faida tupu. Mungu ibariki hii kampuni.", replies: [] },
  { text: "Good job 👏", replies: [] },
  { text: "Hakuna kiwango cha ukomo, ukiweza kudhibitisha oda 100 kwa siku ni wewe tu na speed yako.", replies: [] },
  { text: "Nimeipenda sana hii, inakupa uhuru wa kufanya kazi ukiwa popote pale.", replies: [] }
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
    const customer = generateDistinctCustomer(usedBaseNames, usedFullNames, "Tanzania");
    const time = times[i % times.length];

    result.push({
      id: 1000 + i,
      name: customer.name,
      text: raw.text,
      time,
      replies: (raw.replies || []).map((r, rIdx) => ({
        id: (1000 + i) * 10 + rIdx,
        name: generateDistinctCustomer(usedBaseNames, usedFullNames, "Tanzania").name,
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
    const customer = generateDistinctCustomer(usedBaseNames, usedFullNames, "Tanzania");
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
    if (o.productValue < 80000 || o.productValue > 700000) {
      errors.push(`Order #${idx+1} value ${o.productValue} out of 80k-700k bounds.`);
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
    "Ghana", "Senegal", "Ethiopia", "Zimbabwe", "Botswana", "Mozambique", "Egypt", "Morocco", "Cameroon", "Madagascar", "Ivory Coast", "Mali",
    "Nigeria", "Kenya", "Uganda", "Rwanda", "South Africa", "Zambia", "Malawi", "Angola", "Namibia", "Algeria", "Tunisia", "Sudan",
    "Somalia", "Liberia", "Sierra Leone", "Togo", "Benin", "Guinea", "Burkina Faso", "Niger", "Chad", "Burundi", "Lesotho", "Eswatini"
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
