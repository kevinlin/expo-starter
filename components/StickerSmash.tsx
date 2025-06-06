import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import {StatusBar} from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import Button from './Button';
import CircleButton from './CircleButton';
import {DisplayLocations} from "./DisplayLocations";
import EmojiList from './EmojiList';
import EmojiPicker from './EmojiPicker';
import EmojiSticker from './EmojiSticker';
import IconButton from './IconButton';
import ImageViewer from './ImageViewer';
import { SplashScreen } from "expo-router";

const client = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
});

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000);

const PlaceholderImage = require('../assets/images/background-image.png');

export default function StickerSmash() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showAppOptions, setShowAppOptions] = useState(false);
    const [displayLocations, setDisplayLocations] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pickedEmoji, setPickedEmoji] = useState<string | null>(null);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const imageRef = useRef<View>(null);

    if (status === null) {
        requestPermission().then(response => console.log(`PermissionResponse: ${JSON.stringify(response, null, 2)}`));
    }

    const pickImageAsync = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            Alert.alert('You did not select any image.');
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
            if (imageRef.current) {
                const localUri = await captureRef(imageRef.current, {
                    height: 440,
                    quality: 1,
                });

                await MediaLibrary.saveToLibraryAsync(localUri);
                if (localUri) {
                    Alert.alert("Saved!");
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
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
                        <Button theme="secondary" label="Use this photo" onPress={() => setShowAppOptions(true)}/>
                        <Button theme="secondary" label="Display locations" onPress={() => setDisplayLocations(true)}/>
                    </View>
                )}
                {displayLocations && <DisplayLocations/>}
                <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                    <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
                </EmojiPicker>

                <StatusBar style="light"/>
            </View>
        </ApolloProvider>
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
