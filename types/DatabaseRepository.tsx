import { AddAnimal, Animal, UpdateAnimal } from "./Animal";
import { AddBatch, Batch, UpdateBatch } from "./Batch";

export interface DatabaseRepository {
	insertAnimal(animal: AddAnimal): Promise<boolean>;
	insertBatch(batch: AddBatch): Promise<boolean>;
	loadAnimal(id: string): Promise<Animal>;
	listAnimals(): Promise<Animal[]>;
	loadBatchAnimals(id: string): Promise<Animal[]>;
	loadBatchInfo(id: string): Promise<Batch>;
	listAllBatchesInfo(): Promise<Batch[]>;
	clearDatabase(): Promise<boolean>;
	updateAnimal(updateData: UpdateAnimal): Promise<Animal>;
	updateBatch(updateData: UpdateBatch): Promise<Batch>;
}
