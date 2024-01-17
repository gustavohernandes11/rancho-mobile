import { AddAnimal, Animal, UpdateAnimal } from "./Animal";
import { AddBatch, Batch, UpdateBatch } from "./Batch";

export interface DatabaseRepository {
	insertAnimal(animal: AddAnimal): Promise<number | undefined>;
	insertBatch(batch: AddBatch): Promise<number | undefined>;
	loadAnimal(animalID: number): Promise<Animal>;
	listAnimals(): Promise<Animal[]>;
	searchAnimals(text: string): Promise<Animal[]>;
	loadBatchAnimals(batchID: number): Promise<Animal[]>;
	loadBatchInfo(batchID: number): Promise<Batch>;
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
