# 🏺 Avakaya & Co. | Artisanal Heritage Pickle Business Landing Page

An ultra-premium, high-converting static business landing page designed for artisanal, homemade, and gourmet pickle businesses. Built with clean, modern HTML5, CSS3, and JavaScript—zero build steps, zero cost, and 100% ready for **GitHub Pages** deployment.

---

## ✨ Features & Professional UI Effects

1. **Rich Heritage Aesthetics**:
   - Palette inspired by traditional terracotta martaban jars, turmeric gold, and deep Guntur chili red.
   - Editorial typography combining `Playfair Display` serif headers with sleek `Plus Jakarta Sans` UI body.
   - Floating spice badges, authentic rotating artisan stamp, and subtle grain overlay.
2. **Interactive Small-Batch Catalog**:
   - Filter by categories: *Signature Mango*, *Tangy & Sour*, *Garlic & Spiced*, *Gongura & Greens*.
   - Filter by **Heat Level** (Mild 🌶️, Medium 🌶️🌶️, Fiery 🌶️🌶️🌶️).
   - Live search input matching titles, descriptions, and ingredients.
   - Dynamic weight pills (**250g / 500g / 1kg**) that dynamically update prices in real time.
3. **Interactive Pairing Guide**:
   - Select comfort meals (Hot Rice & Ghee, Curd Rice, Aloo Paratha, Crispy Dosa, Khichdi) to instantly display the perfect pickle pairing with one-click ordering.
4. **Slide-Out Cart Drawer & Direct WhatsApp Checkout**:
   - Add jars, modify quantities, and remove items with persistent `localStorage`.
   - Dynamic **Free Delivery Progress Bar** (unlocks free shipping above ₹599).
   - **One-Click WhatsApp Order Generator**: Formats the selected jars, weights, quantities, subtotal, and delivery address template directly into WhatsApp for rapid closure.
5. **Quick-View Product Modal**:
   - Displays cold-pressed oil certification, ingredient breakdown, and shelf-life instructions.
6. **Social Proof & Trust Building**:
   - Customer reviews with verified buyer badges.
   - 4-Step Sun-Curing Ritual timeline.
   - Spill-proof packaging guarantees.
   - Expandable FAQ accordion.

---

## 🚀 How to Deploy to GitHub Pages for FREE (Zero Cost)

Deploying this website to GitHub takes under 3 minutes:

### Option A: Using the GitHub Website (No Git command line needed)

1. Go to [GitHub.com](https://github.com/) and click **New Repository**.
2. Name your repository (for example: `pickle-business` or `avakaya-store`).
3. Make sure the repository is set to **Public**, and click **Create repository**.
4. Click **"uploading an existing file"**.
5. Drag and drop all the files and folders from this folder:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `assets/` (containing `images/`)
6. Click **Commit changes**.
7. In your GitHub repository, click **Settings** (top tab) ➔ **Pages** (in the left sidebar).
8. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
9. Wait ~60 seconds. GitHub will provide your live website link:
   ```
   https://<your-github-username>.github.io/<repository-name>/
   ```

---

### Option B: Using Git in Terminal / PowerShell

Open PowerShell in this directory (`c:\Users\SaiKoundinyaHarshad\Desktop\Sample UI`) and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial release of Avakaya & Co. Pickle Business Landing Page"

# Rename branch to main
git branch -M main

# Link your remote GitHub repository
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# Push code to GitHub
git push -u origin main
```

Then go to **Repository Settings ➔ Pages** and enable GitHub Pages on the `main` branch.

---

## 🛠️ How to Customize for Your Business

- **Change Brand Name & Phone Number**:
  - Open `index.html` and search for `919876543210` to replace it with your actual business WhatsApp number.
  - Search for `Avakaya & Co.` to change the store name if desired.
- **Add or Edit Pickles**:
  - Open `app.js` and edit the `PICKLE_PRODUCTS` array. You can adjust prices, jar sizes, spice levels, ingredients, and photos.
- **Photos**:
  - High-resolution generated food photos are stored in `assets/images/`. You can drop in your own photos using the same names or update the image paths in `app.js`.

---

## 💻 Local Preview

You can preview the website immediately:
1. Double click `index.html` in Windows Explorer to open it in your browser.
2. Or run a simple local web server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```
