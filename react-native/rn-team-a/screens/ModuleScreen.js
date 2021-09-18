import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ModuleScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>This is Module Screen!</Text>
    </View>
  );
};

export default ModuleScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
