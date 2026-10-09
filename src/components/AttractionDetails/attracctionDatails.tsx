import jsonData from "@/components/data/attraction.json";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonsIcons from "../Buttons/buttons";
import TextSection from "../MiddleSectionText/textSection";
import { styles } from "./detailsStyles";
const AttractionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const placeholder = { uri: "https://picsum.photos/400/300" };
  const item = jsonData.find((entry) => entry.id.toString() === id);
  console.log(item?.address);
  // console.log("item", item);
  const mainImage = item?.images?.[0];
  const imageSource = mainImage ? { uri: mainImage } : placeholder;
  //Sliced mages
  const slicedImages = item?.images?.length ? item.images.slice(0, 5) : [];
  const diffImages = (item?.images?.length ?? 0) - slicedImages.length;
  console.log(item?.images?.length);
  //navigation
  const router = useRouter();
  const handleBackPress = () => {
    router.back();
  };
  //gallery route
  const handleGalleryPress = () => {
    router.push({
      //@ts-ignore
      pathname: "/gallery",
      params: {
        id: id,
      },
    });
  };
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
        <View style={styles.header}>
          <ButtonsIcons icon="arrow-left" handleBackPress={handleBackPress} />
          <ButtonsIcons icon="share" />
        </View>
        <Pressable style={styles.footer} onPress={handleGalleryPress}>
          {slicedImages.map((image, index) => (
            <View key={index}>
              <Image source={{ uri: image }} style={styles.miniImage} />
              {diffImages > 0 && index === slicedImages.length - 1 ? (
                <View style={styles.moreImagesContainer}>
                  <Text style={styles.moreImages}>{`+${diffImages}`}</Text>
                </View>
              ) : null}
            </View>
          ))}
        </Pressable>
      </ImageBackground>
      <TextSection
        title={item.name}
        price={item.entry_price}
        city={item.city}
      />
    </SafeAreaView>
  );
};

export default AttractionDetails;
