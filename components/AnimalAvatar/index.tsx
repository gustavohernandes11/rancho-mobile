import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { commonStyles } from "styles/Common";
import { Animal } from "types/Animal";
import { ImageActions } from "./ImageActions";

type AnimalAvatarProps = {
    animal?: Animal;
    animalImage: string | null;
    loadImage: () => Promise<void>;
};

export const AnimalAvatar = ({
    animal,
    animalImage,
    loadImage,
}: AnimalAvatarProps) => {
    const placeholder = require("../../assets/images/AnimalPlaceholder.jpg");
    const source = animalImage ? { uri: animalImage } : placeholder;

    return (
        <View style={styles.container}>
            <Image source={source} style={styles.image} resizeMode="cover" />
            <ImageActions
                animalImage={animalImage}
                animal={animal}
                loadImage={loadImage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: 250,
        height: 250,
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 8,
        ...commonStyles.border,
    },
    image: {
        width: 250,
        height: 250,
        position: "absolute",
        top: 0,
        right: 0,
    },
});
