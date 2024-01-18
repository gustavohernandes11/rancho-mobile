import {
	AddAnimal,
	AddBatch,
	Animal,
	Batch,
	DatabaseRepository,
	UpdateAnimal,
	UpdateBatch,
} from "types";
import { mockedAnimals } from "./mockedAnimals";
import { mockedBatches } from "./mockedBatches";

export class MockedRepository implements DatabaseRepository {
	constructor() {}
	searchAnimals(text: string): Promise<Animal[]> {
		throw new Error("Method not implemented.");
	}
	moveAnimalToBatch(
		animalIDsToMove: number,
		batchID: number | null
	): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	moveAnimalsToBatch(
		animalIDsToMove: number[],
		batchID: number | null
	): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	updateManyAnimals(updateDataList: UpdateAnimal[]): Promise<Animal[]> {
		const updatedAnimals = updateDataList.map((updateData, index) => {
			return { ...mockedAnimals[index], ...updateData };
		});
		return Promise.resolve(updatedAnimals);
	}
	deleteManyAnimals(animalIDs: number[]): Promise<boolean> {
		return Promise.resolve(true);
	}
	deleteBatchAndItsAnimals(batchID: number): Promise<boolean> {
		return Promise.resolve(true);
	}
	deleteAnimal(animalID: number): Promise<boolean> {
		return Promise.resolve(true);
	}
	deleteBatch(batchID: number): Promise<boolean> {
		return Promise.resolve(true);
	}
	insertAnimal(animal: AddAnimal): Promise<number> {
		return Promise.resolve(2);
	}
	insertBatch(batch: AddBatch, animalIDs?: number[]): Promise<number> {
		return Promise.resolve(2);
	}
	loadAnimal(animalID: number): Promise<Animal> {
		return Promise.resolve(
			mockedAnimals.find((x) => x.id === animalID) || mockedAnimals[0]
		);
	}
	listAnimals(): Promise<Animal[]> {
		return Promise.resolve(mockedAnimals);
	}
	loadBatchAnimals(id: number): Promise<Animal[]> {
		return Promise.resolve(mockedAnimals.filter((x) => x.batchId === id));
	}
	loadBatchInfo(batchID: number): Promise<Batch> {
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
		animalIDsToUpdate?: number[]
	): Promise<Batch> {
		return Promise.resolve(mockedBatches[0]);
	}
}
