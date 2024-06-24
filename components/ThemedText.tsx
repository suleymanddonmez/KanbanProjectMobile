import React from "react";
import { Text, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export const ThemedText = React.forwardRef<Text, ThemedTextProps>(({ style, className, lightColor, darkColor, type = "default", ...rest }, ref) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <Text style={[{ color }, style]} className={`${nativeWindStyles?.[type]} ${className || ""}`} {...rest} />;
});

const nativeWindStyles = {
  default: "text-base leading-normal",
  title: "text-3xl leading-8 font-bold",
  defaultSemiBold: "text-base leading-normal font-bold",
  subtitle: "text-lg leading-normal font-bold",
  link: "text-sm leading-7 underline",
};
