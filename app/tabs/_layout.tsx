import React from "react";
import {Tabs} from "expo-router/tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function HomeLayout() {
    const iconSize = 25;
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{
                title: "Home",
                tabBarIcon: ({color}) => (
                    <FontAwesome size={iconSize} name="home" color={color}/>
                ),
            }}/>
            <Tabs.Screen name="dashboard" options={{
                title: "Dashboard", tabBarIcon: ({color}) => (
                    <FontAwesome size={iconSize} name="bar-chart" color={color}/>
                ),
            }}/>
            <Tabs.Screen name="customer" options={{
                title: "Customer", tabBarIcon: ({color}) => (
                    <FontAwesome size={iconSize} name="users" color={color}/>
                ),
            }}/>
            <Tabs.Screen name="calendar" options={{
                title: "Calendar", tabBarIcon: ({color}) => (
                    <FontAwesome size={iconSize} name="calendar" color={color}/>
                ),
            }}/>
            <Tabs.Screen name="links" options={{
                title: "Links", tabBarIcon: ({color}) => (
                    <FontAwesome size={iconSize} name="link" color={color}/>
                ),
            }}/>
        </Tabs>
    );
}
