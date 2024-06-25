import React from "react";
import { Text, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  themeColorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export const ThemedText = React.forwardRef<Text, ThemedTextProps>(
  ({ style, className, lightColor, darkColor, themeColorName = "text", type = "default", ...rest }, ref) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, themeColorName);
    return <Text style={[{ color }, style]} className={`${nativeWindStyles?.[type]} ${className || ""}`} {...rest} />;
  }
);

const nativeWindStyles = {
  default: "text-base leading-normal",
  title: "text-3xl leading-8 font-bold",
  defaultSemiBold: "text-base leading-normal font-bold",
  subtitle: "text-lg leading-normal font-bold",
  link: "text-sm leading-7 underline",
};
