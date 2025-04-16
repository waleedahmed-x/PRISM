import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LootboxLanding from "./LootboxLanding";
import ShardsConvert from "./subscreens/ShardsConvert";

export default function Lootbox() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="LootboxLanding"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "white",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="LootboxLanding"
        component={LootboxLanding}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="Shards Convert"
        component={ShardsConvert}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
    </Stack.Navigator>
  );
}
