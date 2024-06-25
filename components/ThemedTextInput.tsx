import React from "react";
import { TextInput, type TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export type ThemedTextInputProps = TextInputProps & {
  label: string;
  lightColor?: string;
  darkColor?: string;
  type?: "text" | "textarea" | "select";
};

export const ThemedTextInput = React.forwardRef<TextInput, ThemedTextInputProps>(
  ({ style, className, label, lightColor, darkColor, type = "text", ...rest }, ref) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    let viewStyle = [{ color }, style];
    if (!className?.includes("bg-")) {
      viewStyle = [{ backgroundColor }, viewStyle];
    }

    return (
      <ThemedView className="bg-transparent my-2">
        <ThemedText type="defaultSemiBold">{label}</ThemedText>
        <TextInput
          style={[viewStyle, {
            borderWidth: 1,
            // paddingTop: 15,
            // paddingBottom: 15,
            // paddingLeft: 10,
            // paddingRight: 10,
          }]}
          className={`mt-2 px-3 py-5 rounded-xl ${className || ""}`}
          multiline={type == "textarea"}
          numberOfLines={type == "textarea" ? 4 : 1}
          {...rest}
        />
      </ThemedView>
    );
  }
);
