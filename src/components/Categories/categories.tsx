import { FlatList, Text, TouchableOpacity } from "react-native";
import { styles } from "./categoryStyles";
type Props = {
  categories: string[];
  selectCategory: string;
  onCategoryPress: (category: string) => void;
};
const Categories = ({ categories, selectCategory, onCategoryPress }: Props) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      data={categories}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onCategoryPress(item)}
          style={[
            styles.itemContainer,
            selectCategory === item ? styles.selectedItemContainer : null,
          ]}
        >
          <Text
            style={[
              styles.item,
              selectCategory === item ? styles.selectedItem : null,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Categories;
