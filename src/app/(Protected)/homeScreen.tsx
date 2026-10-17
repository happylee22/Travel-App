import { useFocusEffect } from "expo-router";
import React from "react";
import Home from "@/components/Home/home";
import { BackHandler, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          BackHandler.exitApp();
          return true;
        },
      );

      return () => subscription.remove();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
