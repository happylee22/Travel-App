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
    alignItems: "center",
  },
  header: {
    width: "100%",
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
    margin: 16,
    backgroundColor: "rgba(256, 256, 256, 0.38)",
    borderRadius: 15,
    paddingHorizontal: 8,
  },
  miniImage: {
    width: 36,
    height: 36,
    margin: 8,
    borderRadius: 10,
  },
  moreImages: {
    color: "#fff",
    fontWeight: "bold",
    position: "absolute",
    top: 15,
    left: 15,
    fontSize: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 4,
    borderRadius: 4,
  },
});
