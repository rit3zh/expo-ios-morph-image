import * as React from 'react';

import { ExpoiOSMorphImageViewProps } from './ExpoiOSMorphImage.types';

export default function ExpoiOSMorphImageView(props: ExpoiOSMorphImageViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
