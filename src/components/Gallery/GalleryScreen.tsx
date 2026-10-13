import jsonData from "@/components/data/attraction.json";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "./galerryStyle";

import { FlatList, Image, Text, View } from "react-native";
import ButtonsIcons from "../Buttons/buttons";

const GalleryScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = jsonData.find((entry) => entry.id.toString() === id);
  const router = useRouter();
  const handleBackPress = () => {
    router.back();
  };
  if (!item) {
    return <Text>Gallery not found</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={item.images}
        style={styles.flat}
        keyExtractor={(image, index) => `${image}-${index}`}
        renderItem={({ item: image }) => (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      />
      <ButtonsIcons
        style={styles.backContainer}
        icon="arrow-left"
        handleBackPress={handleBackPress}
      />
    </View>
  );
};

export default GalleryScreen;
