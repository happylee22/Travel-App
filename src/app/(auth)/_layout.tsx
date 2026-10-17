import { useThemeColor } from "@/hooks/use-theme-color";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const backgroundColor = useThemeColor({}, "background");

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/homeScreen" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
        contentStyle: { backgroundColor },
      }}
    />
  );
}
