/**
 * HOME DELIGHTS - INTI RUCHULU | AMMAMMA SPECIAL
 * Artisanal Heritage Pickles - Application Logic
 */

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
const directCheckoutBtn = document.getElementById("directCheckoutBtn");

// Modals
const quickViewModal = document.getElementById("quickViewModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalContent = document.getElementById("modalContent");
const checkoutSuccessModal = document.getElementById("checkoutSuccessModal");
const closeSuccessModalBtn = document.getElementById("closeSuccessModalBtn");

// Pairing & FAQ
const dishSelector = document.getElementById("dishSelector");
const pairingDisplayCard = document.getElementById("pairingDisplayCard");
const faqAccordion = document.getElementById("faqAccordion");
const newsletterForm = document.getElementById("newsletterForm");
const toastContainer = document.getElementById("toastContainer");

// -------------------------------------------------------------------
// 5. Initializations & Event Listeners
// -------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Set copyright year
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
          <img src="${item.image}" onerror="this.onerror=null;this.src='./assets/images/' + this.src.split('/').pop();" alt="${item.title}" class="product-thumb" loading="lazy">
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
          <img src="${item.image}" onerror="this.onerror=null;this.src='./assets/images/' + this.src.split('/').pop();" alt="${item.title}" class="cart-item-img">
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

function setupCartEvents() {
  if (cartTrigger) cartTrigger.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  // WhatsApp Checkout Generator
  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener("click", () => {
      if (AppState.cart.length === 0) {
        showToast("Please add at least one jar to order! 🏺");
        return;
      }

      const subtotal = AppState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const delivery = subtotal >= 599 ? 0 : 50;
      const total = subtotal + delivery;

      // Construct WhatsApp message
      let message = `*🏺 NEW ORDER - HOME DELIGHTS - INTI RUCHULU (AMMAMMA SPECIAL)*\n`;
      message += `--------------------------------------\n`;
      AppState.cart.forEach((item, index) => {
        message += `${index + 1}. *${item.title}* (${item.size})\n   Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
      });
      message += `--------------------------------------\n`;
      message += `*Items Subtotal:* ₹${subtotal}\n`;
      message += `*Packaging & Delivery:* ${delivery === 0 ? "FREE" : "₹" + delivery}\n`;
      message += `*Grand Total Payable:* ₹${total}\n\n`;
      message += `*Customer Details:*\nName: \nDelivery City & Pincode: \nPreferred Payment: (UPI / Cash on Delivery)\n\nPlease confirm availability and share payment link!`;

      const encoded = encodeURIComponent(message);
      const waUrl = `https://wa.me/919876543210?text=${encoded}`;
      window.open(waUrl, "_blank");
    });
  }

  // Simulated Direct Checkout
  if (directCheckoutBtn) {
    directCheckoutBtn.addEventListener("click", () => {
      if (AppState.cart.length === 0) {
        showToast("Please add items to your jar box first! 🏺");
        return;
      }
      closeCart();
      if (checkoutSuccessModal) {
        const subtotal = AppState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const successOrderDetails = document.getElementById("successOrderDetails");
        if (successOrderDetails) {
          successOrderDetails.innerHTML = `
            Your demo order of <strong>${AppState.cart.length} jar type(s)</strong> totaling <strong>₹${subtotal}</strong> has been logged.<br>
            In production, this connects to Razorpay / Stripe or WhatsApp direct order!
          `;
        }
        checkoutSuccessModal.classList.add("active");
        // Clear cart for clean demonstration
        AppState.cart = [];
        saveCart();
        updateCartUI();
      }
    });
  }

  if (closeSuccessModalBtn && checkoutSuccessModal) {
    closeSuccessModalBtn.addEventListener("click", () => {
      checkoutSuccessModal.classList.remove("active");
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
        <img src="${item.image}" onerror="this.onerror=null;this.src='./assets/images/' + this.src.split('/').pop();" alt="${item.title}">
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
}

// -------------------------------------------------------------------
// 9. Interactive Pairing Guide
// -------------------------------------------------------------------
function renderPairing(dishKey) {
  const data = PAIRING_DATA[dishKey];
  if (!data || !pairingDisplayCard) return;

  pairingDisplayCard.innerHTML = `
    <div class="pairing-img-box">
      <img src="${data.img}" onerror="this.onerror=null;this.src='./assets/images/' + this.src.split('/').pop();" alt="${data.title}">
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
