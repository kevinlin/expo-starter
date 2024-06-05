import FontAwesome from "@expo/vector-icons/FontAwesome";
import { EditIcon, Icon } from "@gluestack-ui/themed";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: "To-Dos",
          tabBarIcon: ({ color }) => <Icon as={EditIcon} color={color} />,
        }}
      />
    </Tabs>
  );
}
