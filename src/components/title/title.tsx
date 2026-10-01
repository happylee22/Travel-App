import { Text, View } from "react-native";
import { styles } from "./styles";
type Props = {
  text: string;
  style?: any;
};
const Title = ({ text, style }: Props) => {
  return (
    <View>
      <Text style={[styles.text, style]}>{text}</Text>
    </View>
  );
};

export default Title;
