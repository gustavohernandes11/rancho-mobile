import { Batch } from "./Batch";

export type AnimalStatusOptions = "active" | "dead" | "sold";
export type Animal = {
    id: number;
    name: string;
    gender: "F" | "M";
    status: AnimalStatusOptions;
    birthdate?: string;
    batchID?: number;
    code?: string | number;
    paternityID?: number;
    maternityID?: number;
    observation?: string;
};
export type PopulatedAnimal = Animal & {
    batch: Batch | null;
    paternity: Animal | null;
    maternity: Animal | null;
    offspring: Animal[];
};
export type AddAnimal = Omit<Animal, "id">;
export type UpdateAnimal = Partial<Animal> & { id: number };
