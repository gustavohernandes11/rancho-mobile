import { Animal } from "./Animal";

export type ImageServiceMethods = {
    pickAndSaveCameraImage(animal: Animal): Promise<string>;
    pickAndSaveMediaLibraryImage(animal: Animal): Promise<string>;
    upsertImage(imageUri: string, imageName: string): Promise<string>;
    deleteImage(imagePath: string): Promise<void>;
    getAnimalImagePath(animal: Animal): Promise<string | null>;
};
