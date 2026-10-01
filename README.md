# Kailash Parbat - Installable App

Kailash Parbat Restaurants Pte Ltd, packaged as an installable PWA (Android and iOS).
Colours follow the logo: leaf green, charcoal and white.

## What the app does
Five tabs: **Home** (dashboard), **Inquiries**, **Quotes**, **Invoices**, **Customers**.
- Tap **+** to add a record. Tap any card to view, edit, change status or delete.
- Inquiry -> **Create quote** -> **Create invoice** (details carry across, statuses update).
- Quotes and invoices: items, optional 9% GST, **WhatsApp** share, **Print / PDF**.
- Customers are added automatically from inquiries, quotes and invoices.
- Home has **Download backup** / **Restore from backup**.
- Works fully offline. No external libraries or logins needed.

## Files
| File | Purpose |
|---|---|
| `index.html` | The app (logo embedded) |
| `manifest.webmanifest` | Makes it installable |
| `sw.js` | Service worker (offline mode) |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Android icons |
| `apple-touch-icon.png` | iPhone home-screen icon |
| `favicon.png` | Browser tab icon |

Upload all files together, with the same names, to an **HTTPS** host.

## Step 1 - Host it
- **Netlify Drop:** open https://app.netlify.com/drop and drag this folder in.
- **Cloudflare Pages:** https://pages.cloudflare.com -> Upload assets -> drag the folder.
- **GitHub Pages:** new public repo, upload the files to the root, Settings -> Pages -> main / root.

Opening `index.html` straight from the phone's Downloads folder also works for a quick test,
but installing needs the hosted HTTPS link.

## Step 2 - Install on phones
- **Android (Chrome):** open the link -> menu (three dots) -> **Install app**.
- **iPhone (Safari):** open the link -> Share -> **Add to Home Screen**.

## Step 3 - Updating
Edit the files, change `CACHE_VERSION` in `sw.js` (`kailash-parbat-v2`, v3...), re-upload,
then close and reopen the app once on each phone.

## Limits to know
1. Data is stored **on each phone only** (browser storage). Staff do not see each other's
   records. Use Download backup regularly. Clearing browser data erases records.
2. Sharing data across staff needs a backend (e.g. Firebase) - a separate build.
3. Not listed in Play Store / App Store; it installs from the browser.
4. GST is set at 9% in `index.html` (search for `.09` and `9% GST` to change it).
