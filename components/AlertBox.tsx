import { ActivityIndicator, Button } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { ThemedButton } from "./ThemedButton";

interface AlertBoxType {
  visible: boolean;
  text: string;
  status: "info" | "error" | "warning" | "success";
  onClose?: () => void;
}

const colors = {
  info: "sky",
  error: "red",
  warning: "yellow",
  success: "green",
};

export function AlertBox({ visible, text, status, onClose }: AlertBoxType) {
  return (
    <>
      {visible && (
        <ThemedView className={`p-4 mb-4 flex-row items-center justify-between rounded-xl bg-${colors[status]}-500`}>
          <ThemedText type="defaultSemiBold">{text}</ThemedText>
          {onClose && (
            <ThemedButton onPress={onClose} type="default" size="small">
              <ThemedText>X</ThemedText>
            </ThemedButton>
          )}
        </ThemedView>
      )}
    </>
  );
}
