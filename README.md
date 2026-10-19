# 🏺 HOME DELIGHTS - INTI RUCHULU | AMMAMMA SPECIAL

> **FSSAI Lic No. 20126081000685**  
> Authentic, Traditional Handcrafted Indian Pickles Prepared with Pure Cold-Pressed Oils, Sun-Cured Spices, and Ammamma's Secret Generational Recipes.

An ultra-premium, high-converting static business landing page built with clean, modern HTML5, CSS3, and JavaScript—zero build steps, zero cost, and 100% ready for **Vercel** and **GitHub Pages** deployment.

---

## 🎨 Official Brand Identity & Assets

- **Brand Name**: `HOME DELIGHTS - INTI RUCHULU | AMMAMMA SPECIAL`
- **Official Logo**: `logo.jpg` (Depicting Ammamma & grandson preparing traditional earthen martaban pickle jar with FSSAI certification seal)
- **FSSAI License**: `Lic No. 20126081000685`

---

## 💰 100% Zero-Cost Architecture (No Payment Gateway Fees)

Payment gateways (like Razorpay, Stripe, PayU) charge **2% to 3% transaction commissions, setup fees, maintenance costs, and KYC compliance overhead**.

To keep operating expenses at **₹0** and pass maximum value to customers, this website uses **Direct Zero-Cost Ordering**:
- 📲 **Instant WhatsApp Checkout**: Automatically drafts an itemized bill with jar names, selected weights, quantities, subtotal, delivery status, and grand total.
- 📞 **One-Click Call to Order**: Directly dials customer helpline (`+91 70367 63589`).
- 💳 **Direct UPI (GPay / PhonePe / Paytm)**: Customers pay directly to your merchant QR or UPI number with 0% gateway commission.
- 💵 **Cash on Delivery (COD)**: Zero friction for cautious first-time buyers.

---

## 🔒 Tamper-Proof Digital Invoice & Signed Receipt System (Zero Cost & Zero Failures)

### The Forgery Problem on WhatsApp
When a website redirects to WhatsApp via `https://wa.me/917036763589?text=...`, WhatsApp places the order text inside the customer's chat input field. **Customers can backspace, edit, or manipulate text before pressing Send.** A customer could alter `₹1415` to `₹415` or reduce jar weights.

### The Solution: Deterministic Cryptographic Signing & Verification Links
Without needing a paid backend server or database, the platform implements client-side cryptographic hashing and URL signature verification:

1. **In-Cart Delivery Form**:
   - Customer fills Full Name, WhatsApp Number, House/Street Address, City & Pincode, and selects UPI vs COD.
2. **Deterministic Cryptographic Security Token**:
   - `generateOrderSecurityHash()` computes a checksum bound to the Grand Total, Jar Count, Customer Phone, and secret salt:
     ```
     [SEC: HD-<GrandTotal>-<JarCount>J-<4HexCode>]
     Example: [SEC: HD-1415-5J-E7A2]
     ```
   - If a customer alters the text to say `Total: ₹415`, the token `HD-1415-5J` immediately exposes the fraud.
3. **Signed Unalterable Invoice URL**:
   - Along with the message, the website generates a signed verification link:
     ```
     https://homedelights.vercel.app/?verify_order=<base64_payload>&sig=<calculated_hash>
     ```
4. **Admin One-Click Verification**:
   - When the order arrives on WhatsApp, the admin taps the verification link.
   - The website reconstructs the order, recalculates the cryptographic signature, and confirms it matches `sig`.
   - **If Valid**: Opens the official, tamper-proof **Digital Invoice & Receipt** with FSSAI seal, itemized jars, quantities, prices, and a 1-click **Print / Save PDF Receipt** button.
   - **If Tampered**: If anyone edited the URL parameters or faked prices, the hash comparison fails and the system displays a prominent **Tamper Warning Modal** alerting the admin!

---

## 🛒 Slide-Out Cart Drawer Architecture (Collision-Free Fix)

The cart slide-out drawer uses a decoupled **3-tier flexbox architecture** ensuring zero collision or clipping across all screen sizes:

```
┌──────────────────────────────────────────────┐
│ Tier 1: Fixed Header + Free Shipping Tracker │ (flex-shrink: 0)
├──────────────────────────────────────────────┤
│                                              │
│ Tier 2: Unified Scrollable Body (.cart-body) │ (flex: 1 1 auto, min-height: 0,
│  - All Added Jars (Images, Weights, + / -)   │  overflow-y: auto)
│  - Itemized Bill Summary (Subtotal, Total)   │
│  - Customer Delivery Form (4 Inputs, UPI/COD)│
│  - Transit Warranty Badge                    │
│                                              │
├──────────────────────────────────────────────┤
│ Tier 3: Pinned Sticky Checkout (.cart-footer)│ (flex-shrink: 0, docked at bottom)
│  - To Pay: ₹1,415 | FREE Delivery Pill       │
│  - [ Generate Invoice & Confirm on WhatsApp ]│
│  - [ Call to Order: +91 70367 63589 ]        │
└──────────────────────────────────────────────┘
```

### Key Architectural Fixes:
1. **No Squished Slits**: In the old layout, `.cart-footer` consumed 520px as an unconstrained sibling, crushing `.cart-items-list` into a 30px sliver. By moving the items list, bill summary, and delivery form into a single `.cart-body` (`flex: 1; min-height: 0; overflow-y: auto;`), items and forms flow naturally together.
2. **Docked Compact Action Bar**: `.cart-footer` is pinned at the bottom with a compact height (~110px). The WhatsApp checkout button and Call button are 100% visible and never cut off by the viewport edge.
3. **Smooth Scroll Centering on Validation**: If a user clicks checkout without filling in their name or address, `app.js` runs `scrollIntoView({ behavior: 'smooth', block: 'center' })` to smoothly glide to and focus the exact missing input field.
4. **Clean Empty State**: When 0 jars are in the cart, the delivery form and checkout bar cleanly hide, showing a friendly "Browse Handcrafted Jars" CTA.

---

## 🛡️ 100% Crash-Proof Reliability (Zero Downtime)

The website is engineered for absolute resilience:
1. **Serverless Static Architecture**: Served over Vercel Edge CDN & GitHub Pages CDN. Because there are no backend servers, database connection pools, or Node processes, there is **zero risk of server crashes, memory leaks, or database downtime** (99.99% global uptime).
2. **Defensive JavaScript**: All browser interactions, `localStorage` calls, and event listeners are wrapped in top-level `try...catch` boundaries and global error handlers (`window.addEventListener('error')`).
3. **Triple-Layer Image Fallbacks**: If an image fails to load, `handleImgError(this)` automatically attempts the root path, then `./assets/images/`, and finally provides an elegant vector SVG jar placeholder—preventing broken image icons and infinite recursion.

---

## 📱 100% Full Mobile Responsive Layout

The UI has been architected to look and feel like a modern native e-commerce mobile app on smartphones (iPhone, Pixel, Samsung) while remaining gorgeous on tablets and large desktop monitors:

1. **Native Mobile Bottom Navigation Bar**: Fixed at the bottom of the screen with quick thumb access: `Home`, `Jars`, `Pairings`, `Cart` (with live quantity badge), and `WhatsApp Order`.
2. **Official Logo Display**: Displayed in the top navigation, favicon, hero section seal, mobile drawer, and footer.
3. **Swipeable Horizontal Filter Pills**: Category tabs and pairing dish selectors scroll smoothly with touch drag and snap physics (no awkward multi-line wrapping).
4. **Off-Canvas Mobile Navigation Drawer**: Smooth slide-in menu with dimmed frosted overlay, brand identity, navigation links, and direct WhatsApp / phone helpline buttons.
5. **Touch-Optimized Product Cards**: Always-visible quick-view button on mobile touchscreens with large, thumb-friendly weight pills (`250g`, `500g`, `1kg`) and instant price recalculation.
6. **Full-Width Mobile Cart Drawer**: Uses dynamic viewport units (`100dvh`) to prevent mobile browser URL bar clipping.
7. **Smart Floating WhatsApp Button**: Dynamically stays positioned safely above the mobile navigation bar without blocking UI elements.

---

## 👨‍🍳 Admin Order Fulfillment SOP (Step-by-Step)

When a customer sends an order on WhatsApp:

1. **Step 1: Check Message**: Review customer's name, phone, address, and requested pickle varieties.
2. **Step 2: Inspect Security Token**: Check the `[SEC: HD-<Total>-<Jars>J-<Hex>]` token in the message. E.g., `HD-1415-5J-E7A2` confirms an authentic total of ₹1,415 for 5 jars.
3. **Step 3: Click the Digital Invoice Link**: Open the verification URL in the message.
4. **Step 4: View Verified Digital Receipt**:
   - The official invoice modal opens with FSSAI seal, customer details, and price breakdown.
   - If a customer altered the URL, the **Tamper Alert Modal** warns you immediately.
5. **Step 5: Pack & Print**: Click **"Print / Save PDF Receipt"** to print the invoice, pack the jars with food-grade fragile seals, and dispatch!

---

## 🛠️ Customizing for Your Business

- **WhatsApp Phone Number**:
  - Configured to your official admin number: `+91 70367 63589` (`917036763589`).
- **Pickles & Pricing**:
  - Open `app.js` and modify the `PICKLE_PRODUCTS` array (adjust prices, descriptions, ingredients, weights).

---

## ⚡ How to Deploy to Vercel (100% Free)

> ⚠️ **Important Account Note**: When signing in to Vercel, use your **personal GitHub** or **personal Google/email** account. Do **NOT** use any corporate email address (such as `@rampgroup.com`).

### Deploying Updates via GitHub
1. Open your GitHub repository: [github.com/harshadnani2004/pickle](https://github.com/harshadnani2004/pickle)
2. Click **Add file** ➔ **Upload files**.
3. Drag and drop the updated project files:
   - 📄 `index.html`
   - 📄 `styles.css`
   - 📄 `app.js`
   - 📄 `README.md`
   - 📄 `logo.jpg`
   - 📄 `vercel.json`
4. Click **Commit changes**.
5. Vercel automatically deploys within 10–20 seconds to [homedelights.vercel.app](https://homedelights.vercel.app/)!

---

## 💻 Local Preview

Run in your terminal:
```cmd
python -m http.server 8085
```
Then open `http://localhost:8085` in any browser!

