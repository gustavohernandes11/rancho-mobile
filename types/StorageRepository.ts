import { AddAnimal, Animal, PopulatedAnimal, UpdateAnimal } from "./Animal";
import { AddBatch, Batch, PopulatedBatch, UpdateBatch } from "./Batch";
import { Count } from "./Count";

export type OrderByOptions = "alfabetic" | "age";
export type QueryOptions = {
	orderBy?: OrderByOptions;
	batchID?: number;
	searchText?: string;
};

export interface StorageRepository {
	count(): Promise<Count>;
	clearDatabase(): Promise<boolean>;
	initDatabase(): Promise<void>;

	insertAnimal(animal: AddAnimal): Promise<number | undefined>;
	insertBatch(batch: AddBatch): Promise<number | undefined>;

	getAnimal(animalID: number): Promise<Animal>;
	getPopulatedBatch(batchID: number): Promise<PopulatedBatch>;
	getPopulatedAnimal(animalID: number): Promise<PopulatedAnimal>;

	listAnimals(query?: QueryOptions): Promise<Animal[]>;
	listBatches(): Promise<Batch[]>;

	updateAnimal(updateData: UpdateAnimal | UpdateAnimal[]): Promise<boolean>;
	updateBatch(updateData: UpdateBatch | UpdateBatch[]): Promise<boolean>;

	deleteAnimal(animalID: number | number[]): Promise<boolean>;
	deleteBatch(batchID: number): Promise<boolean>;

	setAnimalBatch(
		animalID: number | number[],
		batchID: number | null
	): Promise<boolean>;

	nullifyParentalIds(animalID: number | number[]): Promise<boolean>;
}
