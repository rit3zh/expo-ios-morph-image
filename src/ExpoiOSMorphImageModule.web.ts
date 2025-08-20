import { registerWebModule, NativeModule } from 'expo';

import { ExpoiOSMorphImageModuleEvents } from './ExpoiOSMorphImage.types';

class ExpoiOSMorphImageModule extends NativeModule<ExpoiOSMorphImageModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoiOSMorphImageModule, 'ExpoiOSMorphImageModule');
