import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

type Props = {
  handleBackPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: ComponentProps<typeof Feather>["name"];
};
const ButtonsIcons = ({ handleBackPress, icon, style }: Props) => {
  return (
    <Pressable
      style={[styles.header, style]}
      onPress={handleBackPress}
      hitSlop={8}
    >
      <Feather name={icon} size={20} color="black" style={styles.backIcon} />
    </Pressable>
  );
};

export default ButtonsIcons;

const styles = StyleSheet.create({
  backIcon: {},
  header: {
    backgroundColor: "#ffffff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
