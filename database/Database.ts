import { AddAnimal, Animal, UpdateAnimal } from "types/Animal";
import { AddBatch, Batch, UpdateBatch } from "types/Batch";
import { DatabaseRepository } from "types/DatabaseRepository";

export class Database implements DatabaseRepository {
	constructor(private readonly dbRepository: DatabaseRepository) {}

	async insertAnimal(animal: AddAnimal): Promise<number | undefined> {
		return this.dbRepository.insertAnimal(animal);
	}
	async insertBatch(
		batch: AddBatch,
		animalIDs?: number[]
	): Promise<number | undefined> {
		return this.dbRepository.insertBatch(batch);
	}
	async deleteAnimal(id: number): Promise<boolean> {
		return this.dbRepository.deleteAnimal(id);
	}
	async deleteBatch(id: number): Promise<boolean> {
		return this.dbRepository.deleteBatch(id);
	}
	async loadAnimal(id: number): Promise<Animal> {
		return this.dbRepository.loadAnimal(id);
	}
	async listAnimals(): Promise<Animal[]> {
		return this.dbRepository.listAnimals();
	}
	async loadBatchAnimals(id: number): Promise<Animal[]> {
		return this.dbRepository.loadBatchAnimals(id);
	}
	async loadBatchInfo(id: number): Promise<Batch> {
		return this.dbRepository.loadBatchInfo(id);
	}
	async listAllBatchesInfo(): Promise<Batch[]> {
		return this.dbRepository.listAllBatchesInfo();
	}
	async clearDatabase(): Promise<boolean> {
		return this.dbRepository.clearDatabase();
	}
	async updateAnimal(updateData: UpdateAnimal): Promise<Animal> {
		return this.dbRepository.updateAnimal(updateData);
	}
	async updateBatch(
		updateData: UpdateBatch,
		animalIDsToUpdate?: number[]
	): Promise<Batch> {
		return this.dbRepository.updateBatch(updateData);
	}
	async updateManyAnimals(updateDataList: UpdateAnimal[]): Promise<Animal[]> {
		return this.dbRepository.updateManyAnimals(updateDataList);
	}
	async deleteManyAnimals(animalIDsToDelete: number[]): Promise<boolean> {
		return this.dbRepository.deleteManyAnimals(animalIDsToDelete);
	}
	async deleteBatchAndItsAnimals(batchID: number): Promise<boolean> {
		return this.dbRepository.deleteBatchAndItsAnimals(batchID);
	}
}
