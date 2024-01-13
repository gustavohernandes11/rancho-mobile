import { AddAnimal, Animal, UpdateAnimal } from "./Animal";
import { AddBatch, Batch, UpdateBatch } from "./Batch";

export interface DatabaseRepository {
	insertAnimal(animal: AddAnimal): Promise<string>;
	insertBatch(batch: AddBatch): Promise<string>;
	loadAnimal(animalID: string): Promise<Animal>;
	listAnimals(search?: string): Promise<Animal[]>;
	loadBatchAnimals(id: string): Promise<Animal[]>;
	loadBatchInfo(batchID: string): Promise<Batch>;
	listAllBatchesInfo(): Promise<Batch[]>;
	updateAnimal(updateData: UpdateAnimal): Promise<Animal>;
	updateBatch(updateData: UpdateBatch): Promise<Batch>;
	deleteAnimal(animalID: string): Promise<boolean>;
	deleteBatch(batchID: string): Promise<boolean>;
	clearDatabase(): Promise<boolean>;
	updateManyAnimals(updateDataList: UpdateAnimal[]): Promise<Animal[]>;
	deleteManyAnimals(animalIDs: string[]): Promise<boolean>;
	deleteBatchAndItsAnimals(batchID: string): Promise<boolean>;
}
