# 🔮 Morphing SF Symbols for Expo (React Native)

**✨ Bring your iOS app to life with fluid SF Symbol transitions!**

---

## 🚀 Why use this?

- 🎨 **Beautiful native animation** – Apple-like morph transitions
- ⚡ **High performance** – Built on SwiftUI & Canvas
- 🛠 **Customizable** – Colors, sizes, duration & blur
- 🔗 **Expo-ready** – Works seamlessly with Expo projects

---

## 📦 Installation

```bash
npm install expo-ios-morph-symbol
# or
yarn add expo-ios-morph-symbol
```

---

## 🔑 Props

| Prop                    | Type                   | Default | Description                       |
| ----------------------- | ---------------------- | ------- | --------------------------------- |
| `icons`                 | `SymbolIcon[]`         | `[]`    | List of SF Symbols with config    |
| `index`                 | `number`               | `0`     | The active icon index to display  |
| `style`                 | `StyleProp<ViewStyle>` | `-`     | Custom style for the container    |
| `morphingImageDuration` | `number`               | `0.5`   | Animation duration in **seconds** |
| `blurRadius`            | `number`               | `-`     | Optional extra blur effect        |

---

## 🔥 Usage

```tsx
import { ExpoiOSMorphImageView } from "expo-ios-morph-symbol";

export default function App() {
  const icons = [
    { name: "heart.fill", size: 80, tint: "red" },
    { name: "star.fill", size: 80, tint: "#FFD700" },
    { name: "bolt.fill", size: 80, tint: "blue" },
  ];

  return (
    <ExpoiOSMorphImageView
      icons={icons}
      index={1} // current active icon
      morphingImageDuration={0.8}
      blurRadius={10}
      style={{ alignItems: "center", justifyContent: "center" }}
    />
  );
}
```

--

## 🧠 How it Works?

- Uses **SwiftUI Canvas** and **alpha thresholding** for smooth shape transitions
- Animates blur & color using **native SwiftUI animations**
- React Native just updates the `index` → **SwiftUI handles the morph**

---

## 📜 License

MIT © 2025
