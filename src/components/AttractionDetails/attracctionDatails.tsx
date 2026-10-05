import jsonData from "@/components/data/attraction.json";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonsIcons from "../Buttons/buttons";
import { styles } from "./detailsStyles";
const AttractionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = jsonData.find((entry) => entry.id.toString() === id);
  const mainImage = item?.images?.[0];
  const imageSource = mainImage ? { uri: mainImage } : undefined;
  const router = useRouter();
  const handleBackPress = () => {
    router.back();
  };
  const placeholder = { uri: "https://picsum.photos/400/300" };
  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Item not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ margin: 32 }}>
      <ImageBackground
        source={imageSource}
        style={styles.background}
        resizeMode="cover"
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.parentView}>
          <ButtonsIcons icon="arrow-left" handleBackPress={handleBackPress} />
          <ButtonsIcons icon="share" />
        </View>
        <View style={styles.footer}>
          {item?.images?.length ? (
            item.images.map((img) => (
              <Image key={img} source={{ uri: img }} style={styles.miniImage} />
            ))
          ) : (
            <Image source={placeholder} style={styles.miniImage} />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AttractionDetails;
