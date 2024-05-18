import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import {launchImageLibraryAsync} from "expo-image-picker";
import {useState} from 'react';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImageAsync = async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
            </View>
            <View style={styles.footerContainer}>
                <Button theme="primary" label="Chooose a photo" onPress={pickImageAsync}></Button>
                <Button label="Use this photo"></Button>
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        paddingTop: 58,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
});
