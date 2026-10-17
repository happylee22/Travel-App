import jsonData from "@/components/data/attraction.json";
import { shareAttraction } from "@/utils/shareAttraction";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonsIcons from "../Buttons/buttons";
import TextSection from "../MiddleSectionText/textSection";
import { styles } from "./detailsStyles";

const AttractionDetails = () => {
  const [sharing, setSharing] = useState(false);
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
  console.log("item=>", item);
  const cords = {
    latitude: item?.coordinates?.lat ?? 37.78825,
    longitude: item?.coordinates?.lon ?? -122.4324,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  };
  //Share Button Handler
  const handleSharePress = async () => {
    try {
      setSharing(true);

      await shareAttraction(item, () => {
        setSharing(false);
      });
    } catch (error) {
      console.log("Share failed:", error);
    } finally {
      setSharing(false);
    }
  };
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
  const handleMapPress = () => {
    router.push({
      //@ts-ignore
      pathname: "/mapScreen",
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={imageSource}
          style={styles.background}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.header}>
            <ButtonsIcons icon="arrow-left" handleBackPress={handleBackPress} />
            <Pressable
              onPress={handleSharePress}
              disabled={sharing}
              style={styles.shareIndicator}
            >
              {sharing ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                <ButtonsIcons icon="share" handleBackPress={handleSharePress} />
              )}
            </Pressable>
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
        <View style={styles.mapView}>
          <MapView style={styles.map} initialRegion={cords}>
            <Marker
              coordinate={{
                latitude: cords.latitude,
                longitude: cords.longitude,
              }}
              title={item.name}
              // image={{ uri: "custom_pin" }}
            />
          </MapView>
        </View>
        <Text style={styles.mapText} onPress={handleMapPress}>
          Show Full Screen Map
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AttractionDetails;
