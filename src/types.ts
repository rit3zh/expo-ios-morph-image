import { StyleProp, type ViewStyle } from "react-native";
import type { SFSymbol } from "sf-symbols-typescript";

export interface SymbolIcon {
  name: SFSymbol;
  size?: number;
  tint?: string;
}

export interface ExpoiOSMorphImageViewProps {
  icons?: SymbolIcon[];
  index: number;
  style?: StyleProp<ViewStyle>;
  morphingImageDuration?: number;
  blurRadius?: number;
}
