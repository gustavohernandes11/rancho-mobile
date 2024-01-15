import { AddAnimal, Animal, UpdateAnimal } from "types/Animal";
import { AddBatch, Batch, UpdateBatch } from "types/Batch";
import { DatabaseRepository } from "types/DatabaseRepository";

export class Database implements DatabaseRepository {
	constructor(private readonly dbRepository: DatabaseRepository) {}

	async insertAnimal(animal: AddAnimal): Promise<number | undefined> {
		return this.dbRepository.insertAnimal(animal);
	}
	async insertBatch(batch: AddBatch): Promise<number | undefined> {
		return this.dbRepository.insertBatch(batch);
	}
	async deleteAnimal(animalID: number): Promise<boolean> {
		return this.dbRepository.deleteAnimal(animalID);
	}
	async deleteBatch(batchID: number): Promise<boolean> {
		return this.dbRepository.deleteBatch(batchID);
	}
	async loadAnimal(animalID: number): Promise<Animal> {
		return this.dbRepository.loadAnimal(animalID);
	}
	async listAnimals(): Promise<Animal[]> {
		return this.dbRepository.listAnimals();
	}
	async loadBatchAnimals(batchID: number): Promise<Animal[]> {
		return this.dbRepository.loadBatchAnimals(batchID);
	}
	async loadBatchInfo(batchID: number): Promise<Batch> {
		return this.dbRepository.loadBatchInfo(batchID);
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
	async updateBatch(updateData: UpdateBatch): Promise<Batch> {
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
