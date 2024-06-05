import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PublicClientApplication, { MSALConfiguration } from "react-native-msal2";

const config: MSALConfiguration = {
  auth: {
    clientId: "27225af2-948c-4229-afb6-82bc1e9ac211",
    // This authority is used as the default in `acquireToken` and `acquireTokenSilent` if not provided to those methods.
    authority:
      "https://login.microsoftonline.com/b5b8b483-5597-4ae7-8e27-fcc464a3b584",
    redirectUri:
      "msauth.com.bostonscientific.jarvis-sakura-mobile.stage://auth",
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
      } finally {
        setLoading(false);
      }
    };

    initializeMsalClient();
  }, []);

  const doLogin = async () => {
    Alert.alert("Login Button Tapped", "You have tapped the login button.");
    if (!msalClient) {
      Alert.alert("Error", "MSAL Client not initialized.");
      return;
    }

    const params = { scopes: ["user.read"] };
    try {
      const result = await msalClient.acquireToken(params);
      if (result) {
        Alert.alert("Login Successful", `Welcome, ${result.account.username}`);
      } else {
        Alert.alert("Login Failed", "No result returned.");
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

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
