import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flat: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 400,
    marginTop: 40,
    borderRadius: 20,
  },
  backContainer: {
    position: "absolute",
    top: 50,
    left: 34,
    zIndex: 10,
    elevation: 5,
  },
});
