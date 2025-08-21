import ExpoModulesCore
import SwiftUI

struct ExpoiOSMorphImageView: ExpoSwiftUIView, ExpoSwiftUI.WithHostingView {
    @ObservedObject var props: ExpoiOSMorphImageViewProps
    
    @State private var index: Int = 0
    
    private var nextIndex: Int {
        guard !props.icons.isEmpty else { return 0 }
        return (index + 1) % props.icons.count
    }
    
    var body: some View {
        VStack(spacing: 16) {
            
            if !props.icons.isEmpty && props.icons.indices.contains(index) {
                let icon = props.icons[index]
                
                let iconName = icon["name"] as? String ?? "photo"
                let iconSize = icon["size"] as? CGFloat ?? 50
                let iconTint = icon["tint"] as? String ?? "#000000"
                let targetColor = Color(fromHex: iconTint)
                
                MorphingImage(systemName: iconName, color: targetColor)
                    .morphingImageDuration(props.morphingImageDuration)
                    .blur(radius: props.blurRadius)
                    .frame(width: iconSize, height: iconSize)
            } else {
                
                Image(systemName: "photo")
                    .foregroundStyle(.gray)
                    .frame(width: 50, height: 50)
            }
        }
        .onAppear {
            
            if !props.icons.isEmpty && props.icons.indices.contains(props.index) {
                index = props.index
            } else {
                index = 0
            }
        }
        .onChange(of: props.index) { newValue in
            if !props.icons.isEmpty && props.icons.indices.contains(newValue) {
                withAnimation(.easeInOut(duration: props.morphingImageDuration)) {
                    index = newValue
                }
            }
        }
    }
}


extension Color {
    init(fromHex hex: String) {
        let colorString = hex.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        
        
        switch colorString {
        case "red":
            self = .red
            return
        case "yellow":
            self = .yellow
            return
        case "blue":
            self = .blue
            return
        case "green":
            self = .green
            return
        case "orange":
            self = .orange
            return
        case "purple":
            self = .purple
            return
        case "pink":
            self = .pink
            return
        case "black":
            self = .black
            return
        case "white":
            self = .white
            return
        case "gray", "grey":
            self = .gray
            return
        case "brown":
            self = .brown
            return
        case "cyan":
            self = .cyan
            return
        case "mint":
            self = .mint
            return
        case "teal":
            self = .teal
            return
        case "indigo":
            self = .indigo
            return
        case "clear":
            self = .clear
            return
        default:
            
            break
        }
        
        
        let hexSanitized = colorString.uppercased()
        let cleanHex = hexSanitized.replacingOccurrences(of: "#", with: "")
        
        
        var rgb: UInt64 = 0
        
        if cleanHex.count == 3 {
            
            guard Scanner(string: cleanHex).scanHexInt64(&rgb) else {
                self.init(red: 0, green: 0, blue: 0, opacity: 0)
                return
            }
            
            let r = Double((rgb & 0xF00) >> 8) / 15.0
            let g = Double((rgb & 0x0F0) >> 4) / 15.0
            let b = Double(rgb & 0x00F) / 15.0
            
            self.init(red: r, green: g, blue: b)
        } else if cleanHex.count == 6 {
            // Standard 6-character hex
            guard Scanner(string: cleanHex).scanHexInt64(&rgb) else {
                self.init(red: 0, green: 0, blue: 0, opacity: 0)
                return
            }
            
            let r = Double((rgb & 0xFF0000) >> 16) / 255.0
            let g = Double((rgb & 0x00FF00) >> 8) / 255.0
            let b = Double(rgb & 0x0000FF) / 255.0
            
            self.init(red: r, green: g, blue: b)
        } else {
            
            self.init(red: 0, green: 0, blue: 0, opacity: 0)
        }
    }
}
