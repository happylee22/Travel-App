import jsonData from "@/components/data/attraction.json";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const GalleryScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = jsonData.find((entry) => entry.id.toString() === id);
  console.log("item", item);
  return (
    <View>
      <Text>{item?.name}</Text>
      <Text>{item?.categories}</Text>
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({});
