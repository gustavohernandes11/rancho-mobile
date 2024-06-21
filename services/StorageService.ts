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
import { StorageServicesMethods } from "types/StorageServicesMethods";
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
		return this.DbRepository.nullifyParentalIds(animalID).then(() =>
			this.DbRepository.deleteAnimal(animalID)
		);
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
			this.deleteAnimal(animal.id)
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

	async compareBatchAnimalsWithSelectedAndUpdate(
		selectedIDs: number[],
		batchID: number
	): Promise<boolean> {
		const batch = await this.DbRepository.getPopulatedBatch(batchID);
		const animals = await this.DbRepository.listAnimals();

		let operations = animals.map((animal) => {
			const isSelected = selectedIDs.includes(animal.id);
			const belongsToBatch = animal.batchID === batch.id;

			if (belongsToBatch && !isSelected) {
				return this.DbRepository.setAnimalBatch(animal.id, null);
			} else if (!belongsToBatch && isSelected) {
				return this.DbRepository.setAnimalBatch(animal.id, batch.id);
			}
		});

		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
	}
}

const sqliteRepository = new SqliteRepository();
export const Storage = new StorageServices(sqliteRepository);
