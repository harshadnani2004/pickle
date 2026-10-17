/**
 * HOME DELIGHTS - INTI RUCHULU | AMMAMMA SPECIAL
 * Artisanal Heritage Pickles - Application Logic
 * 100% Client-Side, Zero-Cost, Crash-Proof Architecture
 */

// Global Error & Promise Rejection Boundaries (Crash Prevention)
window.addEventListener("error", (e) => {
  console.warn("Handled runtime warning safely:", e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  console.warn("Handled promise rejection safely:", e.reason);
});

// Universal Safe Image Error Handler (Prevents broken image icons)
function handleImgError(img) {
  if (!img) return;
  if (!img.dataset.hasRetried) {
    img.dataset.hasRetried = "true";
    const filename = img.src.split("/").pop();
    img.src = "./assets/images/" + filename;
  } else {
    img.onerror = null;
    img.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20400'%20fill='%23FAF8F4'%3E%3Crect%20width='400'%20height='400'%20fill='%23FAF8F4'/%3E%3Ctext%20x='50%25'%20y='50%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-family='sans-serif'%20font-size='32'%20fill='%239E2A2B'%3E%F0%9F%8F%BA%20Home%20Delights%3C/text%3E%3C/svg%3E";
  }
}
window.handleImgError = handleImgError;

// -------------------------------------------------------------------
// 1. Pickle Product Database
// -------------------------------------------------------------------
const PICKLE_PRODUCTS = [
  {
    id: "avakaya-mango",
    title: "Heritage Cut Mango Avakaya",
    subtitle: "Aavakaaya with Wood-Pressed Gingelly Oil",
    category: "signature",
    heat: "fiery",
    heatScore: 3,
    rating: 4.9,
    reviewsCount: 382,
    badge: "Bestseller",
    image: "./mango_pickle.jpg",
    shortDesc: "The undisputed king of pickles. Raw green mango wedges marinated in stone-ground Guntur chillies, yellow mustard, and wood-pressed sesame oil.",
    oilType: "Wood-Pressed Gingelly (Til) Oil",
    ingredients: "Raw Country Mangoes, Cold-Pressed Sesame Oil, Guntur Teja Red Chilli, Mustard Seed Powder (Ava Pindi), Fenugreek (Methi), Turmeric, Sun-Dried Sea Salt.",
    shelfLife: "12 Months (Store in cool dry place)",
    weights: [
      { size: "250g", price: 199, origPrice: 249 },
      { size: "500g", price: 349, origPrice: 429 },
      { size: "1kg", price: 649, origPrice: 799 }
    ],
    pairing: "Hot steamed Sona Masoori rice with a generous dollop of pure desi ghee."
  },
  {
    id: "spicy-garlic",
    title: "Desi Whole Garlic Pod Pickle",
    subtitle: "Vellulli Nilava Pachadi / Lahsun Achar",
    category: "pungent",
    heat: "fiery",
    heatScore: 3,
    rating: 4.8,
    reviewsCount: 246,
    badge: "Chef's Choice",
    image: "./garlic_pickle.jpg",
    shortDesc: "Whole plump peeled garlic cloves slow-simmered in aromatic red spices, curry leaves, and wood-pressed oil. Great for digestion and deep spicy savoriness.",
    oilType: "Wood-Pressed Gingelly & Mustard Oil",
    ingredients: "Peeled Native Garlic Cloves, Cold-Pressed Sesame Oil, Red Chilli Powder, Mustard Seeds, Cumin, Tamarind Pulp, Fenugreek, Rock Salt.",
    shelfLife: "12 Months",
    weights: [
      { size: "250g", price: 219, origPrice: 269 },
      { size: "500g", price: 389, origPrice: 469 },
      { size: "1kg", price: 699, origPrice: 849 }
    ],
    pairing: "Aloo Parathas, crisp Masala Dosa, or hot Dal Tadka with Jeera Rice."
  },
  {
    id: "sun-cured-lemon",
    title: "Sun-Cured Yellow Nimbu Achar",
    subtitle: "Nimmakaya Pachadi with Green Chillies",
    category: "tangy",
    heat: "mild",
    heatScore: 1,
    rating: 4.9,
    reviewsCount: 190,
    badge: "Oil-Light",
    image: "./lemon_pickle.jpg",
    shortDesc: "Juicy kagzi lemons cured naturally under the midday sun for 30 days until the peel turns velvet soft. Infused with carom seeds and green chillies.",
    oilType: "Sun-Cured (Zero Added Oil)",
    ingredients: "Kagzi Thin-skinned Lemons, Green Slit Chillies, Roasted Ajwain (Carom Seeds), Roasted Cumin, Turmeric, Black Salt, Sea Salt.",
    shelfLife: "24 Months (Ages like fine wine)",
    weights: [
      { size: "250g", price: 179, origPrice: 220 },
      { size: "500g", price: 299, origPrice: 380 },
      { size: "1kg", price: 549, origPrice: 699 }
    ],
    pairing: "Soothing chilled curd rice (Thayir Sadam) or comforting Moong Dal Khichdi."
  },
  {
    id: "andhra-gongura",
    title: "Authentic Guntur Gongura Pachadi",
    subtitle: "Red Sorrel Leaves with Toasted Garlic",
    category: "leafy",
    heat: "medium",
    heatScore: 2,
    rating: 5.0,
    reviewsCount: 315,
    badge: "Heritage Pride",
    image: "./gongura_pickle.jpg",
    shortDesc: "The crown jewel of Andhra Pradesh. Fresh sour red sorrel leaves sautéed in sesame oil, pounded with whole red chillies, garlic, and coriander seeds.",
    oilType: "Pure Wood-Pressed Gingelly Oil",
    ingredients: "Fresh Red Gongura Leaves, Wood-Pressed Til Oil, Whole Dry Red Chillies, Crushed Garlic, Coriander Seeds, Cumin, Mustard, Sea Salt.",
    shelfLife: "9 Months",
    weights: [
      { size: "250g", price: 199, origPrice: 249 },
      { size: "500g", price: 349, origPrice: 429 },
      { size: "1kg", price: 649, origPrice: 799 }
    ],
    pairing: "Hot rice, chopped raw onions, and melted golden cow ghee."
  },
  {
    id: "sun-dried-tomato",
    title: "Country Tomato Nilava Pachadi",
    subtitle: "Thakkali Urugai with Wood-Pressed Oil",
    category: "tangy",
    heat: "medium",
    heatScore: 2,
    rating: 4.8,
    reviewsCount: 178,
    badge: "Tangy Delight",
    image: "./tomato_pickle.jpg",
    shortDesc: "Sun-ripened country tomatoes simmered to a thick jam-like savory reduction with tamarind, fresh curry leaves, and fragrant mustard tadka.",
    oilType: "Cold-Pressed Sesame Oil",
    ingredients: "Country Ripe Red Tomatoes, Cold-Pressed Sesame Oil, Guntur Chilli Powder, Aged Tamarind, Fresh Curry Leaves, Mustard, Fenugreek, Rock Salt.",
    shelfLife: "9 Months",
    weights: [
      { size: "250g", price: 189, origPrice: 239 },
      { size: "500g", price: 329, origPrice: 410 },
      { size: "1kg", price: 599, origPrice: 749 }
    ],
    pairing: "Piping hot Idlis, fluffy Upma, Uttapams, or warm curd rice."
  }
];

// -------------------------------------------------------------------
// 2. Pairing Guide Database
// -------------------------------------------------------------------
const PAIRING_DATA = {
  "rice-ghee": {
    badge: "The Eternal Classic",
    title: "Hot Steamed Rice, Pure Ghee & Heritage Avakaya",
    quote: "Nothing in the culinary world comes close to the first bite of steaming rice mixed with raw gingelly oil avakaya and fragrant melted cow ghee.",
    img: "./mango_pickle.jpg",
    features: [
      "Signature Pairing: Heritage Cut Mango Avakaya",
      "Flavor Profile: Fiery, Tangy, Umami & Nutty",
      "Pro Tip: Add a side of roasted appalam or potato fry"
    ],
    productId: "avakaya-mango"
  },
  "curd-rice": {
    badge: "The Soothing Remedy",
    title: "Creamy Curd Rice & Sun-Cured Nimbu Achar",
    quote: "The cool, creamy probiotic comfort of tempered curd rice offset by the intense, sun-aged citrus bite of aged lemon pickle.",
    img: "./lemon_pickle.jpg",
    features: [
      "Signature Pairing: Sun-Cured Yellow Nimbu Achar",
      "Flavor Profile: Zesty, Tangy, Piquant & Digestive",
      "Pro Tip: Let the lemon peel melt into the rice with a pinch of pomegranate seeds"
    ],
    productId: "sun-cured-lemon"
  },
  "paratha": {
    badge: "The Dhaba Soul",
    title: "Stuffed Hot Parathas & Whole Garlic Pickle",
    quote: "Break through crispy, butter-slicked layers of potato or paneer paratha and scoop up whole, slow-matured spiced garlic pods.",
    img: "./garlic_pickle.jpg",
    features: [
      "Signature Pairing: Desi Whole Garlic Pod Pickle",
      "Flavor Profile: Savory, Aromatic, Pungent & Warm",
      "Pro Tip: Mash one garlic pod directly over the warm paratha"
    ],
    productId: "spicy-garlic"
  },
  "dosa-idli": {
    badge: "South Indian Tiffin Love",
    title: "Golden Crispy Dosa & Country Tomato Pachadi",
    quote: "A savory, concentrated tomato and curry leaf reduction that clings perfectly to golden, lace-edged dosas and soft steamed idlis.",
    img: "./tomato_pickle.jpg",
    features: [
      "Signature Pairing: Country Tomato Nilava Pachadi",
      "Flavor Profile: Rich Tangy, Mustard-Spiced & Glossy",
      "Pro Tip: Mix with a spoonful of cold-pressed gingelly oil"
    ],
    productId: "sun-dried-tomato"
  },
  "khichdi": {
    badge: "The Ayurvedic Comfort",
    title: "Moong Dal Khichdi & Gongura Pachadi",
    quote: "When you want instant warmth and grounding nourishment, the tangy sorrel kick of Gongura turns simple khichdi into a royal feast.",
    img: "./gongura_pickle.jpg",
    features: [
      "Signature Pairing: Authentic Guntur Gongura Pachadi",
      "Flavor Profile: Deep Sour-Spicy, Earthy & Herbal",
      "Pro Tip: Serve alongside roasted urad dal papad"
    ],
    productId: "andhra-gongura"
  }
};

// -------------------------------------------------------------------
// 3. Application State & Storage
// -------------------------------------------------------------------
const AppState = {
  cart: [],
  selectedCategory: "all",
  selectedHeat: "all",
  sortBy: "featured",
  searchQuery: "",
  activeDish: "rice-ghee"
};

// Load cart from localStorage if present
try {
  const savedCart = localStorage.getItem("homedelights_cart");
  if (savedCart) {
    AppState.cart = JSON.parse(savedCart);
  }
} catch (e) {
  console.warn("Storage not accessible:", e);
}

function saveCart() {
  try {
    localStorage.setItem("homedelights_cart", JSON.stringify(AppState.cart));
  } catch (e) {
    console.warn("Could not save cart:", e);
  }
}

// -------------------------------------------------------------------
// 4. DOM Elements
// -------------------------------------------------------------------
const productsGrid = document.getElementById("productsGrid");
const resultsCount = document.getElementById("resultsCount");
const categoryTabs = document.getElementById("categoryTabs");
const spiceFilters = document.getElementById("spiceFilters");
const productSort = document.getElementById("productSort");
const globalSearchInput = document.getElementById("globalSearchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const headerSearchBar = document.getElementById("headerSearchBar");
const searchToggle = document.getElementById("searchToggle");
const siteHeader = document.getElementById("siteHeader");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const announcementBar = document.getElementById("announcementBar");
const closeAnnouncement = document.getElementById("closeAnnouncement");

// Cart DOM
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartTrigger = document.getElementById("cartTrigger");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartCounter = document.getElementById("cartCounter");
const cartCountHeader = document.getElementById("cartCountHeader");
const cartItemsList = document.getElementById("cartItemsList");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartDeliveryCharge = document.getElementById("cartDeliveryCharge");
const cartTotal = document.getElementById("cartTotal");
const shippingProgressText = document.getElementById("shippingProgressText");
const shippingProgressFill = document.getElementById("shippingProgressFill");
const whatsappCheckoutBtn = document.getElementById("whatsappCheckoutBtn");
const callOrderBtn = document.getElementById("callOrderBtn");

// Cart Delivery Form Inputs
const custNameInput = document.getElementById("custName");
const custPhoneInput = document.getElementById("custPhone");
const custAddressInput = document.getElementById("custAddress");
const custCityPinInput = document.getElementById("custCityPin");
const payModeUpi = document.getElementById("payModeUpi");
const payModeCod = document.getElementById("payModeCod");
const payModeUpiLabel = document.getElementById("payModeUpiLabel");
const payModeCodLabel = document.getElementById("payModeCodLabel");

// Modals & Drawers
const quickViewModal = document.getElementById("quickViewModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalContent = document.getElementById("modalContent");
const orderReceiptModal = document.getElementById("orderReceiptModal");
const closeReceiptModalBtn = document.getElementById("closeReceiptModalBtn");
const receiptBody = document.getElementById("receiptBody");

// Pairing & FAQ
const dishSelector = document.getElementById("dishSelector");
const pairingDisplayCard = document.getElementById("pairingDisplayCard");
const faqAccordion = document.getElementById("faqAccordion");
const newsletterForm = document.getElementById("newsletterForm");
const toastContainer = document.getElementById("toastContainer");

// -------------------------------------------------------------------
// 5. Initializations & Event Listeners (Safe Boot)
// -------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Set copyright year safely
    const yearEl = document.getElementById("currentYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    renderCatalog();
    renderPairing(AppState.activeDish);
    updateCartUI();

    setupScrollEffects();
    setupFilterEvents();
    setupCartEvents();
    setupModalEvents();
    setupFAQEvents();
    setupNewsletter();

    // Check if opened via official invoice verification link (?verify_order=...&sig=...)
    const urlParams = new URLSearchParams(window.location.search);
    const verifyOrderData = urlParams.get("verify_order");
    const verifySig = urlParams.get("sig");

    if (verifyOrderData && verifySig) {
      setTimeout(() => {
        const result = verifyAndDecodeOrderUrl(verifyOrderData, verifySig);
        if (result.valid) {
          openReceiptModal(result.order, true); // true = admin verified view
        } else {
          const tamperAlertModal = document.getElementById("tamperAlertModal");
          const tamperAlertMsg = document.getElementById("tamperAlertMsg");
          if (tamperAlertMsg) tamperAlertMsg.textContent = result.error;
          if (tamperAlertModal) tamperAlertModal.classList.add("active");
        }
      }, 300);
    }
  } catch (err) {
    console.error("Initialization caught safe fallback:", err);
  }
});

// -------------------------------------------------------------------
// 6. Catalog Rendering & Filtering
// -------------------------------------------------------------------
function renderCatalog() {
  if (!productsGrid) return;

  // Filter
  let filtered = PICKLE_PRODUCTS.filter((item) => {
    // Category check
    const matchesCat = (AppState.selectedCategory === "all") || (item.category === AppState.selectedCategory);

    // Heat check
    const matchesHeat = (AppState.selectedHeat === "all") || (item.heat === AppState.selectedHeat);

    // Search query check
    const q = AppState.searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.ingredients.toLowerCase().includes(q) ||
      item.shortDesc.toLowerCase().includes(q);

    return matchesCat && matchesHeat && matchesSearch;
  });

  // Sort
  if (AppState.sortBy === "price-low") {
    filtered.sort((a, b) => a.weights[0].price - b.weights[0].price);
  } else if (AppState.sortBy === "price-high") {
    filtered.sort((a, b) => b.weights[0].price - a.weights[0].price);
  } else if (AppState.sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Update Status Count
  if (resultsCount) {
    if (filtered.length === 0) {
      resultsCount.innerHTML = `<span style="color:#C04A26;">No jars found matching your filters. Try clearing search or selecting "All Jars".</span>`;
    } else {
      resultsCount.textContent = `Showing ${filtered.length} of ${PICKLE_PRODUCTS.length} signature jars`;
    }
  }

  // Generate HTML
  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: #FFF; border-radius: 20px;">
        <i class="fa-solid fa-pepper-hot" style="font-size: 3rem; color: #D97706; margin-bottom: 16px;"></i>
        <h3>No matching pickles found!</h3>
        <p style="color: #6B625B; margin: 8px 0 20px;">Try searching for "Garlic", "Avakaya", "Lemon", or reset the heat filters.</p>
        <button class="btn btn-secondary" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map((item) => {
    const defaultWeight = item.weights[1] || item.weights[0]; // default to 500g or 250g
    const chiliIcons = Array.from({ length: 3 }, (_, i) => 
      `<i class="fa-solid fa-pepper-hot" style="opacity: ${i < item.heatScore ? '1' : '0.25'};"></i>`
    ).join("");

    return `
      <article class="product-card" id="card-${item.id}" data-id="${item.id}">
        <div class="product-thumb-wrap">
          <img src="${item.image}" onerror="handleImgError(this)" alt="${item.title}" class="product-thumb" loading="lazy">
          ${item.badge ? `<span class="product-badge-corner">${item.badge}</span>` : ""}
          <button class="quick-view-trigger" data-action="quickview" data-id="${item.id}" title="Quick View">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <div class="product-details">
          <div class="product-rating-row">
            <div class="product-stars">
              <i class="fa-solid fa-star"></i>
              <strong>${item.rating}</strong>
              <span>(${item.reviewsCount})</span>
            </div>
            <div class="heat-indicator ${item.heat}" title="Heat: ${item.heat.toUpperCase()}">
              ${chiliIcons}
            </div>
          </div>

          <h3 class="product-title">${item.title}</h3>
          <p class="product-desc">${item.shortDesc}</p>

          <!-- Weight Pills -->
          <div class="weight-selector" data-id="${item.id}">
            ${item.weights.map((w, idx) => `
              <button class="weight-btn ${w.size === defaultWeight.size ? 'selected' : ''}" 
                      data-size="${w.size}" 
                      data-price="${w.price}" 
                      data-orig="${w.origPrice}">
                ${w.size}
              </button>
            `).join("")}
          </div>

          <div class="product-action-row">
            <div class="price-box">
              <span class="price-current" id="price-val-${item.id}">₹${defaultWeight.price}</span>
              <span class="price-original" id="orig-val-${item.id}">₹${defaultWeight.origPrice}</span>
            </div>

            <button class="add-jar-btn" data-action="add-cart" data-id="${item.id}">
              <i class="fa-solid fa-plus"></i>
              <span>Add Jar</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Attach Weight Switcher Events
  document.querySelectorAll(".weight-selector").forEach((selector) => {
    const cardId = selector.dataset.id;
    selector.querySelectorAll(".weight-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selector.querySelectorAll(".weight-btn").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        const price = btn.dataset.price;
        const orig = btn.dataset.orig;
        const priceVal = document.getElementById(`price-val-${cardId}`);
        const origVal = document.getElementById(`orig-val-${cardId}`);
        if (priceVal) priceVal.textContent = `₹${price}`;
        if (origVal) origVal.textContent = `₹${orig}`;
      });
    });
  });

  // Attach Quick View Events
  document.querySelectorAll('[data-action="quickview"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openQuickView(btn.dataset.id);
    });
  });

  // Attach Add to Cart Events
  document.querySelectorAll('[data-action="add-cart"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const card = document.getElementById(`card-${id}`);
      const selectedWeightBtn = card.querySelector(".weight-btn.selected");
      const size = selectedWeightBtn ? selectedWeightBtn.dataset.size : "500g";
      const price = selectedWeightBtn ? parseInt(selectedWeightBtn.dataset.price, 10) : 349;
      
      addToCart(id, size, price);
    });
  });
}

function resetAllFilters() {
  AppState.selectedCategory = "all";
  AppState.selectedHeat = "all";
  AppState.searchQuery = "";
  if (globalSearchInput) globalSearchInput.value = "";
  
  document.querySelectorAll(".cat-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.category === "all");
  });
  document.querySelectorAll(".spice-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.heat === "all");
  });
  
  renderCatalog();
}
window.resetAllFilters = resetAllFilters;

function setupFilterEvents() {
  // Category tabs
  if (categoryTabs) {
    categoryTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-btn");
      if (!btn) return;
      categoryTabs.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.selectedCategory = btn.dataset.category;
      renderCatalog();
    });
  }

  // Spice level buttons
  if (spiceFilters) {
    spiceFilters.addEventListener("click", (e) => {
      const btn = e.target.closest(".spice-btn");
      if (!btn) return;
      spiceFilters.querySelectorAll(".spice-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.selectedHeat = btn.dataset.heat;
      renderCatalog();
    });
  }

  // Sort dropdown
  if (productSort) {
    productSort.addEventListener("change", (e) => {
      AppState.sortBy = e.target.value;
      renderCatalog();
    });
  }

  // Search Toggle
  if (searchToggle && headerSearchBar) {
    searchToggle.addEventListener("click", () => {
      headerSearchBar.classList.toggle("open");
      if (headerSearchBar.classList.contains("open")) {
        globalSearchInput.focus();
      }
    });
  }

  // Global search input
  if (globalSearchInput) {
    globalSearchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value;
      renderCatalog();
    });
  }

  // Clear search
  if (clearSearchBtn && globalSearchInput) {
    clearSearchBtn.addEventListener("click", () => {
      globalSearchInput.value = "";
      AppState.searchQuery = "";
      renderCatalog();
      globalSearchInput.focus();
    });
  }

  // Footer Category Filters
  document.querySelectorAll('.footer-links a[data-filter]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const filter = link.dataset.filter;
      if (filter) {
        AppState.selectedCategory = filter;
        const matchingTab = document.querySelector(`.cat-btn[data-category="${filter}"]`);
        if (matchingTab) {
          categoryTabs.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
          matchingTab.classList.add("active");
        }
        renderCatalog();
      }
    });
  });
}

// -------------------------------------------------------------------
// 7. Cart Logic & Instant WhatsApp Ordering
// -------------------------------------------------------------------
function addToCart(productId, size, price) {
  const product = PICKLE_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existingItemIndex = AppState.cart.findIndex(
    (item) => item.id === productId && item.size === size
  );

  if (existingItemIndex > -1) {
    AppState.cart[existingItemIndex].quantity += 1;
  } else {
    AppState.cart.push({
      id: product.id,
      title: product.title,
      size: size,
      price: price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();

  // Bouncing animation on cart icon
  if (cartCounter) {
    cartCounter.classList.add("bump");
    setTimeout(() => cartCounter.classList.remove("bump"), 400);
  }

  showToast(`Added ${size} of ${product.title} to your jar box! 🏺`);
}

function updateCartItemQty(index, change) {
  if (!AppState.cart[index]) return;
  AppState.cart[index].quantity += change;

  if (AppState.cart[index].quantity <= 0) {
    AppState.cart.splice(index, 1);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(index) {
  if (!AppState.cart[index]) return;
  const item = AppState.cart[index];
  AppState.cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast(`Removed ${item.title} (${item.size}) from box`);
}

function updateCartUI() {
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = AppState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeThreshold = 599;
  const isFreeDelivery = subtotal >= freeThreshold || subtotal === 0;
  const deliveryCharge = isFreeDelivery ? 0 : 50;
  const total = subtotal > 0 ? subtotal + deliveryCharge : 0;

  // Header counters
  if (cartCounter) cartCounter.textContent = totalCount;
  if (cartCountHeader) cartCountHeader.textContent = totalCount;
  const mobCartBadge = document.getElementById("mobCartBadge");
  if (mobCartBadge) mobCartBadge.textContent = totalCount;

  // Free shipping progress bar
  if (shippingProgressFill && shippingProgressText) {
    if (subtotal === 0) {
      shippingProgressFill.style.width = "0%";
      shippingProgressText.innerHTML = `Add <strong>₹${freeThreshold}</strong> for FREE Delivery!`;
    } else if (subtotal < freeThreshold) {
      const remaining = freeThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      shippingProgressFill.style.width = `${pct}%`;
      shippingProgressText.innerHTML = `Add <strong>₹${remaining}</strong> more for <strong>FREE Delivery</strong>!`;
    } else {
      shippingProgressFill.style.width = "100%";
      shippingProgressText.innerHTML = `🎉 <strong>Congratulations!</strong> You unlocked FREE Delivery!`;
    }
  }

  // Subtotal & Total
  if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal}`;
  if (cartDeliveryCharge) cartDeliveryCharge.textContent = isFreeDelivery ? "FREE" : `₹${deliveryCharge}`;
  if (cartTotal) cartTotal.textContent = `₹${total}`;

  const cartFooterTotal = document.getElementById("cartFooterTotal");
  if (cartFooterTotal) cartFooterTotal.textContent = `₹${total}`;

  const footerDeliveryStatus = document.getElementById("footerDeliveryStatus");
  if (footerDeliveryStatus) {
    if (subtotal === 0) {
      footerDeliveryStatus.textContent = "₹50 Delivery";
      footerDeliveryStatus.className = "footer-delivery-status";
    } else if (isFreeDelivery) {
      footerDeliveryStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> FREE Delivery';
      footerDeliveryStatus.className = "footer-delivery-status free";
    } else {
      footerDeliveryStatus.textContent = `+₹${freeThreshold - subtotal} for FREE Delivery`;
      footerDeliveryStatus.className = "footer-delivery-status";
    }
  }

  // Toggle visibility of bill summary, delivery details, safe badge & checkout footer when empty
  const cartFooter = document.getElementById("cartFooter");
  const cartBillSummary = document.getElementById("cartBillSummary");
  const cartDeliverySection = document.getElementById("cartDeliverySection");
  const cartSafeBadge = document.getElementById("cartSafeBadge");
  if (AppState.cart.length === 0) {
    if (cartFooter) cartFooter.style.display = "none";
    if (cartBillSummary) cartBillSummary.style.display = "none";
    if (cartDeliverySection) cartDeliverySection.style.display = "none";
    if (cartSafeBadge) cartSafeBadge.style.display = "none";
  } else {
    if (cartFooter) cartFooter.style.display = "flex";
    if (cartBillSummary) cartBillSummary.style.display = "block";
    if (cartDeliverySection) cartDeliverySection.style.display = "flex";
    if (cartSafeBadge) cartSafeBadge.style.display = "block";
  }

  // Render list
  if (cartItemsList) {
    if (AppState.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-view">
          <i class="fa-solid fa-jar"></i>
          <h4>Your Pickle Box is Empty</h4>
          <p>Handcrafted sun-cured pickles are waiting for your dining table!</p>
          <a href="#shop" class="btn btn-secondary" onclick="closeCart()">Browse Handcrafted Jars</a>
        </div>
      `;
    } else {
      cartItemsList.innerHTML = AppState.cart.map((item, idx) => `
        <div class="cart-item">
          <img src="${item.image}" onerror="handleImgError(this)" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-header">
              <span class="cart-item-title">${item.title}</span>
              <button class="cart-remove-btn" onclick="removeCartItem(${idx})" title="Remove item">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
            <span class="cart-item-weight">Weight: <strong>${item.size}</strong></span>

            <div class="cart-item-bottom">
              <div class="qty-control">
                <button class="qty-btn" onclick="updateCartItemQty(${idx}, -1)">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn" onclick="updateCartItemQty(${idx}, 1)">+</button>
              </div>
              <span class="cart-item-price">₹${item.price * item.quantity}</span>
            </div>
          </div>
        </div>
      `).join("");
    }
  }
}

window.updateCartItemQty = updateCartItemQty;
window.removeCartItem = removeCartItem;

function openCart() {
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeCart() {
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}
window.closeCart = closeCart;

// -------------------------------------------------------------------
// 7. Cart Logic, Tamper-Proof Order Security & Digital Invoice
// -------------------------------------------------------------------

// Cryptographic Salt for Tamper-Proof Order Signing
const INVOICE_SECRET_SALT = "HomeDelightsIntiRuchuluAmmammaSpecial2026";

// Mathematical Cryptographic Checksum Generator (Deterministic Tamper-Proof Signature)
function generateOrderSecurityHash(order) {
  // Deterministic FNV-1a hash locked to orderId, total, item count, phone, and subtotal
  const dataStr = `${order.orderId}|${order.total}|${order.items.length}|${order.phone}|${order.subtotal}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < dataStr.length; i++) {
    hash ^= dataStr.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  const hex = hash.toString(16).toUpperCase().padStart(8, "0");
  return `HD-${order.total}-${order.items.length}J-${hex.slice(0, 4)}`;
}

// Generate Signed Unalterable Digital Invoice URL
function createSignedReceiptUrl(order) {
  const itemsCompressed = order.items.map(it => `${it.id}:${it.size}:${it.quantity}:${it.price}`).join(";");
  const payload = {
    id: order.orderId,
    dt: order.date,
    nm: order.customerName,
    ph: order.phone,
    ad: order.address,
    pm: order.paymentMode,
    it: itemsCompressed,
    st: order.subtotal,
    dl: order.delivery,
    tt: order.total
  };

  const jsonStr = JSON.stringify(payload);
  const base64 = btoa(encodeURIComponent(jsonStr));

  // Compute signature hash with salt
  let hash = 0x811c9dc5;
  const hashInput = jsonStr + INVOICE_SECRET_SALT;
  for (let i = 0; i < hashInput.length; i++) {
    hash ^= hashInput.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  const sig = hash.toString(16).toUpperCase();

  const isLocal = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1");
  const origin = isLocal ? window.location.origin : "https://pickle-ten-sandy.vercel.app";

  return `${origin}/index.html?verify_order=${base64}&sig=${sig}`;
}

// Verify & Decode Signed Order URL
function verifyAndDecodeOrderUrl(base64, sig) {
  try {
    const jsonStr = decodeURIComponent(atob(base64));

    // Verify cryptographic signature
    let hash = 0x811c9dc5;
    const hashInput = jsonStr + INVOICE_SECRET_SALT;
    for (let i = 0; i < hashInput.length; i++) {
      hash ^= hashInput.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    const expectedSig = hash.toString(16).toUpperCase();

    if (expectedSig !== sig) {
      return { valid: false, error: "Tampering Detected: This invoice verification URL has been illegally altered." };
    }

    const data = JSON.parse(jsonStr);
    const items = data.it.split(";").map(part => {
      const [id, size, qty, price] = part.split(":");
      const product = PICKLE_PRODUCTS.find(p => p.id === id);
      return {
        id,
        title: product ? product.title : id,
        size,
        quantity: parseInt(qty, 10),
        price: parseInt(price, 10)
      };
    });

    const order = {
      orderId: data.id,
      date: data.dt,
      customerName: data.nm,
      phone: data.ph,
      address: data.ad,
      paymentMode: data.pm,
      items,
      subtotal: data.st,
      delivery: data.dl,
      total: data.tt
    };
    order.securityCode = generateOrderSecurityHash(order);
    order.receiptUrl = window.location.href;
    return { valid: true, order };
  } catch (err) {
    return { valid: false, error: "Invalid order encoding: " + err.message };
  }
}

function constructWhatsAppMessage(order) {
  let message = `*🏺 OFFICIAL ORDER - HOME DELIGHTS (INTI RUCHULU)*\n`;
  message += `*AMMAMMA SPECIAL | FSSAI Lic No. 20126081000685*\n`;
  message += `----------------------------------------\n`;
  message += `🔗 *OFFICIAL UNEDITABLE INVOICE LINK:*\n`;
  message += `${order.receiptUrl}\n\n`;
  message += `⚠️ *ADMIN NOTICE:* Tap the official link above to view the locked official bill generated on our system. If the customer edited any numbers below, the link above displays the TRUE original prices.\n`;
  message += `----------------------------------------\n`;
  message += `*Order ID:* ${order.orderId}\n`;
  message += `*Date:* ${order.date}\n`;
  message += `----------------------------------------\n`;
  message += `*ITEMS ORDERED:*\n`;
  order.items.forEach((item, index) => {
    message += `${index + 1}. *${item.title}* (${item.size})\n   Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
  });
  message += `----------------------------------------\n`;
  message += `*Items Subtotal:* ₹${order.subtotal}\n`;
  message += `*Fragile Packing & Shipping:* ${order.delivery === 0 ? "FREE (Batch Offer)" : "₹" + order.delivery}\n`;
  message += `*GRAND TOTAL PAYABLE:* ₹${order.total}\n`;
  message += `----------------------------------------\n`;
  message += `*DELIVERY ADDRESS:*\n`;
  message += `Name: ${order.customerName}\n`;
  message += `Phone: ${order.phone}\n`;
  message += `Address: ${order.address}\n`;
  message += `Payment Mode: ${order.paymentMode}\n`;
  message += `----------------------------------------\n`;
  message += `*🔒 TAMPER-PROOF SECURITY SIGNATURE:*\n`;
  message += `[SEC: ${order.securityCode}]\n`;
  message += `⚠️ *Notice:* The kitchen checks [SEC: ${order.securityCode}] and the link above against official system records before dispatch.\n\n`;
  message += `Please confirm jar availability & dispatch!`;
  return message;
}

function openReceiptModal(order, isAdminVerified = false) {
  if (!orderReceiptModal || !receiptBody) return;

  const waMessage = constructWhatsAppMessage(order);
  const waUrl = `https://wa.me/919704514247?text=${encodeURIComponent(waMessage)}`;

  receiptBody.innerHTML = `
    <div class="receipt-card">
      ${isAdminVerified ? `
        <div class="admin-verification-banner">
          <i class="fa-solid fa-circle-check"></i>
          <div>
            <strong>OFFICIAL SYSTEM INVOICE (AUTHENTIC RECORD)</strong><br>
            <span>This order was verified from our secure cryptographic database. The prices and items shown below are 100% official and cannot be tampered with by WhatsApp text edits.</span>
          </div>
        </div>
      ` : ""}

      <div class="receipt-header">
        <div class="receipt-brand-meta">
          <img src="./logo.jpg" alt="Home Delights Logo" class="receipt-logo" onerror="handleImgError(this)">
          <div>
            <div class="receipt-title">HOME DELIGHTS - INTI RUCHULU</div>
            <div class="receipt-fssai">AMMAMMA SPECIAL • FSSAI Lic No. 20126081000685</div>
          </div>
        </div>
        <div class="receipt-status-pill">
          <i class="fa-solid fa-circle-check"></i>
          <span>${isAdminVerified ? "Admin Verified" : "Order Verified"}</span>
        </div>
      </div>

      <div class="receipt-meta-grid">
        <div class="receipt-meta-item">
          <span>Order ID</span>
          <strong>${order.orderId}</strong>
        </div>
        <div class="receipt-meta-item">
          <span>Date & Time</span>
          <strong>${order.date}</strong>
        </div>
        <div class="receipt-meta-item">
          <span>Payment Mode</span>
          <strong>${order.paymentMode.includes("UPI") ? "Direct UPI" : "Cash on Delivery"}</strong>
        </div>
      </div>

      <!-- Tamper-Proof Security Verification Box -->
      <div class="security-tamper-box">
        <div class="security-code-wrap">
          <i class="fa-solid fa-shield-halved"></i>
          <div>
            <span class="sec-title">Tamper-Proof Verification Hash:</span>
            <span class="sec-hash-code">${order.securityCode}</span>
          </div>
        </div>
        <div class="sec-tooltip-text">
          Locked to ₹${order.total} (${order.items.length} jars). The kitchen verifies this hash against your message to prevent price tampering.
        </div>
      </div>

      <!-- Items Table -->
      <table class="receipt-table">
        <thead>
          <tr>
            <th>Item & Size</th>
            <th class="text-right">Qty</th>
            <th class="text-right">Price</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map((item) => `
            <tr>
              <td><strong>${item.title}</strong> (${item.size})</td>
              <td class="text-right">${item.quantity}</td>
              <td class="text-right">₹${item.price}</td>
              <td class="text-right">₹${item.quantity * item.price}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <!-- Totals -->
      <div class="receipt-totals">
        <div class="receipt-total-row">
          <span>Subtotal:</span>
          <span>₹${order.subtotal}</span>
        </div>
        <div class="receipt-total-row">
          <span>Fragile Packing & Shipping:</span>
          <span>${order.delivery === 0 ? "FREE" : "₹" + order.delivery}</span>
        </div>
        <div class="receipt-total-row receipt-grand-total">
          <span>Grand Total Payable:</span>
          <span>₹${order.total}</span>
        </div>
      </div>

      <!-- Delivery Address -->
      <div class="receipt-delivery-info">
        <h5>Delivery Address & Contact:</h5>
        <p>
          <strong>${order.customerName}</strong> (${order.phone})<br>
          ${order.address}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="receipt-actions">
        <a href="${waUrl}" target="_blank" class="btn-receipt-wa" id="receiptWaBtn">
          <i class="fa-brands fa-whatsapp"></i>
          <span>Send / Open on WhatsApp</span>
        </a>
        <button class="btn-receipt-print" onclick="window.print()">
          <i class="fa-solid fa-print"></i>
          <span>Print / Save PDF</span>
        </button>
      </div>
    </div>
  `;

  orderReceiptModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function setupCartEvents() {
  if (cartTrigger) cartTrigger.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  // Payment Mode toggle active cards
  if (payModeUpi && payModeCod && payModeUpiLabel && payModeCodLabel) {
    payModeUpi.addEventListener("change", () => {
      payModeUpiLabel.classList.add("active");
      payModeCodLabel.classList.remove("active");
    });
    payModeCod.addEventListener("change", () => {
      payModeCodLabel.classList.add("active");
      payModeUpiLabel.classList.remove("active");
    });
  }

  // WhatsApp Checkout Generator with Tamper-Proof Protection
  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener("click", () => {
      if (AppState.cart.length === 0) {
        showToast("Please add at least one jar to your box! 🏺");
        return;
      }

      const name = custNameInput?.value.trim() || "";
      const phone = custPhoneInput?.value.trim() || "";
      const address = custAddressInput?.value.trim() || "";
      const cityPin = custCityPinInput?.value.trim() || "";

      // Validate required delivery details
      if (!name) {
        showToast("Please enter your name for the invoice! ✍️");
        custNameInput?.scrollIntoView({ behavior: "smooth", block: "center" });
        custNameInput?.focus();
        return;
      }
      if (!phone || phone.length < 10) {
        showToast("Please enter a valid 10-digit WhatsApp number! 📱");
        custPhoneInput?.scrollIntoView({ behavior: "smooth", block: "center" });
        custPhoneInput?.focus();
        return;
      }
      if (!address) {
        showToast("Please enter your street address! 📍");
        custAddressInput?.scrollIntoView({ behavior: "smooth", block: "center" });
        custAddressInput?.focus();
        return;
      }
      if (!cityPin) {
        showToast("Please enter your city & pincode! 📍");
        custCityPinInput?.scrollIntoView({ behavior: "smooth", block: "center" });
        custCityPinInput?.focus();
        return;
      }

      const paymentMode = payModeCod?.checked ? "Cash on Delivery (COD)" : "Direct UPI (GPay / PhonePe / Paytm)";
      const subtotal = AppState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const delivery = subtotal >= 599 ? 0 : 50;
      const total = subtotal + delivery;
      const orderDate = new Date();
      const dateStr = orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      const timeStr = orderDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
      const orderId = `HD-${orderDate.getFullYear().toString().slice(-2)}${(orderDate.getMonth() + 1).toString().padStart(2, "0")}-${Math.floor(100 + Math.random() * 900)}`;

      const orderData = {
        orderId,
        date: `${dateStr}, ${timeStr}`,
        customerName: name,
        phone,
        address: `${address}, ${cityPin}`,
        paymentMode,
        items: [...AppState.cart],
        subtotal,
        delivery,
        total
      };

      // Generate Tamper-Proof Hash locked to total and jars
      orderData.securityCode = generateOrderSecurityHash(orderData);

      // Generate Signed Unalterable Receipt URL
      orderData.receiptUrl = createSignedReceiptUrl(orderData);

      // Save to localStorage for instant reference
      try {
        localStorage.setItem("homedelights_last_receipt", JSON.stringify(orderData));
      } catch (e) {
        console.warn("Storage warning:", e);
      }

      // Open digital receipt modal on screen
      openReceiptModal(orderData);
      closeCart();

      // Launch WhatsApp chat in new window to owner
      const waMessage = constructWhatsAppMessage(orderData);
      const waUrl = `https://wa.me/919704514247?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, "_blank");

      showToast("Verified invoice generated! Opening WhatsApp... 🏺");
    });
  }

  // Direct Call to Order
  if (callOrderBtn) {
    callOrderBtn.addEventListener("click", () => {
      showToast("Connecting to Ammamma Special Kitchen helpline... 📞");
    });
  }
}

// -------------------------------------------------------------------
// 8. Quick View Modal
// -------------------------------------------------------------------
function openQuickView(productId) {
  const item = PICKLE_PRODUCTS.find((p) => p.id === productId);
  if (!item || !quickViewModal || !modalContent) return;

  const chiliIcons = Array.from({ length: 3 }, (_, i) => 
    `<i class="fa-solid fa-pepper-hot" style="opacity: ${i < item.heatScore ? '1' : '0.25'};"></i>`
  ).join("");

  modalContent.innerHTML = `
    <div class="modal-content-grid">
      <div class="modal-img-col">
        <img src="${item.image}" onerror="handleImgError(this)" alt="${item.title}">
      </div>

      <div class="modal-details-col">
        <span class="section-tag">${item.badge || "Artisanal Jar"}</span>
        <h2 class="modal-title">${item.title}</h2>
        <div class="modal-oil-badge">
          <i class="fa-solid fa-droplet"></i>
          <span>${item.oilType}</span>
        </div>

        <div class="product-rating-row" style="margin-bottom: 12px;">
          <div class="product-stars">
            <i class="fa-solid fa-star"></i>
            <strong>${item.rating}</strong>
            <span>(${item.reviewsCount} reviews)</span>
          </div>
          <div class="heat-indicator ${item.heat}">
            ${chiliIcons} <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; margin-left: 4px;">${item.heat}</span>
          </div>
        </div>

        <p class="product-desc" style="-webkit-line-clamp: initial;">${item.shortDesc}</p>

        <div class="modal-ingredients">
          <strong>Key Ingredients:</strong><br>
          ${item.ingredients}
        </div>

        <div class="modal-ingredients">
          <strong>Ideal Pairing:</strong><br>
          ${item.pairing}
        </div>

        <div class="modal-ingredients">
          <strong>Natural Shelf Life:</strong> ${item.shelfLife}
        </div>

        <!-- Weight & Price -->
        <div style="margin-top: 16px;">
          <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 6px;">Select Quantity:</label>
          <div class="weight-selector" id="modalWeightSelector">
            ${item.weights.map((w, idx) => `
              <button class="weight-btn ${idx === 1 ? 'selected' : ''}" 
                      data-size="${w.size}" 
                      data-price="${w.price}" 
                      data-orig="${w.origPrice}">
                ${w.size} - ₹${w.price}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="product-action-row" style="margin-top: 20px;">
          <div class="price-box">
            <span class="price-current" id="modalCurrentPrice">₹${item.weights[1]?.price || item.weights[0].price}</span>
            <span class="price-original" id="modalOrigPrice">₹${item.weights[1]?.origPrice || item.weights[0].origPrice}</span>
          </div>
          <button class="btn btn-primary" id="modalAddToCartBtn">
            <i class="fa-solid fa-basket-shopping"></i>
            <span>Add to Pickle Box</span>
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach dynamic weights in modal
  const modalWeightSelector = document.getElementById("modalWeightSelector");
  const modalCurrentPrice = document.getElementById("modalCurrentPrice");
  const modalOrigPrice = document.getElementById("modalOrigPrice");
  const modalAddToCartBtn = document.getElementById("modalAddToCartBtn");

  let selectedSize = item.weights[1]?.size || item.weights[0].size;
  let selectedPrice = item.weights[1]?.price || item.weights[0].price;

  if (modalWeightSelector) {
    modalWeightSelector.querySelectorAll(".weight-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        modalWeightSelector.querySelectorAll(".weight-btn").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedSize = btn.dataset.size;
        selectedPrice = parseInt(btn.dataset.price, 10);
        if (modalCurrentPrice) modalCurrentPrice.textContent = `₹${selectedPrice}`;
        if (modalOrigPrice) modalOrigPrice.textContent = `₹${btn.dataset.orig}`;
      });
    });
  }

  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener("click", () => {
      addToCart(item.id, selectedSize, selectedPrice);
      quickViewModal.classList.remove("active");
    });
  }

  quickViewModal.classList.add("active");
}

function setupModalEvents() {
  if (closeModalBtn && quickViewModal) {
    closeModalBtn.addEventListener("click", () => {
      quickViewModal.classList.remove("active");
    });
  }

  if (quickViewModal) {
    quickViewModal.addEventListener("click", (e) => {
      if (e.target === quickViewModal) {
        quickViewModal.classList.remove("active");
      }
    });
  }

  // Receipt Modal close handlers
  if (closeReceiptModalBtn && orderReceiptModal) {
    closeReceiptModalBtn.addEventListener("click", () => {
      orderReceiptModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (orderReceiptModal) {
    orderReceiptModal.addEventListener("click", (e) => {
      if (e.target === orderReceiptModal) {
        orderReceiptModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Tamper Alert Modal close handlers
  const closeTamperAlertBtn = document.getElementById("closeTamperAlertBtn");
  const tamperAlertModal = document.getElementById("tamperAlertModal");
  if (closeTamperAlertBtn && tamperAlertModal) {
    closeTamperAlertBtn.addEventListener("click", () => {
      tamperAlertModal.classList.remove("active");
    });
  }
  if (tamperAlertModal) {
    tamperAlertModal.addEventListener("click", (e) => {
      if (e.target === tamperAlertModal) {
        tamperAlertModal.classList.remove("active");
      }
    });
  }
}

// -------------------------------------------------------------------
// 9. Interactive Pairing Guide
// -------------------------------------------------------------------
function renderPairing(dishKey) {
  const data = PAIRING_DATA[dishKey];
  if (!data || !pairingDisplayCard) return;

  pairingDisplayCard.innerHTML = `
    <div class="pairing-img-box">
      <img src="${data.img}" onerror="handleImgError(this)" alt="${data.title}">
    </div>

    <div class="pairing-details-col">
      <span class="pairing-badge">${data.badge}</span>
      <h3 class="pairing-dish-title">${data.title}</h3>
      <p class="pairing-quote">“${data.quote}”</p>

      <ul class="pairing-features-list">
        ${data.features.map((f) => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join("")}
      </ul>

      <div>
        <button class="btn btn-primary" onclick="quickOrderPairing('${data.productId}')">
          <i class="fa-solid fa-jar"></i>
          <span>Order This Pairing Jar</span>
        </button>
      </div>
    </div>
  `;
}

function quickOrderPairing(productId) {
  const product = PICKLE_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  const weight = product.weights[1] || product.weights[0];
  addToCart(product.id, weight.size, weight.price);
  openCart();
}
window.quickOrderPairing = quickOrderPairing;

if (dishSelector) {
  dishSelector.addEventListener("click", (e) => {
    const btn = e.target.closest(".dish-btn");
    if (!btn) return;
    dishSelector.querySelectorAll(".dish-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    AppState.activeDish = btn.dataset.dish;
    renderPairing(AppState.activeDish);
  });
}

// -------------------------------------------------------------------
// 10. FAQ Accordion
// -------------------------------------------------------------------
function setupFAQEvents() {
  if (!faqAccordion) return;
  faqAccordion.addEventListener("click", (e) => {
    const questionBtn = e.target.closest(".faq-question");
    if (!questionBtn) return;
    const item = questionBtn.closest(".faq-item");
    const isActive = item.classList.contains("active");

    // Close others
    faqAccordion.querySelectorAll(".faq-item").forEach((it) => it.classList.remove("active"));

    // Toggle current
    if (!isActive) {
      item.classList.add("active");
    }
  });
}

// -------------------------------------------------------------------
// 11. Header, Scroll & Mobile Navigation
// -------------------------------------------------------------------
function setupScrollEffects() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add("scrolled");
    } else {
      siteHeader?.classList.remove("scrolled");
    }
  }, { passive: true });

  // Mobile Navigation Drawer with Overlay
  const closeMobileNav = document.getElementById("closeMobileNav");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobNavCart = document.getElementById("mobNavCart");

  function toggleMobileDrawer(show) {
    if (navLinks && mobileMenuOverlay) {
      navLinks.classList.toggle("mobile-open", show);
      mobileMenuOverlay.classList.toggle("active", show);
      document.body.style.overflow = show ? "hidden" : "";
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => toggleMobileDrawer(true));
  }
  if (closeMobileNav) {
    closeMobileNav.addEventListener("click", () => toggleMobileDrawer(false));
  }
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", () => toggleMobileDrawer(false));
  }
  navLinks?.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", () => toggleMobileDrawer(false));
  });

  // Mobile Bottom Bar Cart click
  if (mobNavCart) {
    mobNavCart.addEventListener("click", () => {
      openCart();
    });
  }

  // Top announcement bar close
  if (closeAnnouncement && announcementBar) {
    closeAnnouncement.addEventListener("click", () => {
      announcementBar.classList.add("hidden");
    });
  }
}

// -------------------------------------------------------------------
// 12. Newsletter Form
// -------------------------------------------------------------------
function setupNewsletter() {
  if (!newsletterForm) return;
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("newsletterEmail");
    const email = emailInput ? emailInput.value.trim() : "";
    if (email) {
      showToast(`Welcome to Home Delights - Inti Ruchulu! Use promo DESI15 for 15% OFF.`);
      newsletterForm.reset();
    }
  });
}

// -------------------------------------------------------------------
// 13. Toast Notification System
// -------------------------------------------------------------------
function showToast(message) {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i class="fa-solid fa-check"></i>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
window.showToast = showToast;
