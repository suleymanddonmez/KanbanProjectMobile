import { ScrollView, type ScrollViewProps, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps &
  ScrollViewProps & {
    lightColor?: string;
    darkColor?: string;
    isScrollable?: boolean;
  };

export function ThemedView({ style, lightColor, darkColor, isScrollable = false, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  if (isScrollable) {
    return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
  } else {
    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
  }
}
