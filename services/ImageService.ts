import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Animal } from "types/Animal";
import { ImageServiceMethods } from "types/ImageServicesMethods";

export class ImageServices implements ImageServiceMethods {
    private readonly IMAGES_FOLDER: string;

    constructor() {
        this.IMAGES_FOLDER = `${FileSystem.documentDirectory}animal_images`;
        this.initFolder();
    }

    private async initFolder() {
        const folderInfo = await FileSystem.getInfoAsync(this.IMAGES_FOLDER);
        if (!folderInfo.exists) {
            await FileSystem.makeDirectoryAsync(this.IMAGES_FOLDER, {
                intermediates: true,
            });
        }
    }

    private getAnimalImageName(animal: Animal): string {
        return `${animal.id}_animal_avatar.jpg`;
    }

    async pickAndSaveCameraImage(animal: Animal): Promise<string> {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            throw new Error("Permissão para acessar a câmera é necessária!");
        }

        const pickerResult = await ImagePicker.launchCameraAsync({
            aspect: [1, 1],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (pickerResult.canceled || pickerResult.assets.length === 0) {
            throw new Error("Nenhuma imagem foi selecionada.");
        }

        const imageUri = pickerResult.assets[0].uri;
        const imageName = this.getAnimalImageName(animal);

        return this.upsertImage(imageUri, imageName);
    }

    async pickAndSaveMediaLibraryImage(animal: Animal): Promise<string> {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            throw new Error("Permissão para acessar a galeria é necessária!");
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            aspect: [1, 1],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (pickerResult.canceled || pickerResult.assets.length === 0) {
            throw new Error("Nenhuma imagem foi selecionada.");
        }

        const imageUri = pickerResult.assets[0].uri;
        const imageName = this.getAnimalImageName(animal);

        return this.upsertImage(imageUri, imageName);
    }

    async deleteImage(imagePath: string): Promise<void> {
        await FileSystem.deleteAsync(imagePath, { idempotent: true });
    }

    async insertImage(imageUri: string, imageName: string): Promise<string> {
        const destinationPath = `${this.IMAGES_FOLDER}/${imageName}`;

        try {
            await FileSystem.copyAsync({
                from: imageUri,
                to: destinationPath,
            });

            return destinationPath;
        } catch (error) {
            alert("Erro ao salvar imagem: " + error);
            throw error;
        }
    }

    async upsertImage(imageUri: string, imageName: string): Promise<string> {
        const destinationPath = `${this.IMAGES_FOLDER}/${imageName}`;

        await FileSystem.deleteAsync(destinationPath, { idempotent: true });
        return this.insertImage(imageUri, imageName);
    }

    async getAnimalImagePath(animal: Animal): Promise<string | null> {
        const imageName = this.getAnimalImageName(animal);
        const filePath = `${this.IMAGES_FOLDER}/${imageName}`;

        try {
            const fileInfo = await FileSystem.getInfoAsync(filePath);
            return fileInfo.exists ? filePath : null;
        } catch {
            return null;
        }
    }
}

export const imageServices = new ImageServices();
