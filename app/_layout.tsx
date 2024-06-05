import {config} from "@gluestack-ui/config"
import {GluestackUIProvider} from "@gluestack-ui/themed";
import {Stack} from 'expo-router/stack';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Storybook from "../.storybook";
import Constants from 'expo-constants';

export default function Layout() {
    if (Constants.expoConfig.extra.storybookEnabled) {
        return <Storybook/>;
    }
    else {
        return (
            <GestureHandlerRootView>
                <GluestackUIProvider config={config}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    </Stack>
                </GluestackUIProvider>
            </GestureHandlerRootView>
        );
    }
}
