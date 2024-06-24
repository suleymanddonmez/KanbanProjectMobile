import React from "react";
import { TouchableHighlight, type TouchableHighlightProps, StyleSheet, ViewStyle, StyleProp } from "react-native";

export type ThemedButtonProps = TouchableHighlightProps & {
  buttonStyle?: StyleProp<ViewStyle>;
  size?: "medium" | "small";
  type?: "custom" | "default";
};

export const ThemedButton = React.forwardRef<TouchableHighlight, ThemedButtonProps>(({ style, size = "medium", type = "custom", ...rest }, ref) => {
  return (
    <TouchableHighlight ref={ref} style={[styles?.[type], styles?.[size], style]} activeOpacity={0.6} underlayColor={"rgb(82,82,82)"} {...rest} />
  );
});

const styles = StyleSheet.create({
  default: {},
  custom: {
    backgroundColor: "rgb(99,102,241)",
  },
  medium: {
    padding: 15,
    borderRadius: 10,
  },
  small: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
