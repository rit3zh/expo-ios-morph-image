import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import { MorphSfSymbolView, SymbolIcon } from "expo-ios-morph-symbol";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";

const { width, height } = Dimensions.get("window");

interface OnboardingStep {
  icon: SymbolIcon;
  title: string;
  subtitle: string;
  description: string;
}

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const onboardingSteps: OnboardingStep[] = [
    {
      icon: {
        name: "sparkles",
        size: 100,
        tint: "white",
      },
      title: "Welcome",
      subtitle: "Get Started",
      description:
        "Discover amazing features and unlock your potential with our intuitive platform.",
    },
    {
      icon: {
        name: "star.fill",
        size: 100,
        tint: "white",
      },
      title: "Explore",
      subtitle: "Find Your Way",
      description:
        "Navigate through powerful tools designed to enhance your productivity and creativity.",
    },
    {
      icon: {
        name: "bolt.fill",
        size: 100,
        tint: "white",
      },
      title: "Accelerate",
      subtitle: "Move Fast",
      description:
        "Experience lightning-fast performance with cutting-edge technology at your fingertips.",
    },
    {
      icon: {
        name: "gauge.open.with.lines.needle.33percent.and.arrowtriangle.from.0percent.to.50percent",
        size: 100,
        tint: "white",
      },
      title: "Ready",
      subtitle: "Let's Begin",
      description:
        "You're all set! Start your journey and make the most of every opportunity.",
    },
  ];

  const handleNext = (): void => {
    // Fade out text content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Update index after fade out
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < onboardingSteps.length ? nextIndex : 0;
      });

      // Fade in new text content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSkip = (): void => {
    console.log("Skip onboarding");
  };

  const handleGetStarted = (): void => {
    setCurrentIndex(0);
  };

  useEffect(() => {
    // Initial animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    // Update progress animation
    Animated.timing(progressAnim, {
      toValue: (currentIndex + 1) / onboardingSteps.length,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  const currentStep = onboardingSteps[currentIndex];
  const isLastStep = currentIndex === onboardingSteps.length - 1;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#0a0a0a", "#1a1a1a", "#0f0f0f"]}
          locations={[0, 0.4, 1]}
          style={styles.gradient}
        >
          {/* Skip Button */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
              <SymbolView
                name="xmark"
                size={12}
                tintColor="#888"
                style={styles.skipIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <View style={styles.stepIndicator}>
              <Text style={styles.progressText}>
                Step {currentIndex + 1} of {onboardingSteps.length}
              </Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Icon Container */}
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <View style={styles.iconGlow} />
                <MorphSfSymbolView
                  index={currentIndex}
                  icons={onboardingSteps.map((step) => step.icon)}
                  blurRadius={0}
                  morphingImageDuration={0.5}
                />
              </View>
            </View>

            {/* Text Content */}
            <View style={styles.textContainer}>
              <View style={styles.subtitleContainer}>
                <View style={styles.subtitleDot} />
                <Text style={styles.subtitle}>{currentStep.subtitle}</Text>
              </View>
              <Text style={styles.title}>{currentStep.title}</Text>
              <Text style={styles.description}>{currentStep.description}</Text>
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            {/* Pagination Dots */}
            <View style={styles.pagination}>
              {onboardingSteps.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentIndex && styles.activeDot,
                    index < currentIndex && styles.completedDot,
                  ]}
                />
              ))}
            </View>

            {/* Action Button */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={isLastStep ? handleGetStarted : handleNext}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#ffffff", "#f8f8f8", "#eeeeee"]}
                locations={[0, 0.5, 1]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {isLastStep ? "Get Started" : "Continue"}
                </Text>
                <View style={styles.buttonIconContainer}>
                  <SymbolView
                    name={
                      isLastStep
                        ? "checkmark.circle.fill"
                        : "arrow.right.circle.fill"
                    }
                    size={20}
                    tintColor="black"
                    style={styles.buttonIcon}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  gradient: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  skipText: {
    color: "#999",
    fontSize: 15,
    fontWeight: "500",
    marginRight: 6,
  },
  skipIcon: {
    opacity: 0.7,
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  stepIndicator: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  progressText: {
    color: "#aaa",
    fontSize: 13,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 64,
    alignItems: "center",
  },
  iconBackground: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.08)",
    position: "relative",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  iconGlow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 8,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  subtitleDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#fff",
    marginRight: 8,
    opacity: 0.7,
  },
  subtitle: {
    fontSize: 14,
    color: "#bbb",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 17,
    color: "#aaa",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "400",
    maxWidth: 320,
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 48,
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    marginBottom: 48,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 32,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  completedDot: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  actionButton: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    letterSpacing: 0.5,
  },
  buttonIconContainer: {
    marginLeft: 12,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    opacity: 0.8,
  },
});
