import { type LucideProps } from "lucide-react-native";
import { Image, ImageSourcePropType, Text, View } from "react-native";

import React from "react";
import { styles } from "./info";
type LucideIcon = React.FC<LucideProps>;
const placeholder =
  "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg";
type Props = {
  text: string;
  image?: ImageSourcePropType | undefined;
  active?: string;
};
const InfoCardScreen = ({ text, image, active }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? image : { uri: placeholder }}
        style={styles.image}
      />

      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
export default InfoCardScreen;
