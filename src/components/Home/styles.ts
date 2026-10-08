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
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "rgba*(0, 0, 0, 0.5)",
  },
});

export const ArraysOfCategories = [
  "All",
  "Most Visited",
  "Historical",
  "Recommended",
  "Trending",
  "Popular",
];
