import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>This is User Screen!</Text>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
