import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image, Text, View } from "react-native";
import { styles } from "./atractionStyles";

type Props = {
  imageSrc: any;
  title: string;
  subTitle: string;
  style?: any;
};
const AttractionCard = ({ imageSrc, title, subTitle, style }: Props) => {
  return (
    <View style={[styles.Card, style]}>
      <Image source={{ uri: imageSrc }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.subView}>
        <MaterialCommunityIcons
          name="map-marker-radius-outline"
          size={20}
          color="gray"
        />
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default AttractionCard;
