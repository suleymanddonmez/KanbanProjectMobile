import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import { ThemedView } from "@/components/ThemedView";

interface MainWrapperType {
  children: React.ReactNode;
}

export function MainWrapper({ children }: MainWrapperType) {
  const isAndroid = Platform.OS === "android";
  if (isAndroid) {
    return <ThemedView style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>{children}</ThemedView>;
  } else {
    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
