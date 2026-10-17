import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const tint = useThemeColor({}, "tint");

  return (
    <Text
      {...rest}
      style={[styles[type], { color: type === "link" ? tint : color }, style]}
    />
  );
}

const styles = StyleSheet.create({
  default: {},
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  defaultSemiBold: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
  },
});
