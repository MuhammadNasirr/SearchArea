# 📱 React Native Location Picker App

A clean, responsive mobile app built with [**React Native**](https://reactnative.dev) and [`@react-native-community/cli`](https://github.com/react-native-community/cli).  
This app integrates **Google Maps & Places API** to provide intuitive location search, display, and history tracking.

---

## 🚀 Key Features

- 🔍 Real-time location search using **Google Places Autocomplete API**
- 🗺️ Interactive **Google Map** with live marker updates
- 🧾 Displays detailed information: **Place Name, Address, Latitude & Longitude**
- 🕘 Maintains **local history of searched places** with persistent storage
- 🎨 Smooth user experience with animations & custom modals
- 💾 Efficient state management and local storage using **`AsyncStorage`**

---

## 🛠 Getting Started

> ✅ **Before you begin:** Ensure your environment is configured according to the official [React Native setup guide](https://reactnative.dev/docs/environment-setup).

### 📦 Install Dependencies

```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

---

## ▶️ Running the Application

### 1️⃣ Start Metro Server

```bash
npm start
# or
yarn start
```

### 2️⃣ Run on Android

```bash
npm run android
# or
yarn android
```

### 3️⃣ Run on iOS (macOS Only)

```bash
cd ios
bundle install
bundle exec pod install
cd ..

npm run ios
# or
yarn ios
```

> 📱 Once the app launches, any saved changes will auto-refresh via [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

---

## ✏️ Modify the App

To get started with development, open `App.tsx` or explore the following key files:

### 🧪 Simplified Project Structure

```
src/
├── components/
│   ├── CustomPlacesSearch.tsx
│   ├── DetailsCard.tsx
│   └── HistoryModal.tsx
├── hooks/
├── utils/
├── assets/
└── App.tsx

android/
ios/
.env
package.json
README.md
```

---

## ❗ Troubleshooting

If you run into issues during development or build, refer to the [official troubleshooting guide](https://reactnative.dev/docs/troubleshooting).

---

## 📚 Useful Resources

- 📘 [React Native Documentation](https://reactnative.dev)
- 🌍 [Google Maps Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- 💾 [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)
- 🗺️ [react-native-maps](https://github.com/react-native-maps/react-native-maps)

---

## 🤝 Contributing

Contributions, suggestions, and pull requests are welcome!  
If proposing major changes, please open an issue first to discuss your ideas.

---

## 📝 License

This project is licensed under the **MIT License** — feel free to use it for your own apps.