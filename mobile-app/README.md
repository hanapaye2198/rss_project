# iCASH mobile app

React Native / Expo TypeScript rebuild of the supplied iCASH mobile references.

## Included flows

- Dashboard with balance, wallet actions and activities
- Send Money
- Cash-In
- Bank Transfer
- Pay Bills category grid
- E-Load network selection

## Run locally

```bash
npm install
npm start
```

Then scan the Expo QR code with Expo Go, or use `npm run android`, `npm run ios`, or `npm run web` for a browser preview.

The demo provider keeps wallet state in memory: successful transfers, cash-ins, bank transfers, bill payments and E-Load purchases update the balance and appear in Dashboard activity history. Account persistence, payments, QR scanning, biller APIs and authentication still need to be connected to the production backend.
