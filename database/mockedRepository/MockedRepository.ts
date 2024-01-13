import { AddAnimal, Animal, UpdateAnimal } from "types/Animal";
import { AddBatch, Batch, UpdateBatch } from "types/Batch";
import { DatabaseRepository } from "types/DatabaseRepository";
import { mockedAnimals } from "./mockedAnimals";
import { mockedBatches } from "./mockedBatches";

export class MockedRepository implements DatabaseRepository {
	constructor() {}
	updateManyAnimals(updateDataList: UpdateAnimal[]): Promise<Animal[]> {
		const updatedAnimals = updateDataList.map((updateData, index) => {
			return { ...mockedAnimals[index], ...updateData };
		});
		return Promise.resolve(updatedAnimals);
	}
	deleteManyAnimals(animalIDs: string[]): Promise<boolean> {
		return Promise.resolve(true);
	}
	deleteBatchAndItsAnimals(batchID: string): Promise<boolean> {
		return Promise.resolve(true);
	}
	deleteAnimal(animalID: string): Promise<boolean> {
		return Promise.resolve(true);
	}
	deleteBatch(batchID: string): Promise<boolean> {
		return Promise.resolve(true);
	}
	insertAnimal(animal: AddAnimal): Promise<string> {
		return Promise.resolve("INSERTED_ID");
	}
	insertBatch(batch: AddBatch, animalIDs?: string[]): Promise<string> {
		return Promise.resolve("INSERTED_ID");
	}
	loadAnimal(animalID: string): Promise<Animal> {
		return Promise.resolve(
			mockedAnimals.find((x) => x.id === animalID) || mockedAnimals[0]
		);
	}
	listAnimals(): Promise<Animal[]> {
		return Promise.resolve(mockedAnimals);
	}
	loadBatchAnimals(id: string): Promise<Animal[]> {
		return Promise.resolve(mockedAnimals.filter((x) => x.batchId === id));
	}
	loadBatchInfo(batchID: string): Promise<Batch> {
		return Promise.resolve(
			mockedBatches.find((b) => b.id === batchID) || mockedBatches[0]
		);
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
	updateBatch(
		updateData: UpdateBatch,
		animalIDsToUpdate?: string[]
	): Promise<Batch> {
		return Promise.resolve(mockedBatches[0]);
	}
}
