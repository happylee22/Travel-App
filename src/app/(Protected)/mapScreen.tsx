import jsonData from "@/components/data/attraction.json";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
const { width } = Dimensions.get("window");
export default function MapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = jsonData.find((entry) => entry.id.toString() === id);
  const router = useRouter();
  const handleBackPress = () => {
    router.back();
  };
  const cords = {
    latitude: item?.coordinates?.lat ?? 37.78825,
    longitude: item?.coordinates?.lon ?? -122.4324,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  };
  return (
    <View style={styles.container}>
      <MapView initialRegion={cords} style={styles.map}>
        <Marker
          coordinate={{
            latitude: cords.latitude,
            longitude: cords.longitude,
          }}
          title={item?.name}
          // image={{ uri: "custom_pin" }}
        />
      </MapView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            source={require("@/assets/images/back.png")}
            style={styles.back}
          />
        </TouchableOpacity>

        <Text style={styles.title}>{`${item?.name}, ${item?.city}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: "100%",
    height: "100%",
  },
  header: {
    width: width - 48,
    position: "absolute",
    top: 20,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    padding: 16,
    margin: 24,
    flex: 1,
    alignItems: "center",
  },
  back: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    color: "#000",
  },
});
