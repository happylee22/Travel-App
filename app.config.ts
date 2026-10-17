export default {
  expo: {
    name: "Travel-App",
    slug: "Travel-App",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/travelLogo.png",
    scheme: "Travel-App",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/images/travelLogo.png",
    },
    android: {
      package: "com.happinky.app",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_KEY,
        },
      },
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/travelLogo.png",
        backgroundImage: "./assets/images/travelLogo.png",
        monochromeImage: "./assets/images/travelLogo.png",
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: "./assets/images/travelLogo.png",
    },
    plugins: [
      "expo-router",
      "@clerk/expo",
      "expo-secure-store",

      [
        "expo-splash-screen",
        {
          backgroundColor: "#208AEF",
          image: "./assets/images/travelLogo.png",
          imageWidth: 76,
        },
      ],
      [
        "react-native-maps",

        {
          iosGoogleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_KEY,
          androidGoogleMapsApiKey:
            process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_KEY,
        },
      ],
      [
        "react-native-share",
        {
          ios: ["fb", "instagram", "twitter", "tiktoksharesdk"],
          android: [
            "com.facebook.katana",
            "com.instagram.android",
            "com.twitter.android",
            "com.zhiliaoapp.musically",
          ],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "71915ae7-e7ce-4957-a5dc-0a35c00f9b23",
      },
    },
  },
};
