const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.bostonscientific.jarvis-sakura-mobile.dev";
  } else if (IS_PREVIEW) {
    return "com.bostonscientific.jarvis-sakura-mobile.stage";
  } else {
    return "com.bostonscientific.jarvis-sakura-mobile";
  }
};

const getPackageName = () => {
  if (IS_DEV) {
    return "com.bostonscientific.jarvis_sakura_mobile.dev";
  } else if (IS_PREVIEW) {
    return "com.bostonscientific.jarvis_sakura_mobile.stage";
  } else {
    return "com.bostonscientific.jarvis_sakura_mobile";
  }
};

const getAppName = () => {
  if (IS_DEV) {
    return "StickerSmash (Dev)";
  } else if (IS_PREVIEW) {
    return "StickerSmash (Preview)";
  } else {
    return "StickerSmash: Emoji Stickers";
  }
};

export default {
  expo: {
    name: getAppName(),
    slug: "StickerSmash",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    scheme: getUniqueIdentifier(),
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
      package: getPackageName(),
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
    plugins: ["expo-router"],
  },
};
