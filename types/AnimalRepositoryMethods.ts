import {
    AddAnimal,
    Animal,
    AnimalPreview,
    AnimalStatusOptions,
    UpdateAnimal,
} from "./Animal";
import { QueryOptions } from "./StorageRepository";

export interface AnimalRepositoryMethods {
    insertAnimal(animal: AddAnimal): Promise<number | undefined>;
    getAnimal(animalID: number): Promise<Animal>;
    listAnimals(query?: QueryOptions): Promise<AnimalPreview[]>;
    updateAnimal(updateData: UpdateAnimal | UpdateAnimal[]): Promise<boolean>;
    deleteAnimal(animalID: number | number[]): Promise<boolean>;
    setAnimalBatch(
        animalID: number | number[],
        batchID: number | null
    ): Promise<boolean>;
    setAnimalStatus(
        animalID: number | number[],
        status: AnimalStatusOptions
    ): Promise<boolean>;
    listOffspring(animalID: number): Promise<Animal[]>;
    nullifyParentalIds(animalID: number | number[]): Promise<boolean>;
}
