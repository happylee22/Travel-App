import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import AttractionCard from "../AttractionCard/attractionCard";
import Categories from "../Categories/categories";
import jsonData from "../data/attraction.json";
import Title from "../title/title";
import { ArraysOfCategories, styles } from "./styles";

const Home = () => {
  const [selectCategory, setSelectCategory] = useState<string>("All");
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setData(jsonData);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ListHeaderComponent={
          <View>
            <Title text="Where Do" style={{ fontWeight: "normal" }} />
            <Title text="You Want To Go?" />
            <Title text="Explore Attractions" style={styles.subtitle} />
            <Categories
              selectCategory={selectCategory}
              onCategoryPress={setSelectCategory}
              categories={ArraysOfCategories}
            />
          </View>
        }
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <AttractionCard
            key={item.id}
            style={index % 2 === 0 ? { marginRight: 12 } : null}
            imageSrc={item.images?.length ? item.images[0] : null}
            title={item.name}
            subTitle={item.city}
          />
        )}
      />
    </View>
  );
};

export default Home;
