import "fast-text-encoding";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { PrivyProvider } from "@privy-io/expo";
import Profile from "@screens/profile/Profile";
import Lootbox from "@/screens/lootbox/Lootbox";
import PrismArcade from "@screens/arcade/PrismArcade";
import Conditional from "@screens/landing/Conditional";
import EditProfile from "@screens/profile/EditProfile";
import { ChainProvider } from "@/contexts/chainContext";
import ContextProviders from "@/utils/ContextProviders";
import Game from "@screens/arcade/subscreens/GameScreen";
import { NavigationContainer } from "@react-navigation/native";
import ProfileSettings from "@screens/profile/ProfileSettings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <ChainProvider>
      <PrivyProvider
        // appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID}
        appId="clsp79e8b012fblj9e1qx8t3g"
        // clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}
        clientId="client-WY2hpRf9ry2nmH5PHcPP9Ts6AHF2MzPHaCpKN2tcn6Gwh"
        config={{
          embedded: {
            ethereum: {
              createOnLogin: "users-without-wallets",
            },
          },
        }}
      >
        <ContextProviders>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Landing"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#000",
                },
                headerTintColor: "white",
                headerBackTitleVisible: false,
              }}
            >
              <Stack.Screen
                name="Landing"
                component={Conditional}
                options={{
                  headerShown: false,
                  orientation: "portrait",
                }}
              />
              <Stack.Screen
                name="Prism Arcade"
                component={PrismArcade}
                options={{
                  headerShown: false,
                  orientation: "portrait",
                }}
              />
              <Stack.Screen
                name="Lootbox"
                component={Lootbox}
                options={{
                  headerShown: false,
                  orientation: "portrait",
                }}
              />
              <Stack.Screen
                name="Game"
                component={Game}
                options={{
                  headerShown: false,
                  // orientation: "landscape",
                }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  headerShown: false,
                  orientation: "portrait",
                }}
              />
              <Stack.Screen
                name="Edit Profile"
                component={EditProfile}
                options={{
                  headerShown: false,
                  orientation: "portrait",
                }}
              />
              <Stack.Screen
                name="Profile Settings"
                component={ProfileSettings}
                options={{
                  headerShown: false,
                  orientation: "portrait",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ContextProviders>
      </PrivyProvider>
    </ChainProvider>
  );
}
