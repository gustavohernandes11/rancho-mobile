import { AddAnimal, Animal, PopulatedAnimal, UpdateAnimal } from "./Animal";
import { AddBatch, Batch, PopulatedBatch, UpdateBatch } from "./Batch";
import { Count } from "./Count";

export type OrderByOptions = "alfabetic" | "age";
export type QueryOptions = {
	orderBy?: OrderByOptions;
	batchId?: number;
	searchText?: string;
};

export interface StorageRepository {
	count(): Promise<Count>;
	insertAnimal(animal: AddAnimal): Promise<number | undefined>;
	insertBatch(batch: AddBatch): Promise<number | undefined>;
	loadAnimal(animalID: number): Promise<Animal>;
	loadPopulatedAnimal(animalID: number): Promise<PopulatedAnimal>;
	listAnimals(query?: QueryOptions): Promise<Animal[]>;
	loadBatch(batchID: number): Promise<PopulatedBatch>;
	listAllBatchesInfo(): Promise<Batch[]>;
	updateAnimal(updateData: UpdateAnimal): Promise<Animal>;
	updateBatch(updateData: UpdateBatch): Promise<Batch>;
	deleteAnimal(animalID: number): Promise<boolean>;
	deleteBatch(batchID: number): Promise<boolean>;
	clearDatabase(): Promise<boolean>;
	updateManyAnimals(updateDataList: UpdateAnimal[]): Promise<Animal[]>;
	deleteManyAnimals(animalIDs: number[]): Promise<boolean>;
	deleteBatchAndItsAnimals(batchID: number): Promise<boolean>;
	moveAnimalToBatch(
		animalIDsToMove: number,
		batchID: number | null
	): Promise<boolean>;
	moveAnimalsToBatch(
		animalIDsToMove: number[],
		batchID: number | null
	): Promise<boolean>;
}
