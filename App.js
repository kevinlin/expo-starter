import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import {launchImageLibraryAsync} from "expo-image-picker";
import {useRef, useState} from 'react';
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {captureRef} from "react-native-view-shot";
import {saveToLibraryAsync, usePermissions} from "expo-media-library";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showAppOptions, setShowAppOptions] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pickedEmoji, setPickedEmoji] = useState(null);
    const [status, requestPermission] = usePermissions();
    const imageRef = useRef();

    if (status === null) {
        requestPermission().then(response => console.log(`PermissionResponse: ${JSON.stringify(response, null, 2)}`));
    }

    const pickImageAsync = async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            alert('You did not select any image.');
        }
    };

    const onReset = () => {
        setShowAppOptions(false);
    };

    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
            });

            await saveToLibraryAsync(localUri);
            if (localUri) {
                alert("Saved!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.imageContainer}>
                <View ref={imageRef} collapsable={false}>
                    <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
                    {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
                </View>
            </View>
            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton icon="refresh" label="Reset" onPress={onReset}/>
                        <CircleButton onPress={onAddSticker}/>
                        <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
                    </View>
                </View>
            ) : (
                <View style={styles.footerContainer}>
                    <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
                    <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
                </View>
            )}
            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
            </EmojiPicker>
            <StatusBar style="light"/>
        </GestureHandlerRootView>
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
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
