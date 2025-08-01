# 📱 React Native Location Picker App

This project is a React Native mobile application built using [`@react-native-community/cli`](https://github.com/react-native-community/cli). The app integrates **Google Maps & Places API** to allow users to search, view, and save location history in a clean, performant UI.

---

## 🚀 Features

- 🔍 Place search with Google Places Autocomplete API  
- 🗺️ Interactive map with selected place marker  
- 🧾 Display detailed place information (name, address, coordinates)  
- 🕘 Maintains and persists location search history locally  
- 💡 Smooth UI with animations and modal views  
- 📦 Local storage using `AsyncStorage`  

---

## 🛠 Getting Started

> **Prerequisites:** Follow the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding.

### 📦 Install dependencies

```bash
npm install
# or
yarn install

▶️ Running the App
Step 1: Start Metro
bash
Copy
Edit
npm start
# or
yarn start
Step 2: Run on Android
bash
Copy
Edit
npm run android
# or
yarn android
Step 3: Run on iOS (macOS only)
bash
Copy
Edit
cd ios
bundle install
bundle exec pod install
cd ..
npm run ios
# or
yarn ios
✏️ Modifying the App
Edit App.tsx or any component inside /components or /screens. Changes will auto-refresh via Fast Refresh.

🧪 Project Structure (Simplified)
bash
Copy
Edit
├── src/
│   ├── components/
│   │   ├── CustomPlacesSearch.tsx
│   │   ├── DetailsCard.tsx
│   │   └── HistoryModal.tsx
│   ├── hooks/
│   ├── utils/
│   ├── assets/
│   └── App.tsx
├── android/
├── ios/
├── .env
├── package.json
└── README.md
❗ Troubleshooting
Check React Native Troubleshooting Guide for resolving common issues like build errors, Metro bundler failures, or device connectivity problems.

📚 Learn More
React Native Documentation

Google Maps API

AsyncStorage Docs

react-native-maps

🎉 Contributing
Pull requests and feedback are welcome! For major changes, please open an issue first to discuss what you would like to change.