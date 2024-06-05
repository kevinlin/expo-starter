import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Pressable, StyleSheet, View} from 'react-native';

export type CircleButtonProps = {
    onPress: () => void;
    color?: string;
    circleColor?: string;
};
export default function CircleButton({color = "#25292e" ,circleColor = "#ffd33d",onPress}: CircleButtonProps) {
    return (
        <View style={[styles.circleButtonContainer, { borderColor: circleColor }]}>
            <Pressable style={styles.circleButton} onPress={onPress}>
                <MaterialIcons name='add' size={38} color={color}/>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    circleButtonContainer: {
        width: 84,
        height: 84,
        marginHorizontal: 60,
        borderWidth: 4,
        borderRadius: 42,
        padding: 3,
    },
    circleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#fff',
    },
});
