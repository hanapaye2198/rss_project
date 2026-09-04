# iCASH project

This repository contains a dependency-free static rebuild of the iCASH public landing page and a React Native / Expo mobile app based on the supplied mobile references. The website uses the supplied iCASH logo, app screenshots and geometric artwork from the original export.

## Structure

```text
.
|-- index.html
|-- assets/
|   |-- css/styles.css
|   |-- js/main.js
|   `-- images/
|-- mobile-app/
|   |-- App.tsx
|   |-- src/
|   `-- reference/
`-- reference/
    |-- original-index.html
    |-- IcashHTML.html
    `-- mobirise-export/
```

Open `index.html` directly for a quick preview, or serve the folder with any static web server. The store buttons link to the original Google Play and App Store listings. Contact details and social links are placeholders retained from the public-facing reference and should be replaced with the production accounts before launch.

To run the mobile app, open a terminal in `mobile-app`, run `npm install`, then `npm start`. Use `npm run web` for the browser preview. The app includes Dashboard, Send Money, Cash-In, Bank Transfer, Pay Bills and E-Load flows with local interaction and navigation; production authentication, payments, biller APIs and account data still need a backend connection.
