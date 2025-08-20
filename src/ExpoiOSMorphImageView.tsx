import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoiOSMorphImageViewProps } from './ExpoiOSMorphImage.types';

const NativeView: React.ComponentType<ExpoiOSMorphImageViewProps> =
  requireNativeView('ExpoiOSMorphImage');

export default function ExpoiOSMorphImageView(props: ExpoiOSMorphImageViewProps) {
  return <NativeView {...props} />;
}
