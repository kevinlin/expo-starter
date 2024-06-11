import {Pressable, StyleSheet, Text} from 'react-native';
import '../assets/res/fonts';
import colors from '../assets/res/colors';

export default function TextButton({label, onPress}) {

    return (
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderColor: colors.blue3,
        borderRadius: 29,
        height: 58,
        width: 268,
        borderWidth: 1,
        justifyContent: 'center',
    },
    buttonLabel: {
        color: colors.blue3,
        fontSize: 18,
        fontFamily: 'Bold',
    },
});
