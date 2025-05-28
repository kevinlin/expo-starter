import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUser } from "../../../components/models/UserContext";
import { useFontContext } from "../../../assets/res/font/FontContext";
import colors from '../../../assets/res/colors';
import TextButton from "../../../components/TextButton";
import { createTwoButtonAlert } from "../../../components/CustomAlert";

const HomeScreen = () => {
    const { user } = useUser();
    useFontContext();

    return (
        <View>
            <Text style={styles.medium25} >Hi, {user.givenName} {user.familyName} </Text>
            <TextButton label='Test Alert' onPress={() => {
                createTwoButtonAlert(
                    'Alert Title', 
                    'My Alert Msg', 
                    () => console.log('OK Pressed'), 
                    () => console.log('Cancel Pressed')
                  );
            }}></TextButton>
        </View>
    );
};
const styles = StyleSheet.create({
    medium25: {
        color: colors.white,
        fontFamily: 'Medium',
        fontSize: 25
      },
});
export default HomeScreen;
