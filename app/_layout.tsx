import {config} from "@gluestack-ui/config"
import {GluestackUIProvider} from "@gluestack-ui/themed";
import {Stack} from 'expo-router/stack';
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function Layout() {
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
