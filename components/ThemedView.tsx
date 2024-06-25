import { ScrollView, type ScrollViewProps, View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedViewProps = ViewProps &
  ScrollViewProps & {
    lightColor?: string;
    darkColor?: string;
    isScrollable?: boolean;
    themeColorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
  };

export function ThemedView({
  style,
  contentContainerStyle,
  className,
  lightColor,
  darkColor,
  themeColorName = "background",
  isScrollable = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, themeColorName);
  let viewStyle = style;
  if (!className?.includes("bg-")) {
    viewStyle = [{ backgroundColor }, style];
  }
  if (isScrollable) {
    return <ScrollView style={viewStyle} contentContainerStyle={contentContainerStyle} className={className} {...otherProps} />;
  } else {
    return <View style={[viewStyle, contentContainerStyle]} className={className} {...otherProps} />;
  }
}
