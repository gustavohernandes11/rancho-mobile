import { Batch } from "./Batch";

export type Animal = {
	id: number;
	name: string;
	gender: "F" | "M";
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
