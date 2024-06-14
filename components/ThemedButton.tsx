import { TouchableHighlight, type TouchableHighlightProps, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = TouchableHighlightProps & {
  buttonStyle?: StyleProp<ViewStyle>;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedButton({ style, type = "default", ...rest }: ThemedButtonProps) {
  return <TouchableHighlight style={[styles.default, style]} activeOpacity={0.6} underlayColor={"rgb(82,82,82)"} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    padding: 15,
    backgroundColor: "rgb(99,102,241)",
    borderRadius: 10,
  },
});
