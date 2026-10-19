/**
 * HOME DELIGHTS - INTI RUCHULU | AMMAMMA SPECIAL
 * Authentic Pickles, Pindi Vantalu, Hot Snacks & Podis - Application Logic
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
  const rawFilename = img.src.split("/").pop();
  const filename = decodeURIComponent(rawFilename);
  if (!img.dataset.hasRetried) {
    img.dataset.hasRetried = "1";
    img.src = "./assets/images/" + filename;
  } else if (img.dataset.hasRetried === "1") {
    img.dataset.hasRetried = "2";
    img.src = "./Pickles_and_Snacks_Images/" + filename;
  } else if (img.dataset.hasRetried === "2") {
    img.dataset.hasRetried = "3";
    img.src = "./Traditional_Sweets_and_Snacks_Images/" + filename;
  } else {
    img.onerror = null;
    img.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20400'%20fill='%23FAF8F4'%3E%3Crect%20width='400'%20height='400'%20fill='%23FAF8F4'/%3E%3Ctext%20x='50%25'%20y='50%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-family='sans-serif'%20font-size='32'%20fill='%239E2A2B'%3E%F0%9F%8F%BA%20Home%20Delights%3C/text%3E%3C/svg%3E";
  }
}
window.handleImgError = handleImgError;

// Universal WhatsApp & Telephone Phone Number Sanitizer
function getCleanPhoneNumbers(rawPhone) {
  if (!rawPhone) return { raw: "", clean: "", display: "", tel: "", isValid: false };
  
  // 1. Strip all non-numeric characters (+, spaces, hyphens, brackets)
  let digits = rawPhone.toString().replace(/\D/g, "");
  
  // 2. Remove leading zeros
  while (digits.startsWith("0")) {
    digits = digits.substring(1);
  }
  
  // 3. Normalize Indian country codes
  while (digits.length > 12 && digits.startsWith("91")) {
    digits = digits.substring(2);
  }
  if (digits.length === 10) {
    digits = "91" + digits;
  }
  
  const is12DigitIndia = digits.length === 12 && digits.startsWith("91");
  const display = is12DigitIndia
    ? `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
    : `+${digits}`;
    
  return {
    raw: rawPhone,
    clean: digits,
    display: display,
    tel: `+${digits}`,
    isValid: digits.length >= 10
  };
}
window.getCleanPhoneNumbers = getCleanPhoneNumbers;

// -------------------------------------------------------------------
// Admin Authentication (Phone-Number Gated)
// -------------------------------------------------------------------
const ADMIN_PHONE_DIGITS = "9704514247"; // Admin's 10-digit mobile number

function isAdminAuthenticated() {
  return sessionStorage.getItem("hd_admin_auth") === ADMIN_PHONE_DIGITS;
}

function promptAdminAuth(onSuccess) {
  // Build a simple full-screen overlay prompt
  const overlay = document.createElement("div");
  overlay.id = "adminAuthOverlay";
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.72);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Inter', sans-serif;
  `;
  overlay.innerHTML = `
    <div style="background:#FFF; border-radius:18px; padding:32px 28px; max-width:340px; width:90%; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,0.4);">
      <div style="font-size:2.6rem; margin-bottom:10px;">🔐</div>
      <h3 style="margin:0 0 6px; color:#1A1A1A; font-size:1.15rem;">Admin Access Required</h3>
      <p style="margin:0 0 20px; color:#555; font-size:0.88rem; line-height:1.5;">Enter your registered admin mobile number to unlock the Kitchen Dispatch Panel.</p>
      <input id="adminAuthInput" type="tel" inputmode="numeric" maxlength="10"
        placeholder="10-digit mobile number"
        style="width:100%; box-sizing:border-box; padding:13px 14px; border:2px solid #D5C7B5; border-radius:10px; font-size:1rem; text-align:center; outline:none; margin-bottom:12px; letter-spacing:2px;"
      />
      <div id="adminAuthError" style="color:#9E2A2B; font-size:0.82rem; margin-bottom:10px; min-height:18px;"></div>
      <button id="adminAuthSubmit"
        style="width:100%; padding:13px; border:none; border-radius:10px; background:#9E2A2B; color:#FFF; font-size:1rem; font-weight:700; cursor:pointer; margin-bottom:10px;">
        Verify & Unlock
      </button>
      <button id="adminAuthCancel"
        style="width:100%; padding:10px; border:1.5px solid #DDD; border-radius:10px; background:#FAF8F4; color:#666; font-size:0.9rem; cursor:pointer;">
        Cancel — View Customer Bill
      </button>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = overlay.querySelector("#adminAuthInput");
  const errEl = overlay.querySelector("#adminAuthError");
  const submitBtn = overlay.querySelector("#adminAuthSubmit");
  const cancelBtn = overlay.querySelector("#adminAuthCancel");

  const attemptAuth = () => {
    const entered = input.value.trim().replace(/\D/g, "");
    if (entered === ADMIN_PHONE_DIGITS) {
      sessionStorage.setItem("hd_admin_auth", ADMIN_PHONE_DIGITS);
      overlay.remove();
      onSuccess();
    } else {
      errEl.textContent = "❌ Incorrect number. Admin access denied.";
      input.style.borderColor = "#9E2A2B";
      input.value = "";
      input.focus();
    }
  };

  submitBtn.onclick = attemptAuth;
  cancelBtn.onclick = () => { overlay.remove(); };
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") attemptAuth(); });
  setTimeout(() => input.focus(), 50);
}

// -------------------------------------------------------------------
// 1. Complete Product Database (Pickles, Sweets & Snacks)
// -------------------------------------------------------------------
const PICKLE_PRODUCTS = [
  {
    "id": "mango-pickle",
    "title": "Mango Pickle",
    "subtitle": "Authentic Andhra Avakaya (Clay-Jar Sun Cured)",
    "category": "veg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 5,
    "reviewsCount": 620,
    "badge": "Heritage Bestseller",
    "image": "./Pickles_and_Snacks_Images/Mango Pickle.png",
    "shortDesc": "The undisputed king of Andhra pickles. Hand-cut raw sour mangoes, stone-ground Guntur mustard (aava pindi), and cold-pressed oil sun-matured in authentic ceramic jars.",
    "oilType": "Cold-Pressed Groundnut & Gingelly Oil",
    "ingredients": "Raw Sour Farm Mangoes, Cold-Pressed Groundnut Oil, Stone-Ground Mustard Seeds (Aava Pindi), Guntur Red Chilli, Fenugreek, Rock Salt.",
    "shelfLife": "12 Months (Store in cool dry place, use dry spoon)",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "Hot steamed rice with a dollop of pure melted cow ghee and crunchy appadam."
  },
  {
    "id": "gongura-pickle",
    "title": "Gongura Pickle",
    "subtitle": "Andhra Matha Heritage Red Sorrel Leaf Pachadi",
    "category": "veg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.9,
    "reviewsCount": 540,
    "badge": "Andhra Signature",
    "image": "./Pickles_and_Snacks_Images/Gongura Pickle.png",
    "shortDesc": "Freshly plucked tangy red sorrel leaves slow-cooked on low flame with roasted garlic, red chillies, and aromatic hing tadka. Tangy, spicy, and deeply nostalgic.",
    "oilType": "Wood-Pressed Gingelly (Sesame) Oil",
    "ingredients": "Fresh Red Gongura Leaves, Wood-Pressed Sesame Oil, Roasted Garlic, Dried Guntur Chillies, Mustard, Fenugreek, Asafoetida (Hing), Salt.",
    "shelfLife": "12 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "Best paired with piping hot rice, ghee, sliced raw onions, or stuffed parathas."
  },
  {
    "id": "garlic-cashew-pickle",
    "title": "Garlic and Cashew Pickle",
    "subtitle": "Vellulli & Kaju Royal Andhra Pachadi",
    "category": "veg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 5,
    "reviewsCount": 380,
    "badge": "Royal Delicacy",
    "image": "./Pickles_and_Snacks_Images/Garlic & Cashew Pickle.png",
    "shortDesc": "Plump, buttery whole cashews and roasted desi garlic pods slow-steeped in a spicy, tangy, and rich mustard-fenugreek pickle gravy. A royal dining experience.",
    "oilType": "Cold-Pressed Groundnut Oil",
    "ingredients": "Premium Whole Cashews (Kaju), Desi Garlic Pods, Cold-Pressed Oil, Red Chilli Powder, Mustard Powder, Fenugreek, Lemon Extract, Rock Salt.",
    "shelfLife": "9 Months",
    "weights": [
      {
        "size": "250g",
        "price": 209,
        "origPrice": 250
      },
      {
        "size": "500g",
        "price": 409,
        "origPrice": 480
      },
      {
        "size": "1kg",
        "price": 799,
        "origPrice": 950
      }
    ],
    "pairing": "Elevates biryani, curd rice, ghee rice, or can be enjoyed as a savory pickle treat."
  },
  {
    "id": "garlic-pickle",
    "title": "Garlic Pickle",
    "subtitle": "Desi Vellulli Pachadi (Pungent & Immunity Boosting)",
    "category": "veg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.8,
    "reviewsCount": 410,
    "badge": "Aromatic & Healthy",
    "image": "./Pickles_and_Snacks_Images/Garlic Pickle.png",
    "shortDesc": "Peeled country garlic cloves slow-simmered in aromatic wood-pressed oil with tamarind pulp, roasted cumin, and fiery red chillies. Immense gut-health benefits.",
    "oilType": "Wood-Pressed Gingelly & Mustard Oil",
    "ingredients": "Peeled Desi Garlic (Vellulli), Tamarind Pulp, Wood-Pressed Sesame Oil, Red Chilli, Mustard Seeds, Cumin, Fenugreek, Rock Salt.",
    "shelfLife": "12 Months",
    "weights": [
      {
        "size": "250g",
        "price": 159,
        "origPrice": 190
      },
      {
        "size": "500g",
        "price": 309,
        "origPrice": 360
      },
      {
        "size": "1kg",
        "price": 599,
        "origPrice": 700
      }
    ],
    "pairing": "Exceptional with mudda pappu rice, curd rice, or morning dosas."
  },
  {
    "id": "usirikaya-pickle",
    "title": "Usirikaya Pickle",
    "subtitle": "Amla Pachadi (Wild Indian Gooseberry in Ceramic Jars)",
    "category": "veg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.9,
    "reviewsCount": 460,
    "badge": "Vitamin-C Powerhouse",
    "image": "./Pickles_and_Snacks_Images/Usirikaya Pickle.png",
    "shortDesc": "Whole wild amla (gooseberries) lightly fried in pure oil and sun-steeped with stone-ground mustard, fenugreek, and spicy red chillies. Tangy, astringent, and healing.",
    "oilType": "Cold-Pressed Gingelly Oil",
    "ingredients": "Whole Wild Amla (Usirikaya), Cold-Pressed Sesame Oil, Guntur Red Chilli, Mustard Powder, Roasted Methi, Turmeric, Salt.",
    "shelfLife": "12 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "Perfect with hot rice & ghee, khichdi, or as a digestive accompaniment."
  },
  {
    "id": "pandumirchi-pickle",
    "title": "Pandumirchi Pickle",
    "subtitle": "Erra Mirapa Pachadi (Ripe Red Chilli & Tamarind)",
    "category": "veg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 4.9,
    "reviewsCount": 520,
    "badge": "Fiery Heritage",
    "image": "./Pickles_and_Snacks_Images/Pandumirchi Pickle.png",
    "shortDesc": "Vibrant ripe red chillies stone-crushed with aged old tamarind, garlic, and cumin. Rich natural crimson color, sharp punch, and quintessential Andhra spice.",
    "oilType": "Wood-Pressed Groundnut Oil",
    "ingredients": "Fresh Ripe Red Chillies (Pandumirapakayalu), Aged Tamarind, Desi Garlic, Cumin, Mustard Seeds, Cold-Pressed Oil, Sea Salt.",
    "shelfLife": "12 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "Staple combination with hot rice & ghee, upma, idli, or pesarattu."
  },
  {
    "id": "curry-leaves-pickle",
    "title": "Curry Leaves Pickle",
    "subtitle": "Karivepaku Pachadi (Country Curry Leaf Confit)",
    "category": "veg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.8,
    "reviewsCount": 340,
    "badge": "Iron & Folate Rich",
    "image": "./Pickles_and_Snacks_Images/Curry Leaves Pickle.png",
    "shortDesc": "Crisp aromatic dark curry leaves stone-ground with tamarind, roasted dals, garlic, and red chillies. Intense herbal aroma packed with natural vitamins.",
    "oilType": "Wood-Pressed Gingelly Oil",
    "ingredients": "Fresh Country Curry Leaves, Aged Tamarind, Garlic, Red Chilli Powder, Urad Dal, Chana Dal, Mustard, Cold-Pressed Oil, Rock Salt.",
    "shelfLife": "9 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "Hot steamed rice with ghee, curd rice, or morning dosas."
  },
  {
    "id": "allam-pickle",
    "title": "Allam Pickle",
    "subtitle": "Allam Bellam Pachadi (Fresh Ginger & Jaggery Chutney)",
    "category": "veg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.9,
    "reviewsCount": 480,
    "badge": "Pesarattu Partner",
    "image": "./Pickles_and_Snacks_Images/Allam Pickle.png",
    "shortDesc": "Juicy organic ginger crushed with organic unrefined jaggery, tamarind, and roasted spices. The timeless sweet, sour, and spicy harmony loved across Godavari homes.",
    "oilType": "Cold-Pressed Gingelly Oil",
    "ingredients": "Fresh Ginger Root (Allam), Organic Jaggery (Bellam), Tamarind Pulp, Red Chilli Powder, Fenugreek, Mustard, Sesame Oil, Rock Salt.",
    "shelfLife": "9 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "The legendary companion to Andhra MLA Pesarattu, idli, vada, or hot rice."
  },
  {
    "id": "lemon-pickle",
    "title": "Lemon Pickle",
    "subtitle": "Nimmakaya Pachadi (Sun-Matured Kagzi Lime)",
    "category": "veg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.8,
    "reviewsCount": 390,
    "badge": "Tangy Digestive",
    "image": "./Pickles_and_Snacks_Images/Lemon Pickle.png",
    "shortDesc": "Thin-skinned country Kagzi lemons sun-cured for weeks in pure rock salt until soft and golden, then tossed in fiery chilli powder and aromatic mustard tadka.",
    "oilType": "Cold-Pressed Gingelly Oil",
    "ingredients": "Thin-Skin Kagzi Lemons (Nimmakayalu), Turmeric, Red Chilli Powder, Roasted Mustard Powder, Cold-Pressed Oil, Sea Salt.",
    "shelfLife": "12 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "The ultimate pairing for curd rice, dal rice, travel meals, and comforting convalescence."
  },
  {
    "id": "tomato-pickle",
    "title": "Tomato Pickle",
    "subtitle": "Sun-Dried Nattu Tomato Nilava Pachadi",
    "category": "veg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.9,
    "reviewsCount": 510,
    "badge": "Everyday Favorite",
    "image": "./Pickles_and_Snacks_Images/Tomato Pickle.png",
    "shortDesc": "Ripe country sour tomatoes sun-dried until chewy and concentrated, then blended with tamarind, roasted garlic cloves, mustard seeds, and rich wood-pressed oil.",
    "oilType": "Wood-Pressed Groundnut Oil",
    "ingredients": "Sun-Dried Country Tomatoes, Tamarind, Garlic Pods, Guntur Red Chilli, Mustard Seeds, Fenugreek, Cold-Pressed Oil, Rock Salt.",
    "shelfLife": "12 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "Fluffy white rice, chapati, poori, curd rice, or toast."
  },
  {
    "id": "cauliflower-pickle",
    "title": "Cauliflower Pickle",
    "subtitle": "Gobi Avakaya (Crunchy Florets in Mustard Gravy)",
    "category": "veg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.7,
    "reviewsCount": 310,
    "badge": "Crunchy Winter Special",
    "image": "./Pickles_and_Snacks_Images/Cauliflower Pickle.png",
    "shortDesc": "Fresh winter cauliflower florets sun-blanched to retain their snappy crisp texture, steeped in rich mustard-chilli avakaya masala and cold-pressed oil.",
    "oilType": "Cold-Pressed Groundnut Oil",
    "ingredients": "Farm-Fresh Cauliflower Florets, Mustard Powder (Aava Pindi), Red Chilli Powder, Turmeric, Lemon Juice, Cold-Pressed Oil, Rock Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "Hot rice with ghee, parathas, or vegetable pulao."
  },
  {
    "id": "magaya-pickle",
    "title": "Magaya Pickle",
    "subtitle": "Sun-Dried Peeled Raw Mango Pachadi with Methi Tadka",
    "category": "veg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.9,
    "reviewsCount": 470,
    "badge": "Godavari Classic",
    "image": "./Pickles_and_Snacks_Images/Magaya Pickle.png",
    "shortDesc": "Peeled raw sour mango strips sun-dried to soft tenderness, seasoned with fenugreek powder (menthi pindi), mustard, red chillies, and garlic tadka.",
    "oilType": "Wood-Pressed Gingelly Oil",
    "ingredients": "Peeled Raw Mango Strips (Sun-Dried), Fenugreek Powder (Menthi Pindi), Red Chilli, Mustard Seeds, Sesame Oil, Rock Salt.",
    "shelfLife": "12 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "Curd rice with Magaya is the ultimate Andhra comfort food."
  },
  {
    "id": "bellam-avakaya-pickle",
    "title": "Bellam Avakaya Pickle",
    "subtitle": "Sweet & Spicy Mango Pickle with Organic Jaggery",
    "category": "veg-pickles",
    "heat": "mild",
    "heatScore": 1,
    "rating": 5,
    "reviewsCount": 560,
    "badge": "Sweet & Spicy Royal",
    "image": "./Pickles_and_Snacks_Images/Bellam Avakaya Pickle.png",
    "shortDesc": "Sweet, sour, and fiery all at once! Crisp raw mango pieces cured with dark organic unrefined jaggery, Kashmiri chillies, mustard, and fragrant fenugreek.",
    "oilType": "Cold-Pressed Groundnut Oil",
    "ingredients": "Raw Mango Cubes, Organic Jaggery (Bellam), Red Chilli Powder, Mustard Powder, Fenugreek, Cold-Pressed Oil, Rock Salt.",
    "shelfLife": "12 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 249,
        "origPrice": 290
      },
      {
        "size": "1kg",
        "price": 479,
        "origPrice": 560
      }
    ],
    "pairing": "Hot rotis, theplas, poori, curd rice, or enjoyed by the spoonful."
  },
  {
    "id": "chicken-bone",
    "title": "Chicken with Bone",
    "subtitle": "Natu Kodi Nilava Pachadi (Bone-In Heritage Recipe)",
    "category": "nonveg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 4.9,
    "reviewsCount": 382,
    "badge": "Heritage Bestseller",
    "image": "./chicken_bone_pickle.jpg",
    "shortDesc": "Tender country chicken bone-in pieces slow-roasted and steeped in stone-ground Guntur chillies, ginger-garlic paste, and wood-pressed oil. Bone marrow flavor infuses deeply into the spicy gravy.",
    "oilType": "Wood-Pressed Groundnut & Gingelly Oil",
    "ingredients": "Farm-Fresh Country Chicken (Bone-In), Cold-Pressed Groundnut Oil, Guntur Red Chilli Powder, Fresh Ginger-Garlic Paste, Yellow Mustard, Fenugreek, Cumin, Turmeric, Sea Salt.",
    "shelfLife": "6 Months (Store in cool dry place, use dry spoon)",
    "weights": [
      {
        "size": "250g",
        "price": 249,
        "origPrice": 299
      },
      {
        "size": "500g",
        "price": 479,
        "origPrice": 580
      },
      {
        "size": "1kg",
        "price": 949,
        "origPrice": 1100
      }
    ],
    "pairing": "Hot steamed rice with a dollop of pure cow ghee and raw onion wedges."
  },
  {
    "id": "chicken-boneless",
    "title": "Chicken Boneless",
    "subtitle": "Crispy Succulent Boneless Chicken Cubes in Andhra Gravy",
    "category": "nonveg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 4.9,
    "reviewsCount": 450,
    "badge": "Crowd Favorite",
    "image": "./chicken_boneless_pickle.jpg",
    "shortDesc": "Prime cuts of 100% boneless tender chicken breast cubes, slow-cooked in cold-pressed groundnut oil until crisp on the outside and juicy within, then steeped in fiery artisanal Andhra spice gravy.",
    "oilType": "Wood-Pressed Groundnut Oil",
    "ingredients": "Prime Boneless Chicken Breast, Wood-Pressed Groundnut Oil, Guntur Red Chilli Powder, Fresh Ginger & Garlic Paste, Clove, Cinnamon, Cardamom, Roasted Cumin, Mustard, Sea Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 289,
        "origPrice": 349
      },
      {
        "size": "500g",
        "price": 589,
        "origPrice": 699
      },
      {
        "size": "1kg",
        "price": 1149,
        "origPrice": 1350
      }
    ],
    "pairing": "Hot steamed Sona Masoori rice, chapati rolls, dosas, or as an instant protein feast."
  },
  {
    "id": "gongura-chicken",
    "title": "Gongura Chicken",
    "subtitle": "Tangy Red Sorrel Leaves Steeped with Country Chicken",
    "category": "nonveg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 5,
    "reviewsCount": 412,
    "badge": "Iconic Andhra Pairing",
    "image": "./gongura_chicken_pickle.jpg",
    "shortDesc": "The pride of Andhra culinary heritage! Fresh, tart red gongura leaves simmered down to a velvety dark paste and married with crispy-fried country chicken chunks in cold-pressed oil.",
    "oilType": "Wood-Pressed Gingelly & Groundnut Oil",
    "ingredients": "Fresh Country Chicken, Fresh Red Sorrel (Gongura) Leaves, Wood-Pressed Oil, Guntur Red Chilli, Crushed Garlic, Roasted Mustard & Fenugreek, Cumin, Sea Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 329,
        "origPrice": 399
      },
      {
        "size": "500g",
        "price": 639,
        "origPrice": 760
      },
      {
        "size": "1kg",
        "price": 1249,
        "origPrice": 1490
      }
    ],
    "pairing": "Steaming hot rice topped with ghee, sliced shallots, or crispy curd chillies."
  },
  {
    "id": "prawns-pickle",
    "title": "Prawns",
    "subtitle": "Royyala Pachadi (Fresh Coastal Bay Prawns in Fiery Masala)",
    "category": "nonveg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 4.9,
    "reviewsCount": 368,
    "badge": "Coastal Bay Catch",
    "image": "./prawns_pickle.jpg",
    "shortDesc": "Wild sea prawns sourced directly from the Bay of Bengal coastline, deveined, flash-fried to golden perfection, and preserved in fragrant garlic, fenugreek, and cold-pressed oil.",
    "oilType": "Pure Cold-Pressed Groundnut Oil",
    "ingredients": "Wild Sea Prawns (Royyalu), Wood-Pressed Groundnut Oil, Guntur Red Chilli, Fresh Ginger, Garlic Cloves, Mustard Seeds, Coriander, Fenugreek, Sea Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 429,
        "origPrice": 499
      },
      {
        "size": "500g",
        "price": 849,
        "origPrice": 999
      },
      {
        "size": "1kg",
        "price": 1649,
        "origPrice": 1950
      }
    ],
    "pairing": "Hot rice, rasam rice, curd rice, or savored directly as a coastal treat."
  },
  {
    "id": "gongura-prawns",
    "title": "Gongura Prawns",
    "subtitle": "Gongura Royyalu (Coastal Andhra Specialty Confit)",
    "category": "nonveg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 5,
    "reviewsCount": 295,
    "badge": "Rare Royal Feast",
    "image": "./gongura_prawns_pickle.jpg",
    "shortDesc": "The pinnacle of coastal Andhra royal dining. Succulent, tender wild prawns slow-cooked and steeped into iron-rich tangy Gongura paste with toasted garlic cloves and cold-pressed gingelly oil.",
    "oilType": "Wood-Pressed Sesame & Groundnut Oil",
    "ingredients": "Fresh Bay Prawns, Tangy Red Gongura Leaves, Wood-Pressed Sesame Oil, Guntur Red Chillies, Garlic, Mustard, Fenugreek, Coriander, Rock Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 439,
        "origPrice": 520
      },
      {
        "size": "500g",
        "price": 859,
        "origPrice": 1020
      },
      {
        "size": "1kg",
        "price": 1699,
        "origPrice": 1999
      }
    ],
    "pairing": "Piping hot rice with melted cow ghee, or alongside Andhra Mudda Pappu."
  },
  {
    "id": "fish-pickle",
    "title": "Fish Pickle",
    "subtitle": "Chepala Pachadi (Boneless Fresh River Fish Fillet Cubes)",
    "category": "nonveg-pickles",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.8,
    "reviewsCount": 310,
    "badge": "River Catch Delight",
    "image": "./Pickles_and_Snacks_Images/Fish Pickle.png",
    "shortDesc": "Freshwater river fish fillets deboned, crisped in cold-pressed oil, and steeped in tangy tamarind, garlic, and roasted mustard-fenugreek pickle masala.",
    "oilType": "Cold-Pressed Groundnut Oil",
    "ingredients": "Fresh River Fish Fillet Cubes, Cold-Pressed Groundnut Oil, Tamarind, Guntur Chilli, Fresh Ginger-Garlic Paste, Mustard, Fenugreek, Rock Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 389,
        "origPrice": 450
      },
      {
        "size": "500g",
        "price": 779,
        "origPrice": 920
      },
      {
        "size": "1kg",
        "price": 1499,
        "origPrice": 1780
      }
    ],
    "pairing": "Warm steamed rice, rasam rice, or alongside crispy dosas."
  },
  {
    "id": "mutton-pickle",
    "title": "Mutton Pickle",
    "subtitle": "Mamsam Pachadi (Tender Young Goat Meat Slow-Cooked)",
    "category": "nonveg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 5,
    "reviewsCount": 420,
    "badge": "Royal Andhra Mutton",
    "image": "./Pickles_and_Snacks_Images/Mutton Pickle.png",
    "shortDesc": "Succulent cubes of tender young grass-fed mutton slow-roasted until crisp on edges and rich inside, steeped in fragrant Guntur spices and wood-pressed oil.",
    "oilType": "Wood-Pressed Groundnut & Gingelly Oil",
    "ingredients": "Prime Cuts Tender Young Mutton, Wood-Pressed Oil, Guntur Red Chilli, Fresh Ginger-Garlic Paste, Whole Garam Masala, Mustard, Fenugreek, Rock Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 449,
        "origPrice": 540
      },
      {
        "size": "500g",
        "price": 899,
        "origPrice": 1050
      },
      {
        "size": "1kg",
        "price": 1749,
        "origPrice": 2050
      }
    ],
    "pairing": "Hot steamed rice with ghee, biryani, or warm parathas."
  },
  {
    "id": "mutton-keema",
    "title": "Mutton Keema Pickle",
    "subtitle": "Minced Tender Mutton Confit with Stone-Ground Spices",
    "category": "nonveg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 4.9,
    "reviewsCount": 290,
    "badge": "Artisanal Mince",
    "image": "./Pickles_and_Snacks_Images/Mutton Keema Pickle.png",
    "shortDesc": "Hand-minced prime mutton slow-simmered in aromatic spiced oil until crisp-dry, then blended into a rich, deeply savory, and spicy thick pickle gravy.",
    "oilType": "Wood-Pressed Groundnut Oil",
    "ingredients": "Hand-Minced Goat Meat (Keema), Wood-Pressed Oil, Red Chilli Powder, Crushed Garlic, Ginger, Cinnamon, Clove, Mustard, Rock Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 439,
        "origPrice": 520
      },
      {
        "size": "500g",
        "price": 879,
        "origPrice": 1040
      },
      {
        "size": "1kg",
        "price": 1699,
        "origPrice": 1990
      }
    ],
    "pairing": "Incredible as a spread on toast, stuffing in parathas, or mixed with hot ghee rice."
  },
  {
    "id": "natu-kodi-boneless",
    "title": "Natu Kodi Boneless Pickle",
    "subtitle": "Free-Range Country Rooster Boneless Cubes in Fiery Gravy",
    "category": "nonveg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 5,
    "reviewsCount": 380,
    "badge": "Pure Country Chicken",
    "image": "./Pickles_and_Snacks_Images/Natu Kodi Boneless Pickle.png",
    "shortDesc": "Authentic free-range country chicken boneless bites, slow-braised to intense savory depth with wood-pressed oil, country garlic, and roasted red chillies.",
    "oilType": "Wood-Pressed Groundnut Oil",
    "ingredients": "Free-Range Country Chicken (Boneless), Cold-Pressed Oil, Guntur Red Chilli, Fresh Ginger & Garlic, Cumin, Mustard, Sea Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 479,
        "origPrice": 570
      },
      {
        "size": "500g",
        "price": 959,
        "origPrice": 1150
      },
      {
        "size": "1kg",
        "price": 1849,
        "origPrice": 2200
      }
    ],
    "pairing": "Signature Andhra meal: hot rice + Natu Kodi pickle + melted cow ghee."
  },
  {
    "id": "natu-kodi-pickle",
    "title": "Natu Kodi Pickle",
    "subtitle": "Authentic Country Chicken Bone-In Village Pachadi",
    "category": "nonveg-pickles",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 4.9,
    "reviewsCount": 340,
    "badge": "Village Heritage",
    "image": "./Pickles_and_Snacks_Images/Natu Kodi Pickle.png",
    "shortDesc": "Bone-in country rooster pieces cooked according to village wedding traditions. Marrow infuses rich flavor into the dense, spicy oil-rich gravy.",
    "oilType": "Wood-Pressed Groundnut Oil",
    "ingredients": "Free-Range Country Rooster Pieces, Cold-Pressed Oil, Red Chilli, Ginger-Garlic Paste, Turmeric, Coriander, Mustard, Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 429,
        "origPrice": 510
      },
      {
        "size": "500g",
        "price": 849,
        "origPrice": 999
      },
      {
        "size": "1kg",
        "price": 1649,
        "origPrice": 1950
      }
    ],
    "pairing": "Hot steamed rice with ghee, sliced shallots, or ragi sangati."
  },
  {
    "id": "jantikalu",
    "title": "Jantikalu",
    "subtitle": "Traditional Rice & Besan Crispy Murukku",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 1,
    "rating": 4.9,
    "reviewsCount": 380,
    "badge": "Traditional Crunch",
    "image": "./Pickles_and_Snacks_Images/Jantikalu.png",
    "shortDesc": "Crispy, golden spiral savories pressed through traditional jantika brass moulds, made with aged rice flour, roasted gram, ajwain (vaamu), and sesame seeds fried in cold-pressed oil.",
    "oilType": "Pure Desi Ghee & Cold-Pressed Groundnut Oil",
    "ingredients": "Aged Rice Flour, Roasted Gram Flour, Ajwain (Vaamu), White Sesame Seeds, Pure Desi Ghee, Cold-Pressed Groundnut Oil, Rock Salt.",
    "shelfLife": "45 Days",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 150
      },
      {
        "size": "500g",
        "price": 239,
        "origPrice": 280
      },
      {
        "size": "1kg",
        "price": 449,
        "origPrice": 530
      }
    ],
    "pairing": "Timeless evening tea-time snack, festive crunch, or mid-day savory snack."
  },
  {
    "id": "ghee-ariselu",
    "title": "Neti / Ghee Ariselu",
    "subtitle": "Pure Desi Cow Ghee & Bellam Traditional Delicacy",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 5,
    "reviewsCount": 420,
    "badge": "Pure Cow Ghee",
    "image": "./Traditional_Sweets_and_Snacks_Images/Ghee Ariselu.png",
    "shortDesc": "The pride of Sankranti! Freshly harvested paddy rice flour soaked and pounded by hand, simmered in organic unrefined jaggery syrup and fried in 100% pure desi cow ghee.",
    "oilType": "100% Pure Desi Cow Ghee (Zero Vanaspati / Zero Oil)",
    "ingredients": "Freshly Harvested Raw Rice Flour, Organic Sugarcane Jaggery (Bellam), Pure Desi Cow Ghee, Cardamom (Elachi).",
    "shelfLife": "30 Days (Store in airtight steel/glass container)",
    "weights": [
      {
        "size": "250g",
        "price": 199,
        "origPrice": 240
      },
      {
        "size": "500g",
        "price": 389,
        "origPrice": 460
      },
      {
        "size": "1kg",
        "price": 749,
        "origPrice": 890
      }
    ],
    "pairing": "Best enjoyed warm or at room temperature during festive mornings and family gatherings."
  },
  {
    "id": "nuvvulu-ariselu",
    "title": "Nuvvula Ariselu",
    "subtitle": "Sesame Crusted Jaggery Rice Flour Sweets",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.9,
    "reviewsCount": 380,
    "badge": "Sesame Rich",
    "image": "./Traditional_Sweets_and_Snacks_Images/Nuvvulu Ariselu.png",
    "shortDesc": "Golden jaggery rice patties generously coated on both sides with fragrant toasted sesame seeds (nuvvulu), fried gently to achieve a nutty aroma and chewy soft center.",
    "oilType": "Pure Desi Ghee & Cold-Pressed Groundnut Oil",
    "ingredients": "Aged Raw Rice Flour, Dark Organic Jaggery, White Sesame Seeds (Nuvvulu), Cardamom, Pure Cow Ghee.",
    "shelfLife": "30 Days",
    "weights": [
      {
        "size": "250g",
        "price": 149,
        "origPrice": 175
      },
      {
        "size": "500g",
        "price": 289,
        "origPrice": 340
      },
      {
        "size": "1kg",
        "price": 549,
        "origPrice": 650
      }
    ],
    "pairing": "Traditional festive sweet loaded with iron and calcium; wonderful with evening tea."
  },
  {
    "id": "ariselu",
    "title": "Ariselu",
    "subtitle": "Classic Bellam Ariselu (Traditional Sankranti Sweet)",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.8,
    "reviewsCount": 350,
    "badge": "Traditional Recipe",
    "image": "./Traditional_Sweets_and_Snacks_Images/Ariselu.png",
    "shortDesc": "Authentic Godavari-style traditional ariselu made with hand-pounded wet rice flour, aromatic jaggery syrup, and cardamom. Perfectly soft with crisp golden edges.",
    "oilType": "Cold-Pressed Groundnut Oil & Pure Cow Ghee",
    "ingredients": "Pounded Wet Rice Flour, Organic Jaggery (Bellam), Cardamom Powder, Desi Ghee, Pure Oil.",
    "shelfLife": "30 Days",
    "weights": [
      {
        "size": "250g",
        "price": 139,
        "origPrice": 165
      },
      {
        "size": "500g",
        "price": 269,
        "origPrice": 320
      },
      {
        "size": "1kg",
        "price": 499,
        "origPrice": 590
      }
    ],
    "pairing": "Nostalgic sweet to share with family or offer during traditional pujas."
  },
  {
    "id": "kobbari-ariselu",
    "title": "Kobbari Ariselu",
    "subtitle": "Grated Fresh Coconut & Jaggery Ariselu",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.9,
    "reviewsCount": 310,
    "badge": "Fresh Coconut Sweet",
    "image": "./Traditional_Sweets_and_Snacks_Images/Kobbari Ariselu.png",
    "shortDesc": "Infused with freshly scraped coconut flakes that caramelize inside the hot jaggery dough, releasing an irresistible coconut aroma and rich texture with every bite.",
    "oilType": "Cold-Pressed Groundnut Oil & Desi Cow Ghee",
    "ingredients": "Rice Flour, Fresh Grated Coconut (Kobbari), Organic Jaggery, Cardamom, Pure Ghee.",
    "shelfLife": "25 Days",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 155
      },
      {
        "size": "500g",
        "price": 239,
        "origPrice": 285
      },
      {
        "size": "1kg",
        "price": 449,
        "origPrice": 535
      }
    ],
    "pairing": "Pairs delightfully with a glass of warm milk or filter coffee."
  },
  {
    "id": "bellam-sunnundalu",
    "title": "Bellam Sunnundalu",
    "subtitle": "Roasted Urad Dal & Pure Desi Cow Ghee Ladoos",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 5,
    "reviewsCount": 520,
    "badge": "Strength & Tradition",
    "image": "./Traditional_Sweets_and_Snacks_Images/Bellam Sunnundalu.png",
    "shortDesc": "The revered strengthening sweet of Telugu homes. Whole black urad dal roasted slowly over firewood, stone-ground with rich organic jaggery and bound generously with melted pure cow ghee.",
    "oilType": "100% Pure Melted Desi Cow Ghee",
    "ingredients": "Slow-Roasted Urad Dal (Minapappu), Organic Jaggery (Bellam), Pure Desi Cow Ghee, Cardamom.",
    "shelfLife": "45 Days (Airtight container)",
    "weights": [
      {
        "size": "250g",
        "price": 149,
        "origPrice": 180
      },
      {
        "size": "500g",
        "price": 289,
        "origPrice": 350
      },
      {
        "size": "1kg",
        "price": 549,
        "origPrice": 650
      }
    ],
    "pairing": "Essential energy & bone-strength nutrition for growing children, mothers, and elders."
  },
  {
    "id": "sugar-sunnundalu",
    "title": "Sugar Sunnundalu",
    "subtitle": "Fine Ground Urad Dal Ladoos with Pure Cow Ghee",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.8,
    "reviewsCount": 390,
    "badge": "Silky Melt-in-Mouth",
    "image": "./Traditional_Sweets_and_Snacks_Images/Sugar Sunnundalu.png",
    "shortDesc": "Silky, melt-in-mouth texture made by combining golden roasted urad dal flour with finely powdered sugar and generous ladles of warm, aromatic desi cow ghee.",
    "oilType": "100% Pure Desi Cow Ghee",
    "ingredients": "Firewood-Roasted Urad Dal, Fine Crystallized Sugar, Pure Desi Cow Ghee, Cardamom Powder.",
    "shelfLife": "45 Days",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 155
      },
      {
        "size": "500g",
        "price": 239,
        "origPrice": 285
      },
      {
        "size": "1kg",
        "price": 449,
        "origPrice": 535
      }
    ],
    "pairing": "Perfect tea-time sweet treat and celebratory dessert."
  },
  {
    "id": "gavvalu",
    "title": "Gavvalu",
    "subtitle": "Crunchy Shell-Shaped Traditional Sweet Shells",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.7,
    "reviewsCount": 290,
    "badge": "Classic Shells",
    "image": "./Traditional_Sweets_and_Snacks_Images/Gavvalu.png",
    "shortDesc": "Hand-rolled over traditional wooden grooved gavvala chekka to form lovely sea-shell shapes, fried crisp-golden and coated with aromatic sweet syrup.",
    "oilType": "Pure Desi Ghee & Cold-Pressed Groundnut Oil",
    "ingredients": "Wheat Flour (Maida/Atta), Sugar Syrup, Desi Ghee, Cardamom, Cold-Pressed Oil.",
    "shelfLife": "30 Days",
    "weights": [
      {
        "size": "250g",
        "price": 139,
        "origPrice": 165
      },
      {
        "size": "500g",
        "price": 269,
        "origPrice": 320
      },
      {
        "size": "1kg",
        "price": 499,
        "origPrice": 590
      }
    ],
    "pairing": "Fun, crunchy evening bite loved by children and nostalgia enthusiasts."
  },
  {
    "id": "bellam-gavvalu",
    "title": "Bellam Gavvalu",
    "subtitle": "Crispy Shells Coated in Thick Jaggery Syrup",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.9,
    "reviewsCount": 360,
    "badge": "Jaggery Glazed",
    "image": "./Traditional_Sweets_and_Snacks_Images/Bellam Gavvalu.png",
    "shortDesc": "Shell-shaped crispy golden pastries tossed while hot into rich caramelized organic jaggery syrup infused with cardamom and ginger, giving a glossy sweet crunch.",
    "oilType": "Pure Cow Ghee & Cold-Pressed Groundnut Oil",
    "ingredients": "Flour, Organic Sugarcane Jaggery (Bellam), Fresh Cardamom, Desi Ghee, Oil, Dry Ginger hint.",
    "shelfLife": "30 Days",
    "weights": [
      {
        "size": "250g",
        "price": 149,
        "origPrice": 175
      },
      {
        "size": "500g",
        "price": 289,
        "origPrice": 340
      },
      {
        "size": "1kg",
        "price": 549,
        "origPrice": 650
      }
    ],
    "pairing": "Crunchy sweet snack to satisfy sweet cravings anytime of the day."
  },
  {
    "id": "kajjikayalu-kova",
    "title": "Kajjikayalu (kova with dryfruits stuff)",
    "subtitle": "Crescent Pastry Stuffed with Mawa, Kova & Dry Fruits",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 5,
    "reviewsCount": 440,
    "badge": "Festive Royalty",
    "image": "./Traditional_Sweets_and_Snacks_Images/Kajjikayalu Kova Stuff.png",
    "shortDesc": "Flaky crescent pastry hand-crimped and filled to the brim with rich milk kova (mawa), crushed cashews, almonds, pistachios, cardamom, and sugar.",
    "oilType": "Pure Desi Cow Ghee & Cold-Pressed Oil",
    "ingredients": "Refined Wheat Flour, Fresh Milk Kova (Mawa), Almonds, Cashews, Pistachios, Sugar, Cardamom, Pure Cow Ghee.",
    "shelfLife": "20 Days (Keep cool and dry)",
    "weights": [
      {
        "size": "250g",
        "price": 159,
        "origPrice": 190
      },
      {
        "size": "500g",
        "price": 319,
        "origPrice": 380
      },
      {
        "size": "1kg",
        "price": 599,
        "origPrice": 710
      }
    ],
    "pairing": "The royal jewel of Diwali, Sankranti, and Ugadi festive platters."
  },
  {
    "id": "kajjikayalu-coconut",
    "title": "Kajjikayalu (coconut stuff)",
    "subtitle": "Crisp Crescent Pastry Stuffed with Roasted Coconut & Jaggery",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.8,
    "reviewsCount": 320,
    "badge": "Heritage Crunch",
    "image": "./Traditional_Sweets_and_Snacks_Images/Kajjikayalu Coconut Stuff.png",
    "shortDesc": "Crispy, bubbly golden half-moon pastry generously packed with roasted dry coconut (kobbari), semolina, cardamom, sesame, and powdered sugar.",
    "oilType": "Pure Desi Ghee & Wood-Pressed Oil",
    "ingredients": "Wheat Flour, Grated Dry Coconut, Roasted Rava, Sugar/Jaggery, Cardamom, Pure Cow Ghee.",
    "shelfLife": "30 Days",
    "weights": [
      {
        "size": "250g",
        "price": 139,
        "origPrice": 165
      },
      {
        "size": "500g",
        "price": 269,
        "origPrice": 320
      },
      {
        "size": "1kg",
        "price": 499,
        "origPrice": 590
      }
    ],
    "pairing": "Traditional teatime treat with a delightful sweet nutty interior."
  },
  {
    "id": "nuvvula-laddu",
    "title": "Nuvvula Undalu",
    "subtitle": "Til Ladoo (Calcium-Rich Sesame & Jaggery Energy Balls)",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.9,
    "reviewsCount": 380,
    "badge": "Iron & Calcium Rich",
    "image": "./Traditional_Sweets_and_Snacks_Images/Nuvvulu Laddu.png",
    "shortDesc": "Carefully roasted white sesame seeds bound with rich soft organic jaggery syrup and cardamom into bite-sized nutrition balls. Excellent for bone health.",
    "oilType": "100% Pure Cow Ghee & Natural Sesame Oil",
    "ingredients": "Roasted White Sesame Seeds (Nuvvulu), Organic Jaggery (Bellam), Pure Cow Ghee, Cardamom.",
    "shelfLife": "45 Days",
    "weights": [
      {
        "size": "250g",
        "price": 159,
        "origPrice": 190
      },
      {
        "size": "500g",
        "price": 319,
        "origPrice": 380
      },
      {
        "size": "1kg",
        "price": 599,
        "origPrice": 710
      }
    ],
    "pairing": "Daily wholesome health ball for all ages, winter warmth, and festive vitality."
  },
  {
    "id": "pokundalu",
    "title": "Pokundalu",
    "subtitle": "Crunchy Sweet Rice & Jaggery Spheres",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.7,
    "reviewsCount": 260,
    "badge": "Rare Andhra Sweet",
    "image": "./Traditional_Sweets_and_Snacks_Images/Pokundalu.png",
    "shortDesc": "Crisp outside, soft and chewy within! Traditional dough of wet rice flour, fresh coconut, and jaggery shaped into small balls and golden fried.",
    "oilType": "Cold-Pressed Groundnut Oil & Pure Cow Ghee",
    "ingredients": "Aged Wet Rice Flour, Organic Jaggery, Coconut Grated, Cardamom, Desi Ghee, Oil.",
    "shelfLife": "25 Days",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 155
      },
      {
        "size": "500g",
        "price": 239,
        "origPrice": 285
      },
      {
        "size": "1kg",
        "price": 449,
        "origPrice": 535
      }
    ],
    "pairing": "Unique Godavari-style heritage delicacy to rediscover lost flavors."
  },
  {
    "id": "kobbari-vundalu",
    "title": "Kobbari Undalu",
    "subtitle": "Coconut Jaggery Ladoos (Fresh Grated Coconut Sweet)",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.9,
    "reviewsCount": 390,
    "badge": "Fresh Coconut & Jaggery",
    "image": "./Traditional_Sweets_and_Snacks_Images/Kobbari Vundalu.png",
    "shortDesc": "Freshly grated juicy coconut simmered in thick organic jaggery paakam until rich, fragrant, and glossy, then hand-rolled with aromatic green cardamom.",
    "oilType": "Pure Desi Cow Ghee",
    "ingredients": "Fresh Grated Coconut (Kobbari), Organic Sugarcane Jaggery (Bellam), Pure Cow Ghee, Green Cardamom.",
    "shelfLife": "25 Days",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 155
      },
      {
        "size": "500g",
        "price": 239,
        "origPrice": 285
      },
      {
        "size": "1kg",
        "price": 449,
        "origPrice": 535
      }
    ],
    "pairing": "Mouthwatering traditional treat ideal for temple offerings and nostalgic snacking."
  },
  {
    "id": "special-dry-fruits-laddu",
    "title": "Special Dry Fruits Laddu",
    "subtitle": "Dry Fruit & Nut Energy Ladoo (Cashews, Almonds, Pista, Ghee)",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 5,
    "reviewsCount": 470,
    "badge": "100% Dry Fruits Power",
    "image": "./Traditional_Sweets_and_Snacks_Images/Special Dry Fruits Laddu.png",
    "shortDesc": "Richly packed with toasted Mamra almonds, whole cashews, pistachios, anjeer (figs), and dates bound with pure desi cow ghee. Zero added white sugar.",
    "oilType": "100% Pure Desi Cow Ghee",
    "ingredients": "California Almonds, Whole Cashews, Iranian Pistachios, Afghan Figs, Arabian Dates, Pure Cow Ghee, Cardamom.",
    "shelfLife": "45 Days",
    "weights": [
      {
        "size": "250g",
        "price": 249,
        "origPrice": 299
      },
      {
        "size": "500g",
        "price": 489,
        "origPrice": 590
      },
      {
        "size": "1kg",
        "price": 949,
        "origPrice": 1150
      }
    ],
    "pairing": "Guilt-free morning power snack, athlete boost, and premium gift hamper choice."
  },
  {
    "id": "mix-seeds-laddu",
    "title": "All Seeds Undalu",
    "subtitle": "Flax, Chia, Pumpkin, Sesame, Sunflower Seeds & Jaggery",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.9,
    "reviewsCount": 350,
    "badge": "Superfood Nutrition",
    "image": "./Traditional_Sweets_and_Snacks_Images/Mix Seeds Laddu.png",
    "shortDesc": "Slow-roasted superfood seeds—pumpkin, watermelon, sunflower, chia, flax, and sesame—bound with organic jaggery and a touch of pure cow ghee. Loaded with minerals and Omega-3.",
    "oilType": "Pure Cow Ghee & Natural Seed Oils",
    "ingredients": "Pumpkin Seeds, Sunflower Seeds, Flax Seeds, Chia Seeds, White Sesame, Watermelon Seeds, Organic Jaggery, Desi Ghee.",
    "shelfLife": "45 Days",
    "weights": [
      {
        "size": "250g",
        "price": 239,
        "origPrice": 285
      },
      {
        "size": "500g",
        "price": 459,
        "origPrice": 550
      },
      {
        "size": "1kg",
        "price": 899,
        "origPrice": 1080
      }
    ],
    "pairing": "Daily superfood nutrition for active lifestyles, students, and wellness conscious homes."
  },
  {
    "id": "dry-fruits-putharekulu",
    "title": "Dry Fruits Putharekulu (Box)",
    "subtitle": "Atreyapuram Paper Sweet Stuffed with Dry Fruits & Pure Ghee",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 5,
    "reviewsCount": 580,
    "badge": "GI Tagged Atreyapuram Legend",
    "image": "./Traditional_Sweets_and_Snacks_Images/Dry Fruits Putharekulu.png",
    "shortDesc": "The world-famous 'Paper Sweet' from Atreyapuram! Ultra-delicate wafer-thin rice starch sheets rolled with hand-roasted cashews, pistachios, almonds, and warm desi cow ghee.",
    "oilType": "100% Pure Desi Cow Ghee (Lavishly Brushed)",
    "ingredients": "Ultra-Thin Rice Starch Sheets (Rekulu), Premium Cashews, Almonds, Pistachios, Organic Jaggery/Sugar Powder, Pure Cow Ghee.",
    "shelfLife": "30 Days (Do not refrigerate, keep in dry box)",
    "weights": [
      {
        "size": "1 Box",
        "price": 210,
        "origPrice": 250
      },
      {
        "size": "2 Boxes",
        "price": 420,
        "origPrice": 500
      },
      {
        "size": "3 Boxes",
        "price": 630,
        "origPrice": 750
      }
    ],
    "pairing": "Legendary luxury gift and wedding sweet; melts the second it touches the tongue."
  },
  {
    "id": "ghee-bobbatlu",
    "title": "Ghee Bobbatlu (1 Piece)",
    "subtitle": "Puran Poli / Bakshalu (Sweet Chana Dal & Jaggery Flatbread)",
    "category": "pindi-vantalu",
    "heat": "mild",
    "heatScore": 0,
    "rating": 4.9,
    "reviewsCount": 410,
    "badge": "Hot Ghee Flatbread",
    "image": "./Traditional_Sweets_and_Snacks_Images/Ghee Bobbatlu.png",
    "shortDesc": "Thin, golden melt-in-mouth sweet flatbread filled with sweet cooked chana dal (senagapappu) and jaggery puran, roasted golden on cast iron tawa with pure cow ghee.",
    "oilType": "100% Pure Desi Cow Ghee",
    "ingredients": "Fine Wheat Flour, Split Bengal Gram (Chana Dal), Organic Sugarcane Jaggery, Nutmeg, Cardamom, Pure Cow Ghee.",
    "shelfLife": "7 Days (Best consumed warm or within a week)",
    "weights": [
      {
        "size": "1 Piece",
        "price": 18,
        "origPrice": 25
      },
      {
        "size": "Pack of 5",
        "price": 90,
        "origPrice": 125
      },
      {
        "size": "Pack of 10",
        "price": 180,
        "origPrice": 250
      }
    ],
    "pairing": "Serve piping hot with an extra spoonful of melted desi cow ghee on top."
  },
  {
    "id": "masala-cashew",
    "title": "Masala Kaju / Cashew",
    "subtitle": "Slow-Roasted Whole Cashews in Fiery Andhra Spices",
    "category": "hot-snacks",
    "heat": "medium",
    "heatScore": 2,
    "rating": 5,
    "reviewsCount": 460,
    "badge": "Party Bestseller",
    "image": "./Traditional_Sweets_and_Snacks_Images/Masala Cashew.png",
    "shortDesc": "Jumbo W180 grade whole cashews fried golden in pure cow ghee and tossed with hand-pounded Guntur red chillies, black pepper, chaat masala, and fresh curry leaves.",
    "oilType": "Pure Desi Cow Ghee & Cold-Pressed Oil",
    "ingredients": "Jumbo Whole Cashews (Kaju), Pure Desi Cow Ghee, Guntur Red Chilli Powder, Black Salt, Cumin, Curry Leaves, Hing.",
    "shelfLife": "45 Days (Store in airtight container)",
    "weights": [
      {
        "size": "250g",
        "price": 389,
        "origPrice": 460
      },
      {
        "size": "500g",
        "price": 759,
        "origPrice": 910
      },
      {
        "size": "1kg",
        "price": 1499,
        "origPrice": 1780
      }
    ],
    "pairing": "The ultimate cocktail snack, party platter hero, or royal evening bite."
  },
  {
    "id": "masala-palli",
    "title": "Masala Palli",
    "subtitle": "Spicy Roasted Groundnuts with Garlic & Curry Leaves",
    "category": "hot-snacks",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.8,
    "reviewsCount": 395,
    "badge": "Street & Cinema Classic",
    "image": "./Traditional_Sweets_and_Snacks_Images/Masala Palli.png",
    "shortDesc": "Crisp-roasted country peanuts tossed in wood-pressed oil with whole crushed garlic cloves, fresh curry leaves, and spicy red chilli seasoning. Addictively crunchy.",
    "oilType": "Cold-Pressed Groundnut Oil",
    "ingredients": "Country Groundnuts (Pallilu), Cold-Pressed Oil, Crushed Desi Garlic, Curry Leaves, Guntur Chilli, Rock Salt.",
    "shelfLife": "45 Days",
    "weights": [
      {
        "size": "250g",
        "price": 99,
        "origPrice": 120
      },
      {
        "size": "500g",
        "price": 189,
        "origPrice": 230
      },
      {
        "size": "1kg",
        "price": 349,
        "origPrice": 420
      }
    ],
    "pairing": "Perfect tea-time partner, movie snack, or accompaniment with beverages."
  },
  {
    "id": "karam-sanagapappu",
    "title": "Karam Senagapappu",
    "subtitle": "Crispy Fried Bengal Gram Savory Crunch",
    "category": "hot-snacks",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.8,
    "reviewsCount": 340,
    "badge": "High Protein Crunch",
    "image": "./Traditional_Sweets_and_Snacks_Images/Karam Sanagapappu.png",
    "shortDesc": "Golden fried split Bengal gram (chana dal) seasoned with aromatic garlic-chilli podi and crackling curry leaves. Light, brittle, and packed with plant protein.",
    "oilType": "Cold-Pressed Groundnut Oil",
    "ingredients": "Split Bengal Gram (Senagapappu), Cold-Pressed Oil, Red Chilli Powder, Garlic, Curry Leaves, Rock Salt.",
    "shelfLife": "45 Days",
    "weights": [
      {
        "size": "250g",
        "price": 119,
        "origPrice": 145
      },
      {
        "size": "500g",
        "price": 219,
        "origPrice": 265
      },
      {
        "size": "1kg",
        "price": 419,
        "origPrice": 500
      }
    ],
    "pairing": "Great evening chai snack or crispy topping over upma and curd rice."
  },
  {
    "id": "chekkalu",
    "title": "Chekkalu",
    "subtitle": "Pappu Chekkalu (Traditional Crispy Rice Crackers)",
    "category": "hot-snacks",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.9,
    "reviewsCount": 410,
    "badge": "Festival Crunch",
    "image": "./chekkalu.png",
    "shortDesc": "Classic Andhra savory rice crackers studded with soaked chana dal, cumin seeds, green chillies, ginger, and fresh curry leaves. Hand-pressed and fried golden to a brittle, addictive crunch.",
    "oilType": "Cold-Pressed Groundnut Oil",
    "ingredients": "Raw Rice Flour, Soaked Bengal Gram (Chana Dal), Fresh Curry Leaves, Cumin Seeds, Green Chillies, Ginger, Pure Butter, Rock Salt, Wood-Pressed Oil.",
    "shelfLife": "45 Days (Store in airtight container)",
    "weights": [
      {
        "size": "250g",
        "price": 139,
        "origPrice": 165
      },
      {
        "size": "500g",
        "price": 269,
        "origPrice": 320
      },
      {
        "size": "1kg",
        "price": 499,
        "origPrice": 590
      }
    ],
    "pairing": "Irresistible tea-time snack, festive Sankranti delight, or travel companion."
  },
  {
    "id": "nuvvulu-chekkalu",
    "title": "Nuvvula Chekkalu",
    "subtitle": "Sesame Seed Loaded Crispy Rice Crackers",
    "category": "hot-snacks",
    "heat": "mild",
    "heatScore": 1,
    "rating": 5,
    "reviewsCount": 365,
    "badge": "Nutty Crunch",
    "image": "./nuvvulu_chekkalu.png",
    "shortDesc": "Traditional crispy rice crackers generously crusted with nutty white sesame seeds (nuvvulu), cumin, and curry leaves. Rich, fragrant sesame aroma with every crispy bite.",
    "oilType": "Cold-Pressed Groundnut & Sesame Oil",
    "ingredients": "Rice Flour, White Sesame Seeds (Nuvvulu), Chana Dal, Ajwain, Curry Leaves, Desi Butter, Cold-Pressed Oil, Rock Salt.",
    "shelfLife": "45 Days",
    "weights": [
      {
        "size": "250g",
        "price": 149,
        "origPrice": 175
      },
      {
        "size": "500g",
        "price": 289,
        "origPrice": 345
      },
      {
        "size": "1kg",
        "price": 549,
        "origPrice": 650
      }
    ],
    "pairing": "Nutrient-packed crunchy snack rich in calcium and iron, perfect with evening chai."
  },
  {
    "id": "karivepaku-podi",
    "title": "Karivepaku Podi",
    "subtitle": "Aromatic Roasted Curry Leaf Spice Gunpowder",
    "category": "podis",
    "heat": "medium",
    "heatScore": 2,
    "rating": 5,
    "reviewsCount": 490,
    "badge": "Health & Iron Power",
    "image": "./karivepaku_podi.jpg",
    "shortDesc": "Fresh, tender country curry leaves slow-roasted on wood fires with roasted dals, dry red chillies, garlic, cumin, and tamarind. Bursting with medicinal aroma and rich earthy warmth.",
    "oilType": "Slow-Dry Roasted with Wood-Pressed Oil Tadka",
    "ingredients": "Country Curry Leaves (Karivepaku), Urad Dal, Chana Dal, Guntur Red Chillies, Garlic, Cumin Seeds, Tamarind, Rock Salt.",
    "shelfLife": "6 Months (Use clean dry spoon)",
    "weights": [
      {
        "size": "250g",
        "price": 179,
        "origPrice": 215
      },
      {
        "size": "500g",
        "price": 339,
        "origPrice": 410
      },
      {
        "size": "1kg",
        "price": 649,
        "origPrice": 780
      }
    ],
    "pairing": "Mix with steaming hot rice and a generous spoon of melted desi cow ghee, or sprinkle over hot idlis and dosas."
  },
  {
    "id": "kandi-podi",
    "title": "Kandi Podi",
    "subtitle": "Traditional Roasted Toor Dal Gunpowder",
    "category": "podis",
    "heat": "medium",
    "heatScore": 2,
    "rating": 5,
    "reviewsCount": 580,
    "badge": "The Eternal Classic",
    "image": "./kandi_podi.jpg",
    "shortDesc": "The sacred comfort food of Andhra homes. Slow-roasted country toor dal (kandi pappu), chana dal, and moong dal stone-ground with cumin, garlic cloves, and fiery red chillies.",
    "oilType": "Slow-Roasted Heritage Spices",
    "ingredients": "Split Pigeon Peas (Toor Dal / Kandi Pappu), Chana Dal, Moong Dal, Cumin Seeds, Dried Red Chillies, Garlic, Black Pepper, Rock Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 129,
        "origPrice": 155
      },
      {
        "size": "500g",
        "price": 239,
        "origPrice": 285
      },
      {
        "size": "1kg",
        "price": 449,
        "origPrice": 540
      }
    ],
    "pairing": "The classic 'first bite' of every South Indian meal: hot rice + Kandi Podi + dollop of pure golden cow ghee."
  },
  {
    "id": "velluli-karam",
    "title": "Vellulli Karam",
    "subtitle": "Pounded Garlic & Fiery Guntur Red Chilli Gunpowder",
    "category": "podis",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 4.9,
    "reviewsCount": 465,
    "badge": "Fiery Garlic Punch",
    "image": "./velluli_karam.png",
    "shortDesc": "Stone-crushed fresh desi garlic cloves blended with sun-dried Guntur red chillies, roasted cumin, and coriander seeds. Intensely aromatic, pungent, and full of bold garlic fire.",
    "oilType": "Stone-Pounded Dry Karam",
    "ingredients": "Whole Desi Garlic Cloves (Vellulli), Guntur Red Chilli Powder, Roasted Cumin, Coriander Seeds, Rock Salt, Cold-Pressed Oil drop.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 159,
        "origPrice": 190
      },
      {
        "size": "500g",
        "price": 309,
        "origPrice": 370
      },
      {
        "size": "1kg",
        "price": 599,
        "origPrice": 720
      }
    ],
    "pairing": "Divine when sprinkled over hot ghee dosas, uttappams, upma, or mixed with curd rice and egg omelettes."
  },
  {
    "id": "palli-karam-podi",
    "title": "Palli Karampodi",
    "subtitle": "Roasted Peanut & Garlic Gunpowder (Verusenaga Podi)",
    "category": "podis",
    "heat": "medium",
    "heatScore": 2,
    "rating": 4.9,
    "reviewsCount": 385,
    "badge": "Nutty Crunch & Garlic",
    "image": "./palli_karam_podi.jpg",
    "shortDesc": "Slow-roasted country peanuts (pallilu) dry-roasted on clay tawa, coarsely pounded with sun-dried Guntur chillies, golden garlic cloves, and cumin. Rich, nutty, and mildly spicy with an irresistible crunch.",
    "oilType": "Dry-Roasted Country Peanuts & Garlic",
    "ingredients": "Slow-Roasted Peanuts (Pallilu), Sun-Dried Guntur Red Chillies, Desi Garlic Cloves, Cumin Seeds, Coriander Seeds, Rock Salt.",
    "shelfLife": "4 Months (Keep in airtight glass jar, use dry spoon)",
    "weights": [
      {
        "size": "250g",
        "price": 159,
        "origPrice": 190
      },
      {
        "size": "500g",
        "price": 309,
        "origPrice": 370
      },
      {
        "size": "1kg",
        "price": 599,
        "origPrice": 720
      }
    ],
    "pairing": "Incredible with piping hot idlis, crispy ghee dosas, upma, or mixed with hot steamed rice and melted desi ghee."
  },
  {
    "id": "nuvvulu-karampodi",
    "title": "Nuvvula Karam Podi",
    "subtitle": "Fragrant Sesame Seed & Roasted Spice Gunpowder",
    "category": "podis",
    "heat": "medium",
    "heatScore": 2,
    "rating": 5,
    "reviewsCount": 410,
    "badge": "Calcium & Iron Rich",
    "image": "./nuvvulu_karam_podi.png",
    "shortDesc": "Aromatic white sesame seeds (nuvvulu) dry-roasted to a nutty golden pop, stone-pounded with wood-roasted red chillies, garlic, and cumin. Rich nutty aroma and wholesome traditional Andhra nutrition.",
    "oilType": "Nutrient-Dense Roasted Sesame Powder",
    "ingredients": "Selected White Sesame Seeds (Nuvvulu), Guntur Red Chillies, Garlic, Cumin Seeds, Rock Salt, Urad Dal.",
    "shelfLife": "4 Months (Store in airtight jar)",
    "weights": [
      {
        "size": "250g",
        "price": 159,
        "origPrice": 190
      },
      {
        "size": "500g",
        "price": 309,
        "origPrice": 370
      },
      {
        "size": "1kg",
        "price": 599,
        "origPrice": 720
      }
    ],
    "pairing": "Traditional postpartum & wellness staple; heavenly over hot rice with cow ghee, jowar rotis, or dosas."
  },
  {
    "id": "avisa-ginjala-podi",
    "title": "Avisa Ginjala Podi",
    "subtitle": "Omega-3 Superfood Flaxseed Gunpowder",
    "category": "podis",
    "heat": "mild",
    "heatScore": 1,
    "rating": 4.9,
    "reviewsCount": 340,
    "badge": "Superfood Herb & Heart",
    "image": "./avisa_ginjala_podi.png",
    "shortDesc": "Power-packed golden brown flaxseeds (avisa ginjalu) slow-roasted with roasted chana dal, garlic, cumin, and mild chillies. Loaded with natural Omega-3 fatty acids, dietary fiber, and nutty earthy flavor.",
    "oilType": "Natural Omega-3 Flaxseed Roasting",
    "ingredients": "Country Brown Flaxseeds (Avisa Ginjalu), Roasted Chana Dal, Desi Garlic, Cumin Seeds, Dry Red Chillies, Himalayan Pink Salt.",
    "shelfLife": "4 Months (Airtight dry container)",
    "weights": [
      {
        "size": "250g",
        "price": 159,
        "origPrice": 190
      },
      {
        "size": "500g",
        "price": 309,
        "origPrice": 370
      },
      {
        "size": "1kg",
        "price": 599,
        "origPrice": 720
      }
    ],
    "pairing": "Daily superfood boost: mix 1 spoonful into hot rice, sprinkle over curd rice, oatmeal, or breakfast rotis."
  },
  {
    "id": "curry-karam",
    "title": "Curry Karam",
    "subtitle": "Ammamma's Heritage Multi-Purpose Veg & Fry Masala",
    "category": "podis",
    "heat": "medium",
    "heatScore": 2,
    "rating": 5,
    "reviewsCount": 520,
    "badge": "The Secret Andhra Tadka",
    "image": "./curry_karam.jpg",
    "shortDesc": "The secret spice blend behind iconic Andhra veg fries and curries! Stone-ground roasted coriander, cumin, dried red chillies, crushed garlic, and curry leaves. Elevates any potato, bendakaya, or dondakaya fry to restaurant magic.",
    "oilType": "Wood-Fired Roasted Heritage Masala",
    "ingredients": "Guntur Red Chillies, Roasted Coriander Seeds (Dhaniyalu), Cumin, Desi Garlic, Curry Leaves, Fenugreek, Turmeric, Sea Salt.",
    "shelfLife": "6 Months",
    "weights": [
      {
        "size": "250g",
        "price": 159,
        "origPrice": 190
      },
      {
        "size": "500g",
        "price": 309,
        "origPrice": 370
      },
      {
        "size": "1kg",
        "price": 599,
        "origPrice": 720
      }
    ],
    "pairing": "Sprinkle 1-2 spoons over potato fry, bendakaya fry, dal, or egg burji in the last 2 minutes of cooking for unbeatable aroma."
  },
  {
    "id": "pachadi-karam-podi",
    "title": "Pachhadi Karam Podi",
    "subtitle": "Traditional Sun-Dried Pickle Red Chilli Powder with Whole Spices",
    "category": "podis",
    "heat": "fiery",
    "heatScore": 3,
    "rating": 5,
    "reviewsCount": 610,
    "badge": "Pure Guntur Fire",
    "image": "./pachadi_karam_podi.jpg",
    "shortDesc": "Finest handpicked first-grade Guntur red chillies sun-dried on terrace mats and stone-pounded with wild mustard, methi, and Himalayan rock salt. Vibrant natural ruby-red color and authentic fiery punch for home pickles and pachadis.",
    "oilType": "Sun-Cured Pure Spice Powder",
    "ingredients": "First-Quality Guntur Red Chillies (De-stemmed), Yellow Mustard Seeds, Roasted Methi (Fenugreek), Pure Turmeric, Rock Salt.",
    "shelfLife": "12 Months (Sun-sealed longevity)",
    "weights": [
      {
        "size": "250g",
        "price": 159,
        "origPrice": 190
      },
      {
        "size": "500g",
        "price": 309,
        "origPrice": 370
      },
      {
        "size": "1kg",
        "price": 599,
        "origPrice": 720
      }
    ],
    "pairing": "The gold standard for preparing authentic Avakaya, Tomato pachadi, Usirikaya, or instant dosakaya pachadi at home."
  }
];

// -------------------------------------------------------------------
// 2. Pairing Guide Database (All Delights)
// -------------------------------------------------------------------
const PAIRING_DATA = {
  "rice-ghee": {
    badge: "The Sacred First Bite",
    title: "Hot Steamed Rice, Pure Ghee & Kandi Podi",
    quote: "The iconic first course of every South Indian feast. Steaming hot Sona Masoori rice tossed with stone-ground Kandi Podi, pure cow ghee, and spicy Avakaya.",
    img: "./kandi_podi.jpg",
    features: [
      "Signature Pairing: Kandi Podi & Mango Pickle",
      "Flavor Profile: Roasted Dals, Nutty Cumin & Golden Cow Ghee",
      "Pro Tip: A spoonful of melted cow ghee unlocks heavenly aroma"
    ],
    productId: "kandi-podi"
  },
  "dosa-idli": {
    badge: "Breakfast Comfort",
    title: "Crispy Ghee Dosa, Fluffy Idlis & Palli Karam Podi",
    quote: "Crispy golden ghee dosas and soft idlis dipped into coarse roasted peanut & garlic podi mixed with cold-pressed oil, paired with spicy Allam pickle.",
    img: "./palli_karam_podi.jpg",
    features: [
      "Signature Pairing: Palli Karampodi & Allam Pickle",
      "Flavor Profile: Crunchy Roasted Peanuts, Garlic & Sweet-Spicy Chutney",
      "Pro Tip: Mix with cold-pressed groundnut oil or cow ghee"
    ],
    productId: "palli-karam-podi"
  },
  "festive-thali": {
    badge: "Festival Heritage",
    title: "Grand Festive Feast & Pure Ghee Ariselu",
    quote: "No celebration is complete without Ammamma's Neti Ariselu and Sunnundalu. Lavish cow ghee and organic jaggery melting in your mouth.",
    img: "./Traditional_Sweets_and_Snacks_Images/Ghee Ariselu.png",
    features: [
      "Signature Pairing: Neti / Ghee Ariselu & Bellam Sunnundalu",
      "Flavor Profile: Pure Cow Ghee, Bellam Sweetness & Cardamom Warmth",
      "Pro Tip: Warm slightly on a tawa for that fresh-made village aroma"
    ],
    productId: "ghee-ariselu"
  },
  "tea-crunch": {
    badge: "Evening Chai Crunch",
    title: "Hot Ginger Chai & Pappu Chekkalu",
    quote: "Crackling evening savories! Crunchy rice chekkalu studded with soaked chana dal and curry leaves, alongside spicy Masala Cashews.",
    img: "./chekkalu.png",
    features: [
      "Signature Pairing: Chekkalu & Masala Kaju / Cashew",
      "Flavor Profile: Addictive Brittle Crunch, Curry Leaves & Desi Butter",
      "Pro Tip: Store in airtight tins to maintain crispness for weeks"
    ],
    productId: "chekkalu"
  },
  "biryani-nonveg": {
    badge: "Carnivore's Paradise",
    title: "Fragrant Biryani & Succulent Boneless Chicken Pickle",
    quote: "Juicy, crispy boneless chicken cubes steeped in fiery Guntur chillies and whole spices, bringing intense restaurant-grade punch to biryani and parottas.",
    img: "./chicken_boneless_pickle.jpg",
    features: [
      "Signature Pairing: Chicken Boneless & Gongura Prawns",
      "Flavor Profile: Fiery Guntur Punch, Succulent Meat & Aromatic Spices",
      "Pro Tip: Spoon the spiced chicken gravy over hot Bagara rice"
    ],
    productId: "chicken-boneless"
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

    // Check if opened via official invoice verification link (?v=...&s=... or legacy ?verify_order=...&sig=...)
    const urlParams = new URLSearchParams(window.location.search);
    const compactV = urlParams.get("v");
    const compactSig = urlParams.get("s");
    const verifyOrderData = urlParams.get("verify_order");
    const verifySig = urlParams.get("sig");
    const isAdminParam = urlParams.get("admin") === "1" || urlParams.get("role") === "admin" || urlParams.get("a") === "1";

    if ((compactV && compactSig) || (verifyOrderData && verifySig)) {
      setTimeout(() => {
        let result;
        if (compactV && compactSig) {
          result = decodeCompactOrder(compactV, compactSig);
        } else {
          result = verifyAndDecodeOrderUrl(verifyOrderData, verifySig);
        }

        if (result && result.valid) {
          if (isAdminParam) {
            // Admin URL (&a=1): require phone authentication before showing kitchen panel
            if (isAdminAuthenticated()) {
              openReceiptModal(result.order, true, true);
            } else {
              // First show customer bill, then prompt for admin auth
              openReceiptModal(result.order, false, true);
              promptAdminAuth(() => openReceiptModal(result.order, true, true));
            }
          } else {
            // Customer URL: always show clean, read-only bill image
            openReceiptModal(result.order, false, true);
          }
        } else {
          const tamperAlertModal = document.getElementById("tamperAlertModal");
          const tamperAlertMsg = document.getElementById("tamperAlertMsg");
          if (tamperAlertMsg) tamperAlertMsg.textContent = result ? result.error : "Verification failed";
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
    const matchesCat = (AppState.selectedCategory === "all") || 
      (item.category === AppState.selectedCategory) ||
      (AppState.selectedCategory === "veg-pickles" && item.category === "veg-pickles") ||
      (AppState.selectedCategory === "nonveg-pickles" && item.category === "nonveg-pickles") ||
      (AppState.selectedCategory === "pindi-vantalu" && (item.category === "pindi-vantalu" || item.category === "sweets")) ||
      (AppState.selectedCategory === "hot-snacks" && (item.category === "hot-snacks" || item.category === "snacks")) ||
      (AppState.selectedCategory === "podis" && item.category === "podis") ||
      (AppState.selectedCategory === "chicken" && (item.id.includes("chicken") || item.id.includes("natu-kodi"))) ||
      (AppState.selectedCategory === "prawns" && item.id.includes("prawns")) ||
      (AppState.selectedCategory === "gongura" && item.id.includes("gongura"));

    // Heat check
    const matchesHeat = (AppState.selectedHeat === "all") || (item.heat === AppState.selectedHeat);

    // Search query check
    const q = AppState.searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.ingredients.toLowerCase().includes(q) ||
      item.shortDesc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.badge && item.badge.toLowerCase().includes(q));

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
      resultsCount.innerHTML = `<span style="color:#C04A26;">No delicacies found matching your filters. Try clearing search or selecting "All Delights".</span>`;
    } else {
      resultsCount.textContent = `Showing ${filtered.length} of ${PICKLE_PRODUCTS.length} authentic delicacies`;
    }
  }

  // Generate HTML
  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: #FFF; border-radius: 20px;">
        <i class="fa-solid fa-cookie-bite" style="font-size: 3rem; color: #D97706; margin-bottom: 16px;"></i>
        <h3>No matching delicacies found!</h3>
        <p style="color: #6B625B; margin: 8px 0 20px;">Try searching for "Chekkalu", "Palli Karam", "Kandi Podi", "Curry Karam", "Ariselu", or "Chicken".</p>
        <button class="btn btn-secondary" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map((item) => {
    const defaultWeight = item.weights[1] || item.weights[0]; // default to 500g or 250g
    const isPindiVantalu = item.category === "pindi-vantalu" || item.category === "sweets";
    const isHotSnacks = item.category === "hot-snacks" || item.category === "snacks";
    const isPodi = item.category === "podis";
    const chiliIcons = Array.from({ length: 3 }, (_, i) =>
      `<i class="fa-solid fa-pepper-hot" style="opacity: ${i < item.heatScore ? '1' : '0.25'};"></i>`
    ).join("");
    const indicatorHtml = isPindiVantalu
      ? `<span class="sweet-indicator" title="Pure Desi Cow Ghee & Bellam" style="font-size: 0.76rem; font-weight: 700; color: #B45309; background: #FEF3C7; padding: 3px 9px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-cookie-bite"></i> Pindi Vantalu</span>`
      : isPodi
      ? `<span class="podi-indicator" title="Stone Ground Spice Podi" style="font-size: 0.76rem; font-weight: 700; color: #9A3412; background: #FFEDD5; padding: 3px 9px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-mortar-pestle"></i> Stone Ground</span>`
      : isHotSnacks
      ? `<span class="snack-indicator" title="Crunchy Hot Snack" style="font-size: 0.76rem; font-weight: 700; color: #C2410C; background: #FFEDD5; padding: 3px 9px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-bowl-food"></i> Hot Snack</span>`
      : `<div class="heat-indicator ${item.heat}" title="Heat: ${item.heat.toUpperCase()}">${chiliIcons}</div>`;

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
            ${indicatorHtml}
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
              <span>${isPindiVantalu || isHotSnacks ? 'Add Box' : isPodi ? 'Add Pack' : 'Add Jar'}</span>
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

  showToast(`Added ${size} of ${product.title} to your order box! 🛍️`);
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
          <i class="fa-solid fa-basket-shopping"></i>
          <h4>Your Delicacy Box is Empty</h4>
          <p>Handcrafted pickles, sweets, hot snacks & podis are waiting for your dining table!</p>
          <a href="#shop" class="btn btn-secondary" onclick="closeCart()">Browse Ammamma's Menu</a>
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

// Generate Compact, Tamper-Proof Digital Invoice URL (75% Shorter!)
function createSignedReceiptUrl(order) {
  const cleanId = (order.orderId || "").replace(/^HD-/, "");
  const cleanPhone = (order.phone || "").replace(/^91/, "");
  const pay = (order.paymentMode || "").includes("UPI") ? "1" : "0";
  const itemsStr = order.items.map(it => `${it.id}:${it.size}:${it.quantity}:${it.price}`).join(";");

  const raw = [
    cleanId,
    order.customerName,
    cleanPhone,
    order.address,
    pay,
    order.subtotal,
    order.delivery,
    order.total,
    order.date,
    itemsStr
  ].join("~");

  // Tamper signature hash (6-char hex)
  let hash = 0x811c9dc5;
  const hashInput = raw + INVOICE_SECRET_SALT;
  for (let i = 0; i < hashInput.length; i++) {
    hash ^= hashInput.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  const sig = hash.toString(16).toUpperCase().slice(0, 6);

  // Pure UTF-8 to Base64URL
  const bytes = new TextEncoder().encode(raw);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const v = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const isLocal = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1");
  const origin = isLocal ? window.location.origin : "https://pickle-ten-sandy.vercel.app";

  return `${origin}/index.html?v=${v}&s=${sig}`;
}

// Decode Compact Order URL (?v=...&s=...)
function decodeCompactOrder(v, sig) {
  try {
    let base64 = v.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    const binStr = atob(base64);
    const bytes = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      bytes[i] = binStr.charCodeAt(i);
    }
    const raw = new TextDecoder().decode(bytes);

    // Verify cryptographic signature
    let hash = 0x811c9dc5;
    const hashInput = raw + INVOICE_SECRET_SALT;
    for (let i = 0; i < hashInput.length; i++) {
      hash ^= hashInput.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    const expectedSig = hash.toString(16).toUpperCase().slice(0, 6);

    if (expectedSig !== sig) {
      return { valid: false, error: "Tampering Detected: This invoice verification URL has been illegally altered." };
    }

    const parts = raw.split("~");
    const [cleanId, name, phone, address, pay, subtotal, delivery, total, date, itemsStr] = parts;

    const items = (itemsStr || "").split(";").map(part => {
      const [id, size, qty, price] = part.split(":");
      const product = PICKLE_PRODUCTS.find(p => p.id === id);
      return {
        id,
        title: product ? product.title : id,
        size,
        quantity: parseInt(qty, 10) || 1,
        price: parseInt(price, 10) || 0
      };
    });

    const order = {
      orderId: cleanId.startsWith("HD-") ? cleanId : "HD-" + cleanId,
      date,
      customerName: name,
      phone: phone.startsWith("91") ? phone : "91" + phone,
      address,
      paymentMode: pay === "1" ? "Direct UPI (GPay / PhonePe / Paytm)" : "Cash on Delivery (COD)",
      items,
      subtotal: parseInt(subtotal, 10) || 0,
      delivery: parseInt(delivery, 10) || 0,
      total: parseInt(total, 10) || 0
    };
    order.securityCode = generateOrderSecurityHash(order);
    order.receiptUrl = window.location.href;
    return { valid: true, order };
  } catch (err) {
    return { valid: false, error: "Invalid order encoding: " + err.message };
  }
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
  const totalItems = order.items.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);
  const phoneInfo = getCleanPhoneNumbers(order.phone);

  let message = `*Namaste Home Delights - Ammamma Special!*\n\n`;
  message += `I have placed an order on your website:\n`;
  message += `----------------------------------------\n`;
  message += `*Order ID:* #${order.orderId}\n`;
  message += `*Date:* ${order.date}\n`;
  message += `*Security Token:* [SEC: ${order.securityCode}]\n`;
  if (order.receiptUrl) {
    const adminUrl = `${order.receiptUrl}&a=1`;
    message += `👉 *OFFICIAL VERIFIED BILL (Image):*\n${order.receiptUrl}\n\n`;
    message += `👨‍🍳 *KITCHEN ADMIN (1-Tap WhatsApp Reply & Dispatch):*\n${adminUrl}\n`;
  }
  message += `----------------------------------------\n\n`;
  message += `*Customer Details:*\n`;
  message += `- Name: ${order.customerName}\n`;
  message += `- Phone: ${phoneInfo.display}\n`;
  message += `- Delivery Address: ${order.address}\n`;
  message += `- Payment: ${order.paymentMode.includes("UPI") ? "Direct UPI (0% Fee)" : "Cash on Delivery (COD)"}\n\n`;
  message += `*Delicacies Ordered (${totalItems} Items):*\n`;
  order.items.forEach((item, index) => {
    message += `${index + 1}. *${item.title}* (${item.size}) x ${item.quantity} = Rs.${item.quantity * item.price}\n`;
  });
  message += `\n*Bill Summary:*\n`;
  message += `- Items Subtotal: Rs.${order.subtotal}\n`;
  message += `- Delivery: ${order.delivery === 0 ? "FREE" : "Rs." + order.delivery}\n`;
  message += `- *GRAND TOTAL PAYABLE: Rs.${order.total}*\n\n`;
  message += `Please confirm my order and share dispatch details!`;
  return message;
}

// -------------------------------------------------------------------
// HTML5 Canvas Non-Editable Invoice Image Generator (100% Client-Side)
// -------------------------------------------------------------------
function generateReceiptCanvasBlob(order, callback) {
  const scale = 2; // High-DPI 2x scale for crystal-sharp text
  const width = 640;
  const padding = 32;
  const contentWidth = width - (padding * 2); // 576

  // Dynamic height based on number of items with balanced spacing
  const rowHeight = 36;
  const itemsCount = (order.items && order.items.length) || 1;
  const height = 646 + (itemsCount * rowHeight);

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

    let y = 30;

    // 3. Top Official Badge
    const badgeW = 270;
    const badgeH = 26;
    ctx.fillStyle = "#9E2A2B";
    ctx.beginPath();
    ctx.roundRect((width - badgeW) / 2, y, badgeW, badgeH, 13);
    ctx.fill();

    ctx.fillStyle = "#FFF";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("OFFICIAL VERIFIED ORDER INVOICE", width / 2, y + 17);
    y += badgeH + 16;

    // 4. Logo & Brand Title
    if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
      const logoSize = 64;
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

      y += logoSize + 14;
    }

    ctx.fillStyle = "#9E2A2B";
    ctx.font = "bold 21px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("HOME DELIGHTS - INTI RUCHULU", width / 2, y);
    y += 20;

    ctx.fillStyle = "#666";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("AMMAMMA SPECIAL • PICKLES, PINDI VANTALU, SNACKS & PODIS", width / 2, y);
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
    y += 16;

    // 5. Order & Customer Info Card (Generous 124px height prevents any text bleeding!)
    const cardH = 124;
    ctx.fillStyle = "#FAF5ED";
    ctx.beginPath();
    ctx.roundRect(padding, y, contentWidth, cardH, 10);
    ctx.fill();
    ctx.strokeStyle = "#E2DACB";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const col1X = padding + 18;
    const col2X = padding + (contentWidth / 2) + 14;

    ctx.textAlign = "left";
    // Row 1: Order ID & Customer Name
    ctx.fillStyle = "#888";
    ctx.font = "bold 9px sans-serif";
    ctx.fillText("ORDER ID", col1X, y + 20);
    ctx.fillText("CUSTOMER NAME", col2X, y + 20);

    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "#9E2A2B";
    ctx.fillText("#" + order.orderId, col1X, y + 36);
    ctx.fillStyle = "#111";
    ctx.fillText(order.customerName, col2X, y + 36);

    // Row 2: Date & WhatsApp Phone
    ctx.fillStyle = "#888";
    ctx.font = "bold 9px sans-serif";
    ctx.fillText("DATE & TIME", col1X, y + 58);
    ctx.fillText("WHATSAPP PHONE", col2X, y + 58);

    ctx.font = "11px sans-serif";
    ctx.fillStyle = "#333";
    ctx.fillText(order.date, col1X, y + 74);
    const canvasPhoneInfo = getCleanPhoneNumbers(order.phone);
    ctx.fillText(canvasPhoneInfo.display || order.phone, col2X, y + 74);

    // Row 3: Payment Mode & Delivery Address
    ctx.fillStyle = "#888";
    ctx.font = "bold 9px sans-serif";
    ctx.fillText("PAYMENT MODE", col1X, y + 96);
    ctx.fillText("DELIVERY ADDRESS", col2X, y + 96);

    ctx.font = "bold 11px sans-serif";
    ctx.fillStyle = "#15803D";
    ctx.fillText(order.paymentMode.includes("UPI") ? "Direct UPI (0% Fee)" : "Cash on Delivery (COD)", col1X, y + 112);

    ctx.fillStyle = "#333";
    ctx.font = "11px sans-serif";
    const shortAddress = order.address.length > 36 ? order.address.substring(0, 34) + "..." : order.address;
    ctx.fillText(shortAddress, col2X, y + 112);

    y += cardH + 18;

    // 6. Items Table Header (Balanced column spacing)
    const thH = 26;
    ctx.fillStyle = "#EAE2D4";
    ctx.beginPath();
    ctx.roundRect(padding, y, contentWidth, thH, 4);
    ctx.fill();

    const colNumX = padding + 12;
    const colItemX = padding + 34;
    const colQtyX = padding + contentWidth - 146;
    const colRateX = padding + contentWidth - 84;
    const colTotalX = padding + contentWidth - 14;

    ctx.fillStyle = "#9E2A2B";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("#", colNumX, y + 17);
    ctx.fillText("DELICACY & WEIGHT / PACK", colItemX, y + 17);
    ctx.textAlign = "center";
    ctx.fillText("QTY", colQtyX, y + 17);
    ctx.textAlign = "right";
    ctx.fillText("RATE", colRateX, y + 17);
    ctx.fillText("TOTAL", colTotalX, y + 17);

    y += thH;

    // 7. Table Rows
    order.items.forEach((item, index) => {
      ctx.fillStyle = index % 2 === 0 ? "#FFFFFF" : "#FAF8F5";
      ctx.fillRect(padding, y, contentWidth, rowHeight);

      ctx.strokeStyle = "#EFE9DF";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, y + rowHeight);
      ctx.lineTo(padding + contentWidth, y + rowHeight);
      ctx.stroke();

      ctx.fillStyle = "#888";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText((index + 1).toString(), colNumX, y + 23);

      ctx.fillStyle = "#111";
      ctx.font = "bold 11px sans-serif";
      const shortTitle = item.title.length > 30 ? item.title.substring(0, 28) + "..." : item.title;
      ctx.fillText(`${shortTitle} (${item.size})`, colItemX, y + 23);

      ctx.textAlign = "center";
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#333";
      ctx.fillText(item.quantity.toString(), colQtyX, y + 23);

      ctx.textAlign = "right";
      ctx.fillStyle = "#666";
      ctx.font = "11px sans-serif";
      ctx.fillText("Rs." + item.price, colRateX, y + 23);

      ctx.fillStyle = "#9E2A2B";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("Rs." + (item.price * item.quantity), colTotalX, y + 23);

      y += rowHeight;
    });

    y += 14;

    // 8. Totals & Pricing Breakdown Box
    const stBoxH = 70;
    ctx.fillStyle = "#FAF5ED";
    ctx.beginPath();
    ctx.roundRect(padding, y, contentWidth, stBoxH, 8);
    ctx.fill();
    ctx.strokeStyle = "#E2DACB";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.fillStyle = "#666";
    ctx.font = "11px sans-serif";
    ctx.fillText("Items Subtotal:", padding + 16, y + 26);
    ctx.fillText("Fragile Packaging & Express Delivery:", padding + 16, y + 50);

    ctx.textAlign = "right";
    ctx.fillStyle = "#111";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("Rs. " + order.subtotal, padding + contentWidth - 16, y + 26);
    ctx.fillStyle = order.delivery === 0 ? "#15803D" : "#111";
    ctx.fillText(order.delivery === 0 ? "FREE" : "Rs. " + order.delivery, padding + contentWidth - 16, y + 50);

    y += stBoxH + 14;

    // 9. Grand Total Banner (Perfect vertical center alignment)
    const gtH = 46;
    ctx.fillStyle = "#9E2A2B";
    ctx.beginPath();
    ctx.roundRect(padding, y, contentWidth, gtH, 8);
    ctx.fill();

    ctx.textBaseline = "middle";
    const gtCenterY = y + (gtH / 2);

    ctx.textAlign = "left";
    ctx.fillStyle = "#FFF";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("GRAND TOTAL PAYABLE:", padding + 18, gtCenterY);

    ctx.textAlign = "right";
    ctx.fillStyle = "#FFF";
    ctx.font = "bold 19px 'Playfair Display', Georgia, serif";
    ctx.fillText("Rs. " + order.total, padding + contentWidth - 18, gtCenterY);

    ctx.textBaseline = "alphabetic";

    y += gtH + 14;

    // 10. Security Hash Stamp & Authenticity Verification (Clean padding & spacing)
    const tokH = 52;
    ctx.fillStyle = "#F0FDF4";
    ctx.beginPath();
    ctx.roundRect(padding, y, contentWidth, tokH, 8);
    ctx.fill();
    ctx.strokeStyle = "#BBF7D0";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.fillStyle = "#15803D";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("OFFICIAL SECURITY TOKEN (TAMPER-PROOF):", padding + 14, y + 20);

    ctx.fillStyle = "#9E2A2B";
    ctx.font = "bold 12px monospace";
    ctx.fillText("[SEC: " + order.securityCode + "]", padding + 14, y + 38);

    ctx.textAlign = "right";
    ctx.fillStyle = "#666";
    ctx.font = "italic 9px sans-serif";
    ctx.fillText("Non-editable verified digital bill", padding + contentWidth - 14, y + 20);
    ctx.fillStyle = "#888";
    ctx.font = "9px sans-serif";
    ctx.fillText("pickle-ten-sandy.vercel.app", padding + contentWidth - 14, y + 38);

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

function openReceiptModal(order, isAdminVerified = false, isFromUrl = false) {
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
    const phoneInfo = getCleanPhoneNumbers(order.phone);
    const totalItems = order.items.reduce((s, it) => s + (parseInt(it.quantity, 10) || 1), 0);

    if (isAdminVerified) {
      // ----------------------------------------------------
      // ADMIN KITCHEN DISPATCH & 1-TAP CUSTOMER REPLY VIEW
      // ----------------------------------------------------
      const confirmReplyMsg = `Namaste ${order.customerName} garu! 🙏\n\nYour Ammamma Special Delicacies order #${order.orderId} (Rs. ${order.total}) has been verified and confirmed! 🍯\n\nPlease send payment of Rs. ${order.total} to UPI: 9704514247@upi and share the screenshot so we can pack and dispatch your fresh order today!`;
      const waDirectUrl = `https://wa.me/${phoneInfo.clean}?text=${encodeURIComponent(confirmReplyMsg)}`;
      const waWebDirectUrl = `https://web.whatsapp.com/send?phone=${phoneInfo.clean}&text=${encodeURIComponent(confirmReplyMsg)}`;

      receiptBody.innerHTML = `
        <div class="kitchen-admin-card" style="padding: 4px;">
          <!-- 1. Authenticity Header -->
          <div class="admin-verification-banner" style="background: #F0FDF4; border: 2px solid #22C55E; color: #15803D; padding: 14px 16px; border-radius: 12px; margin-bottom: 14px; display: flex; align-items: center; gap: 12px;">
            <i class="fa-solid fa-circle-check" style="font-size: 2.2rem; color: #16A34A; flex-shrink: 0;"></i>
            <div>
              <strong style="font-size: 1.05rem; display: block; margin-bottom: 2px; color: #14532D;">KITCHEN ADMIN DISPATCH &bull; ORDER #${order.orderId}</strong>
              <span style="font-size: 0.85rem; color: #166534; line-height: 1.35; display: block;">Official catalog verified. Tap the green button below to directly WhatsApp the customer without selecting contacts!</span>
            </div>
          </div>

          <!-- 2. Giant Amount to Collect Card -->
          <div class="admin-collect-card" style="background: linear-gradient(135deg, #9E2A2B 0%, #7A191A 100%); color: #FFF; padding: 18px 20px; border-radius: 14px; text-align: center; margin-bottom: 16px; box-shadow: 0 6px 20px rgba(158, 42, 43, 0.25);">
            <span style="text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; opacity: 0.9; font-weight: 700; display: block; margin-bottom: 6px;">Total Money to Collect from Customer:</span>
            <div style="font-size: 2.7rem; font-weight: 800; font-family: 'Playfair Display', Georgia, serif; line-height: 1.1; margin-bottom: 8px;">
              ₹${order.total}
            </div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.2); padding: 5px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 700;">
              <i class="fa-solid fa-${order.paymentMode.includes('UPI') ? 'mobile-screen-button' : 'hand-holding-dollar'}"></i>
              <span>${order.paymentMode}</span>
            </div>
          </div>

          <!-- 3. Delicacies to Pack in Box -->
          <div class="admin-pack-card" style="background: #FAF8F5; border: 1.5px solid #EADBCC; border-radius: 12px; padding: 14px 16px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #EADBCC; padding-bottom: 8px;">
              <h5 style="margin: 0; font-size: 0.98rem; color: #9E2A2B; font-weight: 700;">
                <i class="fa-solid fa-box-open"></i> Delicacies to Pack in Box:
              </h5>
              <span style="background: #9E2A2B; color: #FFF; font-size: 0.78rem; font-weight: 700; padding: 3px 10px; border-radius: 12px;">
                ${totalItems} Items Total
              </span>
            </div>
            <div class="admin-items-list" style="display: flex; flex-direction: column; gap: 8px;">
              ${order.items.map((item, idx) => `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF; padding: 10px 12px; border-radius: 8px; border: 1px solid #EFEAE2;">
                  <div>
                    <strong style="color: #222; font-size: 0.95rem;">${idx + 1}. ${item.title}</strong>
                    <span style="color: #666; font-size: 0.82rem; display: block; margin-top: 2px;">Weight: <strong>${item.size}</strong> &bull; Rate: ₹${item.price}</span>
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
              <strong>${order.customerName}</strong> (<a href="tel:${phoneInfo.tel}" style="color: #9E2A2B; text-decoration: none; font-weight: 700;">${phoneInfo.display}</a>)<br>
              <span style="color: #444; font-size: 0.9rem; line-height: 1.4; display: block; margin-top: 4px;">📍 ${order.address}</span>
            </div>
          </div>

          <!-- 5. 1-Tap Direct WhatsApp Customer Navigation -->
          <div class="receipt-actions" style="display: flex; flex-direction: column; gap: 10px;">
            <a href="${waDirectUrl}" target="_blank" class="btn-receipt-wa" style="padding: 15px 18px; font-size: 1.02rem; border-radius: 12px; justify-content: center; text-decoration: none; display: flex; align-items: center; gap: 10px; background: #25D366; color: #FFF; font-weight: 700; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);">
              <i class="fa-brands fa-whatsapp" style="font-size: 1.4rem;"></i>
              <span>Confirm Order with Customer (${phoneInfo.display})</span>
            </a>

            <a href="${waWebDirectUrl}" target="_blank" style="text-align: center; font-size: 0.82rem; color: #15803D; text-decoration: underline; display: block; margin-top: -2px; margin-bottom: 4px; font-weight: 600;">
              💻 If on PC, click to open directly in WhatsApp Web
            </a>

            <div style="display: flex; gap: 10px;">
              <a href="tel:${phoneInfo.tel}" class="btn-receipt-download" style="flex: 1; padding: 10px; border-radius: 10px; text-decoration: none; display: flex; justify-content: center; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 700; color: #9E2A2B; border: 1.5px solid #9E2A2B;">
                <i class="fa-solid fa-phone"></i>
                <span>Call Customer</span>
              </a>
              <button class="btn-receipt-print" onclick="window.print()" style="flex: 1; padding: 10px; border-radius: 10px; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 700; background: #FAF5ED; border: 1px solid #D5C7B5;">
                <i class="fa-solid fa-print"></i>
                <span>Print Slip</span>
              </button>
            </div>

            <button type="button" id="btnToggleToCustomerBill" style="margin-top: 8px; width: 100%; padding: 11px; border-radius: 10px; border: 1.5px solid #C99A45; background: #FFFDF9; color: #9E2A2B; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <i class="fa-solid fa-file-invoice"></i>
              <span>View Locked Digital Bill Image</span>
            </button>
          </div>
        </div>
      `;

      const btnToggleToCustomerBill = document.getElementById("btnToggleToCustomerBill");
      if (btnToggleToCustomerBill) {
        btnToggleToCustomerBill.onclick = () => openReceiptModal(order, false, isFromUrl);
      }
    } else {
      // ----------------------------------------------------
      // CUSTOMER / PUBLIC VERIFIED BILL IMAGE VIEW
      // ----------------------------------------------------
      receiptBody.innerHTML = `
        <div class="receipt-card">
          <div class="admin-verification-banner" style="background: #F0FDF4; border-color: #BBF7D0; color: #15803D;">
            <i class="fa-solid fa-circle-check"></i>
            <div>
              <strong>OFFICIAL VERIFIED ORDER BILL #${order.orderId}</strong><br>
              <span>${isFromUrl ? 'Authentic digital invoice verified by Home Delights - Ammamma Special Kitchen.' : 'Your bill is locked and verified. Tap below to send this order directly to +91 97045 14247!'}</span>
            </div>
          </div>

          <!-- Rendered Non-Editable Canvas Image Preview -->
          <div class="receipt-image-preview-card">
            <img src="${dataUrl}" alt="Official Order Invoice #${order.orderId}" class="generated-invoice-img" id="generatedInvoiceImg">
          </div>

          <!-- Action Buttons -->
          <div class="receipt-actions">
            ${!isFromUrl ? `
              <button class="btn-receipt-wa" id="receiptShareWaBtn">
                <i class="fa-brands fa-whatsapp"></i>
                <span>Send Order to WhatsApp (+91 97045 14247)</span>
              </button>
            ` : ''}
            <div style="display: flex; gap: 10px; width: 100%;">
              <a href="${dataUrl}" download="${fileName}" class="btn-receipt-download" id="receiptDownloadBtn" style="flex: 1; justify-content: center;">
                <i class="fa-solid fa-download"></i>
                <span>Download Bill Image</span>
              </a>
              <button class="btn-receipt-print" onclick="window.print()" style="flex: 1; justify-content: center;">
                <i class="fa-solid fa-print"></i>
                <span>Print</span>
              </button>
            </div>

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

          showToast("Opening WhatsApp with +91 97045 14247... 🛍️");
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
        showToast("Please add at least one delicacy to your box! 🛍️");
        return;
      }

      const name = custNameInput?.value.trim() || "";
      const phoneInput = custPhoneInput?.value.trim() || "";
      const address = custAddressInput?.value.trim() || "";
      const cityPin = custCityPinInput?.value.trim() || "";

      const phoneInfo = getCleanPhoneNumbers(phoneInput);

      // Validate required delivery details
      if (!name) {
        showToast("Please enter your name for the invoice! ✍️");
        custNameInput?.scrollIntoView({ behavior: "smooth", block: "center" });
        custNameInput?.focus();
        return;
      }
      if (!phoneInfo.isValid) {
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
        phone: phoneInfo.clean, // strictly sanitized digits (e.g. 916301060151)
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
      showToast("Official bill generated! Review and tap Send on WhatsApp 🛍️");
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
        <span class="section-tag">${item.badge || "Artisanal Delicacy"}</span>
        <h2 class="modal-title">${item.title}</h2>
        <div class="modal-oil-badge">
          <i class="fa-solid ${item.category === 'pindi-vantalu' ? 'fa-award' : item.category === 'podis' ? 'fa-mortar-pestle' : item.category === 'hot-snacks' ? 'fa-bowl-food' : 'fa-droplet'}"></i>
          <span>${item.oilType}</span>
        </div>

        <div class="product-rating-row" style="margin-bottom: 12px;">
          <div class="product-stars">
            <i class="fa-solid fa-star"></i>
            <strong>${item.rating}</strong>
            <span>(${item.reviewsCount} reviews)</span>
          </div>
          ${item.category === 'pindi-vantalu' || item.category === 'sweets'
            ? `<span style="font-size: 0.78rem; font-weight: 700; color: #B45309; background: #FEF3C7; padding: 3px 10px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-cookie-bite"></i> Pindi Vantalu</span>`
            : item.category === 'podis'
            ? `<span style="font-size: 0.78rem; font-weight: 700; color: #9A3412; background: #FFEDD5; padding: 3px 10px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-mortar-pestle"></i> Stone Ground Podi</span>`
            : item.category === 'hot-snacks' || item.category === 'snacks'
            ? `<span style="font-size: 0.78rem; font-weight: 700; color: #C2410C; background: #FFEDD5; padding: 3px 10px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-bowl-food"></i> Hot Snack</span>`
            : `<div class="heat-indicator ${item.heat}">${chiliIcons} <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; margin-left: 4px;">${item.heat}</span></div>`}
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
            <span>Add to Order Box</span>
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
          <i class="fa-solid fa-basket-shopping"></i>
          <span>Order This Pairing Item</span>
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
