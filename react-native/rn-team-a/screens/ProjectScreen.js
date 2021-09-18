import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProjectScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>This is Project Screen!</Text>
    </View>
  );
};

export default ProjectScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
