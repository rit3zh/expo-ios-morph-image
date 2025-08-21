import ExpoModulesCore

public class ExpoiOSMorphImageModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoiOSMorphImage")
      
      View(ExpoiOSMorphImageView.self)
  }
}
