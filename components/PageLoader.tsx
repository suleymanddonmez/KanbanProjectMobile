import { ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface PageLoaderType {
  visible: boolean;
}

export function PageLoader({ visible }: PageLoaderType) {
  return (
    <>
      {visible && (
        <ThemedView className="justify-center items-center">
          <ActivityIndicator size="large" />
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      )}
    </>
  );
}
