import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { imageServices } from "services/ImageService";
import { commonStyles } from "styles/Common";
import { Animal } from "types/Animal";
import { ImageActions } from "./ImageActions";

type AnimalAvatarProps = {
    animal?: Animal;
};

export const AnimalAvatar = ({ animal }: AnimalAvatarProps) => {
    const [animalImage, setAnimalImage] = useState<string | null>(null);

    const loadImage = async () => {
        if (animal) {
            const path = await imageServices.getAnimalImagePath(animal);
            setAnimalImage(path ? path + "?new=" + new Date() : null);
        }
    };

    useEffect(() => {
        loadImage();
    }, [animal]);

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
