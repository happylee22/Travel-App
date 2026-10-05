import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  background: {
    width: "100%",
    height: height / 2,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  parentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "rgba(256, 256, 256, 0.35)",
    marginBottom: 16,
  },
  miniImage: {
    width: 40,
    height: 40,
    margin: 4,
    borderRadius: 10,
  },
});
