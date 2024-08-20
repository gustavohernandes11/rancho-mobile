import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { imageServices } from "../services/ImageService";

export const useImageManager = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        // Carregar as imagens salvas ao inicializar o hook
        loadImages();
    }, []);

    const loadImages = async () => {
        const loadedImages = await imageServices.getAllImages();
        setImages(loadedImages);
    };

    const saveImage = async (imageUri: string, imageName: string) => {
        const path = await imageServices.saveImage(imageUri, imageName);
        setImages(prev => [...prev, path]);
    };

    const deleteImage = async (imageName: string) => {
        await imageServices.deleteImage(imageName);
        setImages(prev => prev.filter(img => !img.includes(imageName)));
    };

    const pickImage = async () => {
        // Solicita permissão para acessar a galeria
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permissão para acessar a galeria é necessária!");
            return;
        }

        // Abre a galeria para o usuário escolher uma imagem
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!pickerResult.canceled) {
            const { uri } = pickerResult.assets[0];
            await saveImage(uri, `animal_${Date.now()}`);
        }
    };

    return {
        images,
        saveImage,
        deleteImage,
        pickImage, // Função para escolher uma imagem
        getImage: ImageService.,
    };
};
