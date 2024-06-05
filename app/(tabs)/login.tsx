import { StyleSheet, View } from "react-native";
import LoginPage from "../../components/pages/LoginPage";

export default function Tab() {
  return (
    <View style={styles.container}>
      <LoginPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
