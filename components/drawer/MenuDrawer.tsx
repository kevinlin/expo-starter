import React, {useEffect} from 'react';
import {Drawer} from "expo-router/drawer";
import {router, usePathname} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../../assets/res/colors";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {StyleSheet} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const CustomDrawerContent = (props) => {
    const pathname = usePathname();

    useEffect(() => {
        console.log(pathname);
    }, [pathname]);

    const generateDrawerItemProps = (path, label, icon) => ({
        icon: ({color, size}) => (
            <FontAwesome size={size} name={icon} color={pathname === path ? colors.blue : colors.black}/>
        ),
        label: label,
        labelStyle: [
            styles.navItemLabel,
            {color: pathname === path ? colors.blue : colors.black},
        ],
        style: {backgroundColor: pathname === path ? colors.white : "#fff"},
        onPress: () => {
            router.push(path);
        }
    });

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem {...generateDrawerItemProps("/drawer/tabs/home", "Home", "home")} />
            <DrawerItem {...generateDrawerItemProps("/drawer/tabs/dashboard", "Dashboard", "bar-chart")} />
            <DrawerItem {...generateDrawerItemProps("/drawer/tabs/customer", "Customer", "users")} />
            <DrawerItem {...generateDrawerItemProps("/drawer/tabs/calendar", "Calendar", "calendar")} />
            <DrawerItem {...generateDrawerItemProps("/drawer/tabs/links", "Links", "link")} />
        </DrawerContentScrollView>
    );
};

export default function MenuDrawer() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
            </Drawer>
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    navItemLabel: {
        marginLeft: -20,
        fontSize: 18,
    },
});

