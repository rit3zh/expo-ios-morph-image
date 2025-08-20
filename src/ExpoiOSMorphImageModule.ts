import { NativeModule, requireNativeModule } from 'expo';

import { ExpoiOSMorphImageModuleEvents } from './ExpoiOSMorphImage.types';

declare class ExpoiOSMorphImageModule extends NativeModule<ExpoiOSMorphImageModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoiOSMorphImageModule>('ExpoiOSMorphImage');
