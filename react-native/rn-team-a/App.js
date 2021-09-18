import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Header from "./components/Header";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Colors from "./constants/color";

import AppHomeScreen from "./screens/AppHomeScreen";
import ProjectScreen from "./screens/ProjectScreen";
import ModuleScreen from "./screens/ModuleScreen";
import ApiScreen from "./screens/ApiScreen";
import UserScreen from "./screens/UserScreen";
import UserAddressScreen from "./screens/UserAddressScreen";
import { NavigationContainer } from "@react-navigation/native";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const Drawer = createDrawerNavigator();

  return (
    
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.header },
         
          fontWeight: "bold",
        }}
      >
        <Drawer.Screen name="Home" component={AppHomeScreen} />
        <Drawer.Screen name="Project" component={ProjectScreen} />
        <Drawer.Screen name="API" component={ApiScreen} />
        <Drawer.Screen name="Modules" component={ModuleScreen} />
        <Drawer.Screen name="Users" component={UserScreen} />
        <Drawer.Screen name="User Address" component={UserAddressScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  textTitle: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  headerColor: {
    backgroundColor: Colors.header,
  },
});
