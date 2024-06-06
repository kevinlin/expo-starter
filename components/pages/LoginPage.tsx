import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PublicClientApplication, {
  MSALConfiguration,
  MSALInteractiveParams,
} from "react-native-msal2";

const config: MSALConfiguration = {
  auth: {
    clientId: "27225af2-948c-4229-afb6-82bc1e9ac211",
    authority:
      "https://login.microsoftonline.com/b5b8b483-5597-4ae7-8e27-fcc464a3b584",
    redirectUri: Platform.select({
      android:
        "msauth://com.bostonscientific.jarvis-sakura-mobile.stage/cEuBfTV24qnKzfDEzC%2F4t8Z6SLg%3D", // ex: "msauth://com.package/Xo8WBi6jzSxKDVR4drqm84yr9iU%3D"
      ios: "msauth.com.bostonscientific.jarvis-sakura-mobile.stage://auth", // ex: "msauth.com.package.app://auth"
      default: "http://localhost:3000",
    }),
  },
};
const scopes = ["openid", "offline_access"];

const LoginPage = () => {
  const [msalClient, setMsalClient] = useState<PublicClientApplication | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeMsalClient = async () => {
      const client = new PublicClientApplication(config);
      try {
        await client.init();
        setMsalClient(client);
      } catch (error) {
        console.error(
          "Error initializing the msalClient, check your config.",
          error
        );
        Alert.alert(
          "Initialization Error",
          "There was an error initializing the authentication client. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    initializeMsalClient();
  }, []);

  const doLogin = async () => {
    if (!msalClient) {
      Alert.alert("Error", "MSAL Client not initialized.");
      return;
    }

    try {
      const params: MSALInteractiveParams = { scopes };
      const result = await msalClient.acquireToken(params);
      if (result) {
        Alert.alert("Login Successful", `Welcome, ${result.account.username}`);
      } else {
        Alert.alert("Login Failed", "No result returned.");
      }
    } catch (error) {
      console.error("Error during login", error);
      Alert.alert(
        "Login Error",
        "An error occurred during login. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={doLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginPage;
