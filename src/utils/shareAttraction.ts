import * as FileSystem from "expo-file-system/legacy";
import Share from "react-native-share";

type Attraction = {
  id: number | string;
  name: string;
  city: string;
  images?: string[];
};

export const shareAttraction = async (
  item?: Attraction,
  onReady?: () => void,
) => {
  const mainImage = item?.images?.[0];

  try {
    if (!item || !mainImage) {
      console.log("STOP: no item or image", { item: !!item, mainImage });
      return;
    }

    const safeName = item.name
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "");
    const target = `${FileSystem.cacheDirectory}${safeName}.jpg`;

    console.log("1. Downloading:", mainImage);
    const result = await FileSystem.downloadAsync(mainImage, target);
    console.log("2. Download status:", result.status, "uri:", result.uri);

    if (result.status !== 200) {
      console.log("STOP: download failed with status", result.status);
      return;
    }

    console.log("3. Opening share sheet");
    onReady?.();
    await Share.open({
      title: item.name,
      message: `Check out ${item.name} in ${item.city}!\nDownload the image: ${mainImage}`,
      url: result.uri,
      type: "image/jpeg",
      filename: safeName,
      failOnCancel: false,
    });
  } catch (err) {
    console.log("ERROR:", err);
  }
};
