import { AddAnimal, Animal, UpdateAnimal } from "./Animal";
import { AddBatch, Batch, UpdateBatch } from "./Batch";

export interface DatabaseRepository {
	insertAnimal(animal: AddAnimal): Promise<string>;
	insertBatch(batch: AddBatch): Promise<string>;
	loadAnimal(id: string): Promise<Animal>;
	listAnimals(search?: string): Promise<Animal[]>;
	loadBatchAnimals(id: string): Promise<Animal[]>;
	loadBatchInfo(id: string): Promise<Batch>;
	listAllBatchesInfo(): Promise<Batch[]>;
	updateAnimal(updateData: UpdateAnimal): Promise<Animal>;
	updateBatch(updateData: UpdateBatch): Promise<Batch>;
	deleteAnimal(id: string): Promise<boolean>;
	deleteBatch(id: string): Promise<boolean>;
	clearDatabase(): Promise<boolean>;
}
