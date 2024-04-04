import {
	AddAnimal,
	AddBatch,
	Animal,
	Batch,
	PopulatedAnimal,
	PopulatedBatch,
	StorageRepository,
	UpdateAnimal,
	UpdateBatch,
} from "types";
import { Count } from "types/Count";

export class MockedRepository implements StorageRepository {
	constructor() {}
	loadPopulatedAnimal(animalID: number): Promise<PopulatedAnimal> {
		throw new Error("Method not implemented.");
	}
	loadBatch(batchID: number): Promise<PopulatedBatch> {
		return Promise.resolve({ animals: [], count: 0, id: 1, name: "Empty" });
	}
	count(): Promise<Count> {
		return Promise.resolve({ animals: 10, batches: 3 });
	}
	searchAnimals(text: string): Promise<Animal[]> {
		return Promise.resolve(mockedAnimals.slice(0, 2));
	}
	moveAnimalToBatch(
		animalIDsToMove: number,
		batchID: number | null
	): Promise<boolean> {
		return Promise.resolve(true);
	}
	moveAnimalsToBatch(
		animalIDsToMove: number[],
		batchID: number | null
	): Promise<boolean> {
		return Promise.resolve(true);
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

const mockedAnimals: Animal[] = [
	{
		id: 1,
		gender: "F",
		name: "Jandaia (filha)",
		batchId: 1,
		birthdate: new Date(2023, 12, 5).toISOString(),
		code: "001",
		maternityId: 2,
		paternityId: 3,
		observation: "Some observation mock",
	},
	{
		id: 2,
		gender: "F",
		name: "Jandaia",
		batchId: 2,
		birthdate: new Date(2012, 12, 5).toISOString(),
		code: "0010",
		maternityId: 2,
		paternityId: 3,
		observation: "Some observation mock",
	},
	{
		id: 3,
		gender: "M",
		name: "Talismã",
		batchId: 3,
		birthdate: new Date(2015, 3, 5).toISOString(),
		code: "0012",
		observation: "Some observation mock",
	},
	{
		id: 4,
		gender: "M",
		name: "Goiano",
		batchId: 3,
		birthdate: new Date(2015, 1, 30).toISOString(),
		code: "0013",
		observation: "Some observation mock",
	},
	{
		id: 5,
		gender: "F",
		name: "Estrela",
		batchId: 2,
		birthdate: new Date(2014, 2, 25).toISOString(),
		code: "0014",
		observation: "Some observation mock",
	},
	{
		id: 6,
		gender: "M",
		name: "Estrela (filho)",
		batchId: 1,
		birthdate: new Date(2023, 5, 25).toISOString(),
	},
	{
		id: 7,
		gender: "M",
		name: "Lambarí",
		batchId: 1,
		birthdate: new Date(2023, 3, 25).toISOString(),
	},
	{
		id: 8,
		gender: "M",
		name: "Nébula (filho)",
		batchId: 1,
		birthdate: new Date(2023, 3, 25).toISOString(),
	},
	{
		id: 9,
		gender: "F",
		name: "Novilha de fulano",
	},
	{
		id: 10,
		gender: "F",
		name: "Estrela (filha)",
	},
];

const mockedBatches: Batch[] = [
	{
		id: 1,
		name: "Bezerros",
		count: 1,
		description: "Bezerros de 7 meses a 1.5 ano",
	},
	{
		id: 2,
		name: "Vacas de leite",
		count: 2,
		description: "Vacas em lactação",
	},
	{
		id: 3,
		name: "Touros",
		count: 2,
	},
];
