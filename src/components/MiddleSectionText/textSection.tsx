import jsonData from "@/components/data/attraction.json";
import InfoCardScreen from "@/components/infoCard/infoScreen";
import { useLocalSearchParams } from "expo-router";
import { type LucideProps } from "lucide-react-native";
import { Text, View } from "react-native";
import MapView from "react-native-maps";
import Title from "../title/title";
import { styles } from "./textStyles";
type LucideIcon = React.FC<LucideProps>;

type Props = {
  title: string;
  price: number | string;
  city: string;
};
const TextSection = ({ title, price, city }: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = jsonData.find((entry) => entry.id.toString() === id);
  console.log(item?.address);
  return (
    <View>
      {/* First Child */}
      <View style={styles.headerContainer}>
        <View>
          <Title text={title} style={styles.text} />
          <Text style={styles.city}>{city}</Text>
        </View>
        <Title text={`${price}`} style={styles.text} />
      </View>

      {/* second Child */}
      <View>
        <InfoCardScreen
          text={item?.address ?? "No Address"}
          image={require("@/assets/images/location_circle.png")}
        />
        <InfoCardScreen
          text={`OPEN 
${item?.opening_time} - ${item?.closing_time}`}
          image={require("@/assets/images/schedule.png")}
        />
      </View>
      <MapView
        style={{ width: 100, height: 100 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default TextSection;
