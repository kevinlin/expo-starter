import {
  exchangeCodeAsync,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {Platform, StyleSheet, View, Image, Text } from "react-native";

import strings from '../../assets/locales/Localization';
import images from '../../assets/res/images';
import { useFontContext } from '../../assets/res/font/FontContext';
import colors from '../../assets/res/colors';

import { SplashScreen, router } from "expo-router";
import TextButton from "../TextButton";
import { jwtDecode } from "jwt-decode";

WebBrowser.maybeCompleteAuthSession();

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000);

export default function LoginPage() {
  // Endpoint
  const discovery = useAutoDiscovery(
    "https://login.microsoftonline.com/b5b8b483-5597-4ae7-8e27-fcc464a3b584/v2.0"
  );
  const clientId = "27225af2-948c-4229-afb6-82bc1e9ac211";
  const redirectUri = Platform.select({
    android:
      "msauth://com.bostonscientific.jarvis-sakura-mobile.dev/V8IMm67znTu7Nrm7MXuKo8uVKZA%3D", // ex: "msauth://com.package/Xo8WBi6jzSxKDVR4drqm84yr9iU%3D"
    ios: "msauth.com.bostonscientific.jarvis-sakura-mobile.dev://auth", // ex: "msauth.com.package.app://auth"
    default: "http://localhost:3000",
  });

  // We store the JWT in here
  const [token, setToken] = React.useState<string | null>(null);

  // Request
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri,
    },
    discovery
  );

  const { fontsLoaded } = useFontContext();

  return (

    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={images.img_background}  />

        <Image style={styles.logo} source={images.img_logo} />

        <Text style={styles.medium18} >{strings.login_slogan}</Text>

        <View style={styles.login_button}>
          <TextButton label={strings.login_with_sso} onPress={() => {
            promptAsync().then((codeResponse) => {
              console.log("AuthSessionResult", codeResponse);
              if (request && codeResponse?.type === "success" && discovery) {
                exchangeCodeAsync(
                  {
                    clientId,
                    code: codeResponse.params.code,
                    extraParams: request.codeVerifier
                      ? { code_verifier: request.codeVerifier }
                      : undefined,
                    redirectUri,
                  },
                  discovery
                ).then((res) => {
                  console.log("TokenResponse", res);
                  setToken(res.accessToken);
                  console.log('decode: ', jwtDecode(res.accessToken));

                  router.push("/tabs");
                });
              }
            });
          }} >
          </TextButton>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    resizeMode: 'cover'
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  medium18: {
    color: colors.white,
    fontFamily: 'Medium',
    fontSize: 18,
    marginTop: 20
  },
  logo: {
    marginTop: 122,
    resizeMode: 'cover'
   },
  login_button: {
    marginTop: 200
  },

});
