import SwiftUI

public struct MorphingImage: View {
    @Environment(\.morphingImageDuration)
    var duration
    let image: Image
    let name: String
    let color: Color
    
    
    @State private var blurRadius: Double = 0
    @State private var currentColor: Color
    @State private var currentTask: Task<Void, Error>?
    
    
    private var externalBlur: Double?
    
    public init(_ name: String, bundle: Bundle? = nil, color: Color = .primary, blurRadius: Double? = nil) {
        self.image = Image(name, bundle: bundle)
        self.name = name
        self.color = color
        self.externalBlur = blurRadius
        self._currentColor = State(initialValue: color)
    }
    
    public init(systemName: String, color: Color = .primary, blurRadius: Double? = nil) {
        self.image = Image(systemName: systemName)
        self.name = systemName
        self.color = color
        self.externalBlur = blurRadius
        self._currentColor = State(initialValue: color)
    }
    
    public var body: some View {
        GeometryReader { reader in
            let size = max(reader.size.width, reader.size.height)
            let autoBlur = min(size * 0.05, 20)
            
            Canvas { context, size in
                context.clipToLayer { context in
                    context.addFilter(.alphaThreshold(min: 0.5))
                    context.drawLayer { context in
                        let view = context.resolveSymbol(id: 0)!
                        context.draw(view, at: CGPoint(x: size.width / 2, y: size.height / 2))
                    }
                }
                context.fill(Path(CGRect(origin: .zero, size: size)), with: .foreground)
            } symbols: {
                symbol(forSize: reader.size).tag(0)
            }
            .foregroundStyle(currentColor)
            .onChange(of: image) { _ in
                startMorphTransition(autoBlur: autoBlur)
            }
            .onChange(of: color) { newColor in
                
                withAnimation(.easeInOut(duration: duration)) {
                    currentColor = newColor
                }
            }
        }
    }
    
    private func symbol(forSize size: CGSize) -> some View {
        ZStack {
            image
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: size.width, height: size.height)
                .id(name)
        }
        .animation(.easeInOut(duration: duration), value: name)
        .blur(radius: externalBlur ?? blurRadius)
    }
    
    private func startMorphTransition(autoBlur: Double) {
        guard externalBlur == nil else { return }
        
        currentTask?.cancel()
        currentTask = Task {
            let halfDuration = duration / 2
            
            
            withAnimation(.easeIn(duration: halfDuration)) {
                self.blurRadius = autoBlur
            }
            
            try await Task.sleep(nanoseconds: UInt64(Int64(duration * 500_000_000)))
            withAnimation(.easeOut(duration: halfDuration)) {
                self.blurRadius = 0
            }
        }
    }
}
