import { AddAnimal, Animal, PopulatedAnimal, UpdateAnimal } from "./Animal";
import { AddAnnotation, Annotation, UpdateAnnotation } from "./Annotation";
import { AddBatch, Batch, PopulatedBatch, UpdateBatch } from "./Batch";
import { Count } from "./Count";
import { DayProduction } from "./Production";

export type OrderByOptions = "alfabetic" | "age";

export type AnimalQueryOptions = {
	orderBy?: OrderByOptions;
	batchID?: number;
	searchText?: string;
};

export type AnnotationQueryOptions = {
	searchText?: string;
	types?: ("simple" | "death" | "purchase" | "heath care" | "sell")[];
};

export interface StorageServicesMethods {
	count(): Promise<Count>;

	insertAnimal(animal: AddAnimal): Promise<number | undefined>;
	insertBatch(batch: AddBatch): Promise<number | undefined>;
	insertAnnotation(annotation: AddAnnotation): Promise<number | undefined>;

	getAnimal(animalID: number): Promise<Animal>;
	getPopulatedAnimal(animalID: number): Promise<PopulatedAnimal>;
	getPopulatedBatch(batchID: number): Promise<PopulatedBatch>;
	getDayProduction(date: Date): Promise<DayProduction | null>;
	getAnnotation(id: number): Promise<Annotation | null>;

	listAnimals(query?: AnimalQueryOptions): Promise<Animal[]>;
	listBatches(): Promise<Batch[]>;
	listMonthProduction(month: Date): Promise<DayProduction[]>;
	listAnnotations(query?: AnnotationQueryOptions): Promise<Annotation[]>;

	updateAnimal(updateData: UpdateAnimal | UpdateAnimal[]): Promise<boolean>;
	updateBatch(updateData: UpdateBatch): Promise<boolean>;
	upsertDayProduction(production: DayProduction): Promise<boolean>;
	updateAnnotation(
		updateData: UpdateAnnotation | UpdateAnnotation[]
	): Promise<boolean>;

	deleteAnimal(animalID: number | number[]): Promise<boolean>;
	deleteBatch(batchID: number): Promise<boolean>;
	deleteBatchWithAnimals(batchID: number): Promise<boolean>;
	deleteAnnotation(id: number): Promise<boolean>;

	moveAnimalToBatch(
		animalIDsToMove: number | number[],
		batchID: number | null
	): Promise<boolean>;

	compareBatchAnimalsWithSelectedAndUpdate(
		animalIDsToCompare: number[],
		batchID: number
	): Promise<boolean>;
}
