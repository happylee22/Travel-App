import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 32,
  },
  subtitle: {
    fontSize: 20,
    color: "#000000",
    marginTop: 40,
    marginBottom: 18,
  },
  scrollView: {
    flex: 1,
  },
  attractContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export const ArraysOfCategories = [
  "All",
  "Popular",
  "Recommended",
  "Most Viewed",
  "Most Visited",
  "Most Liked",
  "Most Commented",
];
