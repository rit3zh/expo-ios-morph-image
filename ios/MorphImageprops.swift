import ExpoModulesCore
import SwiftUI

class ExpoiOSMorphImageViewProps: ExpoSwiftUI.ViewProps {
    // Image configuration
    @Field var icons: [[String: Any]] = []
    @Field var morphingImageDuration:Double = 1.0
    @Field var blurRadius:Double = 2.0
    @Field var index: Int = 0
}
