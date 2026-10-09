import GalleryScreen from "@/components/Gallery/GalleryScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Gallery = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GalleryScreen />
    </SafeAreaView>
  );
};

export default Gallery;
