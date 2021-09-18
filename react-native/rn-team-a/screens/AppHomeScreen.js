import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AppHomeScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>This is App Home Screen!</Text>
      <Text>Welcome To BITS!</Text>
    </View>
  );
};

export default AppHomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
