import React from "react";
import {Tabs} from "expo-router/tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../../../assets/res/colors";
import {useNavigation} from "expo-router";
import {DrawerActions} from "@react-navigation/native";
import {StyleSheet, Image, TouchableOpacity} from "react-native";
import images from "../../../assets/res/images";

export default function HomeLayout() {
    const iconSize = 25;
    const navigation = useNavigation();

    return (
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: colors.blue,
            },
            headerTitle: '',
            headerTintColor: '#fff',
            headerLeft: () =>
                <TouchableOpacity style={styles.headerLeftButton} onPress={()=>{
                    navigation.dispatch(DrawerActions.openDrawer());
                }}>
                    <FontAwesome size={20} name="bars" color={colors.white} />
                </TouchableOpacity>,
            headerRight: () => <Image style={styles.headerRightImage} source={images.img_logo} />
        }}>
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

const styles = StyleSheet.create({
    headerLeftButton: {
        marginLeft: 16,
    },
    headerRightImage: {
        height: 25,
        marginRight: 16,
        width: 70,
    },
});
