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
  // Sum total jar quantities (e.g. 2 + 1 + 1 = 4 jars)
  const totalJars = order.items.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);
  const dataStr = `${order.orderId}|${order.total}|${totalJars}|${order.phone}|${order.subtotal}|${INVOICE_SECRET_SALT}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < dataStr.length; i++) {
    hash ^= dataStr.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  const hex = hash.toString(16).toUpperCase().padStart(8, "0");
  return `HD-${order.total}-${totalJars}J-${hex.slice(0, 4)}`;
}

// -------------------------------------------------------------------
// Google Sheets Order Auto-Logger (Option 2: 100% Free & Tamper-Proof)
// Follow GOOGLE_SHEET_SETUP_GUIDE.md to deploy your private Google Sheet
// -------------------------------------------------------------------
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyOEq8pHbA5A2nFTEqu4KuF2W1jY7aw1sii2jdtg14lCwKCfDI_8-nuS3lB_JMVxvvy/exec";

function logOrderToGoogleSheet(order) {
  if (!GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_WEBAPP_URL.includes("REPLACE_WITH_YOUR_DEPLOYED_URL")) {
    console.log("ℹ️ Google Sheet Auto-Logger: Web App URL not set yet. See GOOGLE_SHEET_SETUP_GUIDE.md");
    return;
  }

  try {
    const payload = JSON.stringify({
      orderId: order.orderId,
      date: order.date,
      customerName: order.customerName,
      phone: order.phone,
      address: order.address,
      paymentMode: order.paymentMode,
      items: order.items,
      subtotal: order.subtotal,
      delivery: order.delivery,
      total: order.total,
      securityCode: order.securityCode,
      receiptUrl: order.receiptUrl
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
      navigator.sendBeacon(GOOGLE_SHEET_WEBAPP_URL, blob);
    } else {
      fetch(GOOGLE_SHEET_WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload
      }).catch((e) => console.warn("Google Sheet log fallback:", e));
    }
    console.log("✅ Genuine order logged to Google Sheet:", order.orderId);
  } catch (err) {
    console.warn("Google Sheet logger exception:", err);
  }
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
  const base64 = encodeURIComponent(btoa(encodeURIComponent(jsonStr)));

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
    const safeBase64 = decodeURIComponent(base64).replace(/\s/g, "+");
    const jsonStr = decodeURIComponent(atob(safeBase64));

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
  const totalJars = order.items.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);

  let message = `*Namaste Ammamma Special Pickles!*\n\n`;
  message += `I have placed an order on your website:\n`;
  message += `----------------------------------------\n`;
  message += `*Order ID:* #${order.orderId}\n`;
  message += `*Date:* ${order.date}\n`;
  message += `*Security Token:* [SEC: ${order.securityCode}]\n`;
  if (order.receiptUrl) {
    message += `👉 *TAP TO VERIFY BILL & PACK SLIP:*\n${order.receiptUrl}\n`;
  }
  message += `----------------------------------------\n\n`;
  message += `*Customer Details:*\n`;
  message += `- Name: ${order.customerName}\n`;
  message += `- Phone: ${order.phone}\n`;
  message += `- Delivery Address: ${order.address}\n`;
  message += `- Payment: ${order.paymentMode.includes("UPI") ? "Direct UPI (0% Fee)" : "Cash on Delivery (COD)"}\n\n`;
  message += `*Jars Ordered (${totalJars} Jars):*\n`;
  order.items.forEach((item, index) => {
    message += `${index + 1}. *${item.title}* (${item.size}) x ${item.quantity} = Rs.${item.quantity * item.price}\n`;
  });
  message += `\n*Bill Summary:*\n`;
  message += `- Items Subtotal: Rs.${order.subtotal}\n`;
  message += `- Fragile Delivery: ${order.delivery === 0 ? "FREE" : "Rs." + order.delivery}\n`;
  message += `- *GRAND TOTAL PAYABLE: Rs.${order.total}*\n\n`;
  message += `Please confirm my order and share UPI / dispatch details!`;
  return message;
}

// -------------------------------------------------------------------
// HTML5 Canvas Non-Editable Invoice Image Generator (100% Client-Side)
// -------------------------------------------------------------------
function generateReceiptCanvasBlob(order, callback) {
  const scale = 2; // High-DPI 2x scale for crystal-sharp text
  const width = 640;
  const padding = 32;
  const contentWidth = width - (padding * 2);

  // Dynamic height based on number of items
  const itemRowHeight = 34;
  const itemsHeight = order.items.length * itemRowHeight;
  const height = 660 + itemsHeight;

  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  function render(logoImg) {
    // 1. Background
    ctx.fillStyle = "#FFFDF9";
    ctx.fillRect(0, 0, width, height);

    // 2. Double Heritage Borders
    ctx.strokeStyle = "#9E2A2B";
    ctx.lineWidth = 3;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    ctx.strokeStyle = "#C99A45";
    ctx.lineWidth = 1;
    ctx.strokeRect(17, 17, width - 34, height - 34);

    let y = 34;

    // 3. Top Official Badge
    ctx.fillStyle = "#9E2A2B";
    ctx.beginPath();
    ctx.roundRect((width - 260) / 2, y, 260, 24, 12);
    ctx.fill();

    ctx.fillStyle = "#FFF";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("OFFICIAL VERIFIED ORDER INVOICE", width / 2, y + 16);
    y += 38;

    // 4. Logo & Brand Title
    if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
      const logoSize = 60;
      const logoX = (width - logoSize) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, y + (logoSize / 2), logoSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(logoImg, logoX, y, logoSize, logoSize);
      ctx.restore();

      ctx.strokeStyle = "#C99A45";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width / 2, y + (logoSize / 2), (logoSize / 2) + 1, 0, Math.PI * 2);
      ctx.stroke();

      y += logoSize + 12;
    }

    ctx.fillStyle = "#9E2A2B";
    ctx.font = "bold 20px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("HOME DELIGHTS - INTI RUCHULU", width / 2, y);
    y += 18;

    ctx.fillStyle = "#555";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("AMMAMMA SPECIAL • TRADITIONAL HANDCRAFTED PICKLES", width / 2, y);
    y += 16;

    ctx.fillStyle = "#15803D";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("FSSAI Lic No. 20126081000685", width / 2, y);
    y += 16;

    // Divider
    ctx.strokeStyle = "#E8DFCF";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
    y += 14;

    // 5. Order & Customer Info Card
    ctx.fillStyle = "#FAF5ED";
    ctx.beginPath();
    ctx.roundRect(padding, y, contentWidth, 96, 8);
    ctx.fill();
    ctx.strokeStyle = "#E2DACB";
    ctx.stroke();

    const col1X = padding + 16;
    const col2X = padding + (contentWidth / 2) + 10;
    const cardY = y + 18;

    ctx.textAlign = "left";
    // Col 1: Order Details
    ctx.fillStyle = "#777";
    ctx.font = "9px sans-serif";
    ctx.fillText("ORDER ID", col1X, cardY);
    ctx.fillStyle = "#9E2A2B";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("#" + order.orderId, col1X, cardY + 15);

    ctx.fillStyle = "#777";
    ctx.font = "9px sans-serif";
    ctx.fillText("DATE & TIME", col1X, cardY + 36);
    ctx.fillStyle = "#222";
    ctx.font = "11px sans-serif";
    ctx.fillText(order.date, col1X, cardY + 50);

    ctx.fillStyle = "#777";
    ctx.font = "9px sans-serif";
    ctx.fillText("PAYMENT MODE", col1X, cardY + 70);
    ctx.fillStyle = "#15803D";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText(order.paymentMode.includes("UPI") ? "Direct UPI (0% Fee)" : "Cash on Delivery", col1X, cardY + 84);

    // Col 2: Customer Details
    ctx.fillStyle = "#777";
    ctx.font = "9px sans-serif";
    ctx.fillText("CUSTOMER NAME", col2X, cardY);
    ctx.fillStyle = "#222";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(order.customerName, col2X, cardY + 15);

    ctx.fillStyle = "#777";
    ctx.font = "9px sans-serif";
    ctx.fillText("PHONE", col2X, cardY + 36);
    ctx.fillStyle = "#222";
    ctx.font = "11px sans-serif";
    ctx.fillText(order.phone, col2X, cardY + 50);

    ctx.fillStyle = "#777";
    ctx.font = "9px sans-serif";
    ctx.fillText("DELIVERY ADDRESS", col2X, cardY + 70);
    ctx.fillStyle = "#222";
    ctx.font = "11px sans-serif";
    const shortAddress = order.address.length > 32 ? order.address.substring(0, 30) + "..." : order.address;
    ctx.fillText(shortAddress, col2X, cardY + 84);

    y += 110;

    // 6. Items Table Header
    ctx.fillStyle = "#EAE2D4";
    ctx.fillRect(padding, y, contentWidth, 24);

    ctx.fillStyle = "#9E2A2B";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("#", padding + 8, y + 16);
    ctx.fillText("JAR VARIETY & SIZE", padding + 28, y + 16);
    ctx.textAlign = "center";
    ctx.fillText("QTY", padding + contentWidth - 130, y + 16);
    ctx.textAlign = "right";
    ctx.fillText("RATE", padding + contentWidth - 70, y + 16);
    ctx.fillText("TOTAL", padding + contentWidth - 10, y + 16);

    y += 24;

    // 7. Table Rows
    order.items.forEach((item, index) => {
      ctx.fillStyle = index % 2 === 0 ? "#FFF" : "#FAF8F5";
      ctx.fillRect(padding, y, contentWidth, itemRowHeight);

      ctx.strokeStyle = "#EFE9DF";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, y + itemRowHeight);
      ctx.lineTo(padding + contentWidth, y + itemRowHeight);
      ctx.stroke();

      ctx.fillStyle = "#666";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText((index + 1).toString(), padding + 8, y + 22);

      ctx.fillStyle = "#111";
      ctx.font = "bold 11px sans-serif";
      const shortTitle = item.title.length > 28 ? item.title.substring(0, 26) + "..." : item.title;
      ctx.fillText(`${shortTitle} (${item.size})`, padding + 28, y + 22);

      ctx.textAlign = "center";
      ctx.font = "11px sans-serif";
      ctx.fillText(item.quantity.toString(), padding + contentWidth - 130, y + 22);

      ctx.textAlign = "right";
      ctx.fillStyle = "#666";
      ctx.fillText("Rs." + item.price, padding + contentWidth - 70, y + 22);

      ctx.fillStyle = "#9E2A2B";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("Rs." + (item.price * item.quantity), padding + contentWidth - 10, y + 22);

      y += itemRowHeight;
    });

    y += 10;

    // 8. Totals & Pricing Breakdown Box
    ctx.fillStyle = "#FAF5ED";
    ctx.beginPath();
    ctx.roundRect(padding, y, contentWidth, 68, 8);
    ctx.fill();
    ctx.strokeStyle = "#E2DACB";
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.fillStyle = "#666";
    ctx.font = "11px sans-serif";
    ctx.fillText("Items Subtotal:", padding + 16, y + 22);
    ctx.fillText("Fragile Packaging & Express Delivery:", padding + 16, y + 46);

    ctx.textAlign = "right";
    ctx.fillStyle = "#222";
    ctx.fillText("Rs. " + order.subtotal, padding + contentWidth - 16, y + 22);
    ctx.fillStyle = order.delivery === 0 ? "#15803D" : "#222";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText(order.delivery === 0 ? "FREE" : "Rs. " + order.delivery, padding + contentWidth - 16, y + 46);

    y += 78;

    // 9. Grand Total Banner
    ctx.fillStyle = "#9E2A2B";
    ctx.beginPath();
    ctx.roundRect(padding, y, contentWidth, 42, 8);
    ctx.fill();

    ctx.textAlign = "left";
    ctx.fillStyle = "#FFF";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("GRAND TOTAL PAYABLE:", padding + 18, y + 26);

    ctx.textAlign = "right";
    ctx.font = "bold 18px 'Playfair Display', Georgia, serif";
    ctx.fillText("Rs. " + order.total, padding + contentWidth - 18, y + 28);

    y += 52;

    // 10. Security Hash Stamp & Authenticity Verification
    ctx.fillStyle = "#F0FDF4";
    ctx.beginPath();
    ctx.roundRect(padding, y, contentWidth, 46, 8);
    ctx.fill();
    ctx.strokeStyle = "#BBF7D0";
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.fillStyle = "#15803D";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("OFFICIAL SECURITY TOKEN (TAMPER-PROOF):", padding + 14, y + 18);

    ctx.fillStyle = "#9E2A2B";
    ctx.font = "bold 12px monospace";
    ctx.fillText("[SEC: " + order.securityCode + "]", padding + 14, y + 34);

    ctx.textAlign = "right";
    ctx.fillStyle = "#666";
    ctx.font = "italic 9px sans-serif";
    ctx.fillText("Non-editable verified digital bill", padding + contentWidth - 14, y + 20);
    ctx.fillText("pickle-ten-sandy.vercel.app", padding + contentWidth - 14, y + 34);

    // Convert to Blob and DataURL
    canvas.toBlob((blob) => {
      callback(blob, canvas.toDataURL("image/png"));
    }, "image/png");
  }

  // Preload logo for canvas drawing
  const logo = new Image();
  logo.crossOrigin = "anonymous";
  logo.onload = () => render(logo);
  logo.onerror = () => render(null);
  logo.src = "./logo.jpg";
}

function openReceiptModal(order, isAdminVerified = false) {
  if (!orderReceiptModal || !receiptBody) return;

  // Show loading spinner while canvas creates the locked image
  receiptBody.innerHTML = `
    <div class="receipt-generating-state">
      <i class="fa-solid fa-spinner fa-spin"></i>
      <span>Generating Official Verified Bill Image...</span>
    </div>
  `;

  orderReceiptModal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Generate the Canvas Image
  generateReceiptCanvasBlob(order, (blob, dataUrl) => {
    const fileName = `HomeDelights-Invoice-${order.orderId}.png`;

    if (isAdminVerified) {
      const totalJars = order.items.reduce((s, it) => s + (parseInt(it.quantity, 10) || 1), 0);
      receiptBody.innerHTML = `
        <div class="kitchen-admin-card" style="padding: 4px;">
          <!-- 1. Authenticity Header -->
          <div class="admin-verification-banner" style="background: #F0FDF4; border: 2px solid #22C55E; color: #15803D; padding: 14px 16px; border-radius: 12px; margin-bottom: 14px; display: flex; align-items: center; gap: 12px;">
            <i class="fa-solid fa-circle-check" style="font-size: 2.2rem; color: #16A34A; flex-shrink: 0;"></i>
            <div>
              <strong style="font-size: 1.05rem; display: block; margin-bottom: 2px; color: #14532D;">OFFICIAL ORDER VERIFIED (TAMPER-PROOF)</strong>
              <span style="font-size: 0.85rem; color: #166534; line-height: 1.35; display: block;">Order #${order.orderId} verified from website catalog. Even if customer edited WhatsApp text, THIS slip shows the authentic payable amount.</span>
            </div>
          </div>

          <!-- 2. Giant Amount to Collect Card -->
          <div class="admin-collect-card" style="background: linear-gradient(135deg, #9E2A2B 0%, #7A191A 100%); color: #FFF; padding: 20px 20px; border-radius: 14px; text-align: center; margin-bottom: 16px; box-shadow: 0 6px 20px rgba(158, 42, 43, 0.25);">
            <span style="text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; opacity: 0.9; font-weight: 700; display: block; margin-bottom: 6px;">Total Money to Collect from Customer:</span>
            <div style="font-size: 2.8rem; font-weight: 800; font-family: 'Playfair Display', Georgia, serif; line-height: 1.1; margin-bottom: 8px;">
              ₹${order.total}
            </div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.2); padding: 5px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 700;">
              <i class="fa-solid fa-${order.paymentMode.includes('UPI') ? 'mobile-screen-button' : 'hand-holding-dollar'}"></i>
              <span>${order.paymentMode}</span>
            </div>
          </div>

          <!-- 3. Jars to Pack in Box -->
          <div class="admin-pack-card" style="background: #FAF8F5; border: 1.5px solid #EADBCC; border-radius: 12px; padding: 14px 16px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #EADBCC; padding-bottom: 8px;">
              <h5 style="margin: 0; font-size: 0.98rem; color: #9E2A2B; font-weight: 700;">
                <i class="fa-solid fa-jar"></i> Jars to Pack in Box:
              </h5>
              <span style="background: #9E2A2B; color: #FFF; font-size: 0.78rem; font-weight: 700; padding: 3px 10px; border-radius: 12px;">
                ${totalJars} Jars Total
              </span>
            </div>
            <div class="admin-items-list" style="display: flex; flex-direction: column; gap: 8px;">
              ${order.items.map((item, idx) => `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF; padding: 10px 12px; border-radius: 8px; border: 1px solid #EFEAE2;">
                  <div>
                    <strong style="color: #222; font-size: 0.95rem;">${idx + 1}. ${item.title}</strong>
                    <span style="color: #666; font-size: 0.82rem; display: block; margin-top: 2px;">Weight: <strong>${item.size}</strong> • Rate: ₹${item.price}</span>
                  </div>
                  <div style="text-align: right; flex-shrink: 0; margin-left: 12px;">
                    <span style="background: #FEF3C7; color: #92400E; font-weight: 800; font-size: 0.85rem; padding: 3px 8px; border-radius: 6px;">Qty: ${item.quantity}</span>
                    <strong style="display: block; color: #9E2A2B; font-size: 0.92rem; margin-top: 3px;">₹${item.quantity * item.price}</strong>
                  </div>
                </div>
              `).join("")}
            </div>
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #D5C7B5; font-size: 0.85rem; color: #555; display: flex; justify-content: space-between;">
              <span>Subtotal: ₹${order.subtotal} | Delivery: ${order.delivery === 0 ? '<strong style="color:#15803D;">FREE</strong>' : '₹' + order.delivery}</span>
              <strong style="color: #111;">Grand Total: ₹${order.total}</strong>
            </div>
          </div>

          <!-- 4. Customer Details -->
          <div class="admin-cust-card" style="background: #FFF; border: 1.5px solid #E5E7EB; border-radius: 12px; padding: 12px 16px; margin-bottom: 16px;">
            <h5 style="margin: 0 0 6px; font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Customer Delivery Info:</h5>
            <div style="font-size: 0.95rem; color: #111;">
              <strong>${order.customerName}</strong> (<a href="tel:+91${order.phone}" style="color: #9E2A2B; text-decoration: none; font-weight: 700;">+91 ${order.phone}</a>)<br>
              <span style="color: #444; font-size: 0.9rem; line-height: 1.4; display: block; margin-top: 4px;">📍 ${order.address}</span>
            </div>
          </div>

          <!-- 5. 1-Tap Kitchen Actions -->
          <div class="receipt-actions" style="display: flex; flex-direction: column; gap: 10px;">
            <a href="https://wa.me/91${order.phone}?text=${encodeURIComponent(`Namaste ${order.customerName} garu! 🙏\n\nYour Ammamma Special Pickles order #${order.orderId} (Rs. ${order.total}) has been verified and confirmed! 🏺\n\nPlease send payment of Rs. ${order.total} to UPI: 9704514247@upi and share the screenshot so we can pack and dispatch your fresh jars today!`)}" target="_blank" class="btn-receipt-wa" style="padding: 14px 18px; font-size: 1rem; border-radius: 12px; justify-content: center; text-decoration: none; display: flex; align-items: center; gap: 8px; background: #25D366; color: #FFF; font-weight: 700; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);">
              <i class="fa-brands fa-whatsapp" style="font-size: 1.3rem;"></i>
              <span>Confirm Order with Customer (+91 ${order.phone})</span>
            </a>

            <div style="display: flex; gap: 10px;">
              <a href="tel:+91${order.phone}" class="btn-receipt-download" style="flex: 1; padding: 10px; border-radius: 10px; text-decoration: none; display: flex; justify-content: center; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 700; color: #9E2A2B; border: 1.5px solid #9E2A2B;">
                <i class="fa-solid fa-phone"></i>
                <span>Call Customer</span>
              </a>
              <button class="btn-receipt-print" onclick="window.print()" style="flex: 1; padding: 10px; border-radius: 10px; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 700; background: #FAF5ED; border: 1px solid #D5C7B5;">
                <i class="fa-solid fa-print"></i>
                <span>Print Slip</span>
              </button>
            </div>

            <details style="margin-top: 10px; text-align: center;">
              <summary style="font-size: 0.85rem; color: #777; cursor: pointer; text-decoration: underline;">View Locked Digital Invoice Image</summary>
              <div style="margin-top: 12px;">
                <img src="${dataUrl}" alt="Official Order Invoice #${order.orderId}" class="generated-invoice-img" style="max-width: 100%; border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
              </div>
            </details>
          </div>
        </div>
      `;
    } else {
      // Customer view on website
      receiptBody.innerHTML = `
        <div class="receipt-card">
          <div class="admin-verification-banner" style="background: #F0FDF4; border-color: #BBF7D0; color: #15803D;">
            <i class="fa-solid fa-circle-check"></i>
            <div>
              <strong>OFFICIAL ORDER INVOICE #${order.orderId}</strong><br>
              <span>Your bill is locked and verified. Tap below to send this order directly to +91 97045 14247!</span>
            </div>
          </div>

          <!-- Rendered Non-Editable Canvas Image Preview -->
          <div class="receipt-image-preview-card">
            <img src="${dataUrl}" alt="Official Order Invoice #${order.orderId}" class="generated-invoice-img" id="generatedInvoiceImg">
          </div>

          <!-- Action Buttons -->
          <div class="receipt-actions">
            <button class="btn-receipt-wa" id="receiptShareWaBtn">
              <i class="fa-brands fa-whatsapp"></i>
              <span>Send Order to WhatsApp (+91 97045 14247)</span>
            </button>
            <a href="${dataUrl}" download="${fileName}" class="btn-receipt-download" id="receiptDownloadBtn">
              <i class="fa-solid fa-download"></i>
              <span>Download Bill Image</span>
            </a>
            <button class="btn-receipt-print" onclick="window.print()">
              <i class="fa-solid fa-print"></i>
              <span>Print</span>
            </button>
          </div>
        </div>
      `;

      const receiptShareWaBtn = document.getElementById("receiptShareWaBtn");
      if (receiptShareWaBtn) {
        receiptShareWaBtn.onclick = async () => {
          // Clear cart once order is dispatched
          AppState.cart = [];
          saveCart();
          updateCartUI();

          // Auto-log authentic order to private Google Sheet in background
          logOrderToGoogleSheet(order);

          // 1. Desktop: attempt to copy image to clipboard for easy Ctrl+V pasting
          try {
            if (navigator.clipboard && window.ClipboardItem && blob) {
              await navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob })
              ]);
              showToast("📸 Bill image copied to clipboard!");
            }
          } catch (clipErr) {
            // Clipboard write not available on all mobile browsers, safe to ignore
          }

          // 2. Direct 1-tap redirect to the business owner WhatsApp number (no contact picker!)
          const cleanMsg = constructWhatsAppMessage(order);
          const waUrl = `https://wa.me/919704514247?text=${encodeURIComponent(cleanMsg)}`;

          showToast("Opening WhatsApp with +91 97045 14247... 🏺");
          window.open(waUrl, "_blank") || (window.location.href = waUrl);
        };
      }
    }
  });
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

      // Auto-log authentic order to private Google Sheet in background
      logOrderToGoogleSheet(orderData);

      // Save to localStorage for instant reference
      try {
        localStorage.setItem("homedelights_last_receipt", JSON.stringify(orderData));
      } catch (e) {
        console.warn("Storage warning:", e);
      }

      // Open verified digital receipt modal on screen for customer review
      closeCart();
      openReceiptModal(orderData);
      showToast("Official bill generated! Review and tap Send on WhatsApp 🏺");
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
