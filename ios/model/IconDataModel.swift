//
//  IconDataModel.swift
//  Pods
//
//  Created by rit3zh CX on 8/21/25.
//
import SwiftUI

struct IconData {
    let name: String
    let size: CGFloat
    let tint: String?

    init?(from dictionary: [String: Any]) {
        guard let name = dictionary["name"] as? String else { return nil }
        self.name = name
        self.size = (dictionary["size"] as? CGFloat) ?? 128
        self.tint = dictionary["tint"] as? String
    }
}
