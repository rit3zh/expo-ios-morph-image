import * as React from "react";
import { requireNativeView } from "expo";
import type { ExpoiOSMorphImageViewProps } from "../types";

export const NativeView: React.ComponentType<ExpoiOSMorphImageViewProps> =
  requireNativeView("ExpoiOSMorphImage", "ExpoiOSMorphImageView");
