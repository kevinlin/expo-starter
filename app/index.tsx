import LoginPage from "../components/pages/LoginPage";
import Stack from "expo-router/stack";


const LoginScreen = () => {
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
      <LoginPage />
    </>
  );
}

export default LoginScreen;