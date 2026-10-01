import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  Card: {
    padding: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 15,
    marginBottom: 12,
  },
  image: {
    width: (width - 96) / 2,
    height: 120,
    borderRadius: 15,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 4,
  },
  subTitle: {
    fontSize: 10,
    fontWeight: "400",
    marginLeft: 4,
  },
  subView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
});
