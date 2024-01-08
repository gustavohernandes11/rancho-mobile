import { AddAnimal, Animal, UpdateAnimal } from "../../types/Animal";
import { AddBatch, Batch, UpdateBatch } from "../../types/Batch";
import { DatabaseRepository } from "../../types/DatabaseRepository";
import { mockedAnimals } from "./mockedAnimals";
import { mockedBatches } from "./mockedBatches";

export class MockedRepository implements DatabaseRepository {
	constructor() {}
	insertAnimal(animal: AddAnimal): Promise<boolean> {
		return Promise.resolve(true);
	}
	insertBatch(batch: AddBatch): Promise<boolean> {
		return Promise.resolve(true);
	}
	loadAnimal(id: string): Promise<Animal> {
		return Promise.resolve(
			mockedAnimals.find((x) => x.id === id) || mockedAnimals[0]
		);
	}
	listAnimals(): Promise<Animal[]> {
		return Promise.resolve(mockedAnimals);
	}
	loadBatchAnimals(id: string): Promise<Animal[]> {
		return Promise.resolve(mockedAnimals.filter((x) => x.batchId === id));
	}
	loadBatchInfo(id: string): Promise<Batch> {
		return Promise.resolve(mockedBatches[0]);
	}
	listAllBatchesInfo(): Promise<Batch[]> {
		return Promise.resolve(mockedBatches);
	}
	clearDatabase(): Promise<boolean> {
		return Promise.resolve(true);
	}
	updateAnimal(updateData: UpdateAnimal): Promise<Animal> {
		return Promise.resolve(mockedAnimals[0]);
	}
	updateBatch(updateData: UpdateBatch): Promise<Batch> {
		return Promise.resolve(mockedBatches[0]);
	}
}
