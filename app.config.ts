const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
    if (IS_DEV) {
        return 'com.nextstep.sticker-smash.dev';
    }

    if (IS_PREVIEW) {
        return 'com.nextstep.sticker-smash.preview';
    }

    return 'com.nextstep.sticker-smash';
};

const getAppName = () => {
    if (IS_DEV) {
        return 'StickerSmash (Dev)';
    }

    if (IS_PREVIEW) {
        return 'StickerSmash (Preview)';
    }

    return 'StickerSmash: Emoji Stickers';
};

export default {
    expo: {
        name: getAppName(),
        slug: "StickerSmash",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        scheme: "com.nextstep.sticker-smash",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#25292e",
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: getUniqueIdentifier(),
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
            package: getUniqueIdentifier(),
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        extra: {
            storybookEnabled: process.env.STORYBOOK_ENABLED,
            eas: {
                projectId: "b9dfc812-0d6c-49c4-8a9a-72a9b080ad75",
            },
        },
        plugins: [
            "expo-router",
        ],
    },
};

