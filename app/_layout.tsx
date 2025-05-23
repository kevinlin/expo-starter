import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import Constants from "expo-constants";
import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Storybook from "../.storybook";
import "expo-dev-client";
import React from "react";
import FontLoader from '../assets/res/font/FontLoader';
import { UserProvider } from "../components/models/UserContext";

export default function Layout() {
  const isStorybook = Constants.expoConfig?.extra?.storybookEnabled ?? false;
  if (isStorybook) {
    return <Storybook />;
  } else {
    return (
      <FontLoader>
        <UserProvider>
      <GestureHandlerRootView>
        <GluestackUIProvider config={config}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }}/>
                <Stack.Screen name="drawer" options={{ headerShown: false }}/>
            </Stack>
        </GluestackUIProvider>
      </GestureHandlerRootView>
      </UserProvider>
      </FontLoader>

    );
  }
}
