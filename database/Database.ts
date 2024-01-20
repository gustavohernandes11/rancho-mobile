import {
	AddAnimal,
	AddBatch,
	Animal,
	Batch,
	Repository,
	UpdateAnimal,
	UpdateBatch,
} from "types";

export class Database implements Repository {
	constructor(private readonly DbRepository: Repository) {}

	async insertAnimal(animal: AddAnimal): Promise<number | undefined> {
		return this.DbRepository.insertAnimal(animal);
	}
	async insertBatch(batch: AddBatch): Promise<number | undefined> {
		return this.DbRepository.insertBatch(batch);
	}
	async deleteAnimal(animalID: number): Promise<boolean> {
		return this.DbRepository.deleteAnimal(animalID);
	}
	async deleteBatch(batchID: number): Promise<boolean> {
		return this.DbRepository.deleteBatch(batchID);
	}
	async loadAnimal(animalID: number): Promise<Animal> {
		return this.DbRepository.loadAnimal(animalID);
	}
	async listAnimals(): Promise<Animal[]> {
		return this.DbRepository.listAnimals();
	}
	async loadBatchAnimals(batchID: number): Promise<Animal[]> {
		return this.DbRepository.loadBatchAnimals(batchID);
	}
	async loadBatchInfo(batchID: number): Promise<Batch> {
		return this.DbRepository.loadBatchInfo(batchID);
	}
	async listAllBatchesInfo(): Promise<Batch[]> {
		return this.DbRepository.listAllBatchesInfo();
	}
	async clearDatabase(): Promise<boolean> {
		return this.DbRepository.clearDatabase();
	}
	async updateAnimal(updateData: UpdateAnimal): Promise<Animal> {
		return this.DbRepository.updateAnimal(updateData);
	}
	async updateBatch(updateData: UpdateBatch): Promise<Batch> {
		return this.DbRepository.updateBatch(updateData);
	}
	async updateManyAnimals(updateDataList: UpdateAnimal[]): Promise<Animal[]> {
		return this.DbRepository.updateManyAnimals(updateDataList);
	}
	async deleteManyAnimals(animalIDsToDelete: number[]): Promise<boolean> {
		return this.DbRepository.deleteManyAnimals(animalIDsToDelete);
	}
	async deleteBatchAndItsAnimals(batchID: number): Promise<boolean> {
		return this.DbRepository.deleteBatchAndItsAnimals(batchID);
	}
	async moveAnimalToBatch(
		animalID: number,
		batchID: number | null
	): Promise<boolean> {
		return this.DbRepository.moveAnimalToBatch(animalID, batchID);
	}
	async moveAnimalsToBatch(
		animalIDsToMove: number[],
		batchID: number | null
	): Promise<boolean> {
		return this.DbRepository.moveAnimalsToBatch(animalIDsToMove, batchID);
	}
	async searchAnimals(text: string): Promise<Animal[]> {
		return this.DbRepository.searchAnimals(text);
	}
}
