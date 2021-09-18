import React from "react";
import { View, Text } from "react-native";

const UserAddressScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>This is UserAddressScreen!</Text>
    </View>
  );
};

export default UserAddressScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
