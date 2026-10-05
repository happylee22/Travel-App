import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  handleBackPress?: () => void;

  icon?: ComponentProps<typeof Feather>["name"];
};
const ButtonsIcons = ({ handleBackPress, icon }: Props) => {
  return (
    <View>
      <Pressable style={styles.header} onPress={handleBackPress} hitSlop={8}>
        <Feather name={icon} size={20} color="black" style={styles.backIcon} />
      </Pressable>
    </View>
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
