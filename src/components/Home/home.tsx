import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import AttractionCard from "../AttractionCard/attractionCard";
import Categories from "../Categories/categories";
import jsonData from "../data/attraction.json";
import Title from "../title/title";
import { ArraysOfCategories, styles } from "./styles";

const Home = () => {
  const router = useRouter();
  const [selectCategory, setSelectCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setData(jsonData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (selectCategory === "All") {
      setData(jsonData);
    } else {
      const filteredData = jsonData.filter((item: any) =>
        item.categories.includes(selectCategory),
      );
      setData(filteredData);
    }
  }, [selectCategory]);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />

        <Text style={{ marginTop: 10 }}>Loading attractions...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ListEmptyComponent={<Text style={styles.emptyText}>No Item found</Text>}
        ListHeaderComponent={
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Title text="Where Do" style={{ fontWeight: "normal" }} />
              <Pressable onPress={() => router.push("/profileScreen")}>
                <AntDesign name="setting" size={25} color={"#4681A3"} />
              </Pressable>
            </View>
            <Title text="You Want To Go?" />
            <Title text="Explore Attractions" style={styles.subtitle} />
            <Categories
              selectCategory={selectCategory}
              onCategoryPress={setSelectCategory}
              categories={ArraysOfCategories}
            />
          </>
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
            onPress={() =>
              router.push({
                pathname: "/[id]",
                params: { id: String(item.id) },
              })
            }
          />
        )}
      />
    </View>
  );
};

export default Home;
