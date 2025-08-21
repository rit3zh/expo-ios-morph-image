//
//  view.swift
//  Pods
//
//  Created by rit3zh CX on 8/20/25.
//

import SwiftUI

private struct MorphingImageDurationKey: EnvironmentKey {
    static let defaultValue: Double = 1.0
}

extension EnvironmentValues {
    var morphingImageDuration: Double {
        get { self[MorphingImageDurationKey.self] }
        set { self[MorphingImageDurationKey.self] = newValue }
    }
}


public extension View {
    func morphingImageDuration(_ value: Double) -> some View {
        self.environment(\.morphingImageDuration, value)
    }
}
