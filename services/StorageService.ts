import {
	AddAnimal,
	AddBatch,
	Animal,
	Batch,
	Count,
	PopulatedAnimal,
	PopulatedBatch,
	QueryOptions,
	StorageRepository,
	UpdateAnimal,
	UpdateBatch,
} from "types";
import { StorageServicesMethods } from "types/StorageServices";
import { SqliteRepository } from "../database/repositories/SqliteRepository";

export class StorageServices implements StorageServicesMethods {
	constructor(private readonly DbRepository: StorageRepository) {}

	async count(): Promise<Count> {
		return this.DbRepository.count();
	}

	async insertAnimal(animal: AddAnimal): Promise<number | undefined> {
		return this.DbRepository.insertAnimal(animal);
	}

	async insertBatch(batch: AddBatch): Promise<number | undefined> {
		return this.DbRepository.insertBatch(batch);
	}

	async getAnimal(animalID: number): Promise<Animal> {
		return this.DbRepository.getAnimal(animalID);
	}

	async getPopulatedAnimal(animalID: number): Promise<PopulatedAnimal> {
		return this.DbRepository.getPopulatedAnimal(animalID);
	}

	async getPopulatedBatch(batchID: number): Promise<PopulatedBatch> {
		return this.DbRepository.getPopulatedBatch(batchID);
	}

	async listAnimals(query?: QueryOptions): Promise<Animal[]> {
		return this.DbRepository.listAnimals(query);
	}

	async listBatches(): Promise<Batch[]> {
		return this.DbRepository.listBatches();
	}

	async updateAnimal(
		updateData: UpdateAnimal | UpdateAnimal[]
	): Promise<boolean> {
		return this.DbRepository.updateAnimal(updateData);
	}

	async updateBatch(
		updateData: UpdateBatch | UpdateBatch[]
	): Promise<boolean> {
		if (Array.isArray(updateData)) {
			for (const batch of updateData) {
				await this.DbRepository.updateBatch(batch);
			}
		} else {
			await this.DbRepository.updateBatch(updateData);
		}
		return true;
	}

	async deleteAnimal(animalID: number | number[]): Promise<boolean> {
		return this.DbRepository.deleteAnimal(animalID);
	}

	async deleteBatch(batchID: number): Promise<boolean> {
		const animalsToUnlink = await this.DbRepository.listAnimals({
			batchID,
		});
		const operations = animalsToUnlink.map((animal) =>
			this.DbRepository.setAnimalBatch(animal.id, null)
		);
		operations.push(this.DbRepository.deleteBatch(batchID));

		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
	}

	async deleteBatchWithAnimals(batchID: number): Promise<boolean> {
		const animalsToDelete = await this.DbRepository.listAnimals({
			batchID,
		});
		const operations = animalsToDelete.map((animal) =>
			this.DbRepository.deleteAnimal(animal.id)
		);
		operations.push(this.DbRepository.deleteBatch(batchID));

		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
	}

	async moveAnimalToBatch(
		animalID: number | number[],
		batchID: number | null
	): Promise<boolean> {
		return this.DbRepository.setAnimalBatch(animalID, batchID);
	}
}

const sqliteRepository = new SqliteRepository();
export const Storage = new StorageServices(sqliteRepository);
