<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# FLL Unearthed Robot Design Website

Ez a repository a csapat weboldala (Vite + React).

## Lokalis futtatas

**Elofetel:** Node.js 20+

1. Fuggosegek telepitese:
   `npm install`
2. Fejlesztoi szerver inditasa:
   `npm run dev`
3. Production build:
   `npm run build`

## Netlify deploy (GitHub-rol)

1. Pushold a repot GitHub-ra.
2. Netlify-ben `Add new site -> Import an existing project -> GitHub`.
3. Build beallitasok:
   `Build command`: `npm run build`
   `Publish directory`: `dist`
4. Deploy.

Megjegyzes: a projekt jelenleg nem igenyel semmilyen API kulcsot vagy kulso titkot.
