import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ApiScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>This is API screen! </Text>
    </View>
  );
};

export default ApiScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
