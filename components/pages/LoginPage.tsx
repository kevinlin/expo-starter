import {
  exchangeCodeAsync,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Button, Platform, SafeAreaView, Text } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
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

  return (
    <SafeAreaView>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
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
              });
            }
          });
        }}
      />
      <Text>{token}</Text>
    </SafeAreaView>
  );
}
