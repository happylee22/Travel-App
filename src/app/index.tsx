import { useAuth } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Use a local image so it loads instantly and works offline:
// const bg = require("@/assets/images/welcome-bg.jpg");
const bg = {
  uri: "https://i.pinimg.com/736x/b8/b3/40/b8b340036fdc6f618efb980bb0a5d519.jpg",
};

export default function Welcome() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/homeScreen" />;
  }

  return (
    <ImageBackground source={bg} style={styles.background} resizeMode="cover">
      {/* dark overlay so the text stays readable */}
      <View style={styles.overlay} />

      <SafeAreaView style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Discover the world ✈️</Text>
          <Text style={styles.subtitle}>
            Explore famous attractions, save your favorites and share them with
            friends.
          </Text>
        </View>

        <View style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [
              styles.primary,
              pressed && { opacity: 0.85 },
            ]}
            onPress={() => router.push("/sign-up")}
          >
            <Text style={styles.primaryText}>Create account</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondary,
              pressed && { opacity: 0.85 },
            ]}
            onPress={() => router.push("/sign-in")}
          >
            <Text style={styles.secondaryText}>I already have an account</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { backgroundColor: "rgba(0,0,0,0.45)" },
  content: { flex: 1, justifyContent: "space-between", padding: 24 },
  textBlock: { marginTop: 80 },
  title: { color: "#fff", fontSize: 38, fontWeight: "800", lineHeight: 46 },
  subtitle: { color: "#E5E7EB", fontSize: 16, marginTop: 12, lineHeight: 24 },
  buttons: { gap: 12, marginBottom: 16 },
  primary: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#208AEF",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  secondary: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
