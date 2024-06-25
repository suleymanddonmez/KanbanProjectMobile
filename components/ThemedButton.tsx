import React from "react";
import { TouchableHighlight, type TouchableHighlightProps, StyleSheet, ViewStyle, StyleProp } from "react-native";

export type ThemedButtonProps = TouchableHighlightProps & {
  buttonStyle?: StyleProp<ViewStyle>;
  size?: "medium" | "small";
  type?: "custom" | "default";
  color?: "indigo" | "info" | "error" | "warning" | "success";
};

export const ThemedButton = React.forwardRef<TouchableHighlight, ThemedButtonProps>(
  ({ style, size = "medium", type = "custom", color = "indigo", ...rest }, ref) => {
    return (
      <TouchableHighlight
        ref={ref}
        style={[styles?.[type], styles?.[color], styles?.[size], style]}
        activeOpacity={0.6}
        underlayColor={"rgb(82,82,82)"}
        {...rest}
      />
    );
  }
);

const styles = StyleSheet.create({
  default: {},
  custom: {},
  indigo: {
    backgroundColor: "rgb(99,102,241)",
  },
  info: {
    backgroundColor: "rgb(14,165,233)",
  },
  error: {
    backgroundColor: "rgb(239,68,68)",
  },
  warning: {
    backgroundColor: "rgb(234,179,8)",
  },
  success: {
    backgroundColor: "rgb(16,185,129)",
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
