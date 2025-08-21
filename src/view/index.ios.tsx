import * as React from "react";
import { NativeView } from "../naitve-view/index.ios";
import { ExpoiOSMorphImageViewProps } from "../types";
import { type ViewStyle } from "react-native";

const transformInitialViewStyles = (styles: ViewStyle): ViewStyle => {
  if (styles) {
    return { ...styles };
  } else {
    return {
      width: 200,
      height: 200,
    };
  }
};

export const MorphSfSymbolView: React.FC<ExpoiOSMorphImageViewProps> &
  React.FunctionComponent<ExpoiOSMorphImageViewProps> = React.memo(
  (
    props: ExpoiOSMorphImageViewProps
  ): React.ReactNode & React.JSX.Element & React.ReactElement => {
    return (
      <NativeView
        {...props}
        style={{
          ...transformInitialViewStyles(props?.style as ViewStyle),
        }}
      />
    );
  }
);

MorphSfSymbolView.displayName = "MorphSfSymbolView";
