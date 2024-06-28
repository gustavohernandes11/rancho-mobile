import { AddAnimal, Animal, PopulatedAnimal, UpdateAnimal } from "./Animal";
import { AddAnnotation, Annotation, UpdateAnnotation } from "./Annotation";
import { AddBatch, Batch, PopulatedBatch, UpdateBatch } from "./Batch";
import { Count } from "./Count";
import { DayProduction } from "./Production";
import { AnnotationQueryOptions } from "./StorageServicesMethods";

export type OrderByOptions = "alfabetic" | "age";
export type QueryOptions = {
    orderBy?: OrderByOptions;
    batchID?: number;
    searchText?: string;
};

export interface StorageRepository {
    count(): Promise<Count>;
    clearDatabase(): Promise<boolean>;
    initDatabase(): Promise<void>;

    insertAnimal(animal: AddAnimal): Promise<number | undefined>;
    insertBatch(batch: AddBatch): Promise<number | undefined>;
    insertAnnotation(annotation: AddAnnotation): Promise<number | undefined>;

    getAnimal(animalID: number): Promise<Animal>;
    getPopulatedBatch(batchID: number): Promise<PopulatedBatch>;
    getPopulatedAnimal(animalID: number): Promise<PopulatedAnimal>;
    getDayProduction(date: Date): Promise<DayProduction | null>;
    getAnnotation(id: number): Promise<Annotation | null>;

    listAnimals(query?: QueryOptions): Promise<Animal[]>;
    listBatches(): Promise<Batch[]>;
    listTimespanProduction(start: Date, end: Date): Promise<DayProduction[]>;
    listAnnotations(query?: AnnotationQueryOptions): Promise<Annotation[]>;

    updateAnimal(updateData: UpdateAnimal | UpdateAnimal[]): Promise<boolean>;
    updateBatch(updateData: UpdateBatch | UpdateBatch[]): Promise<boolean>;
    upsertDayProduction(production: DayProduction): Promise<boolean>;
    updateAnnotation(
        updateData: UpdateAnnotation | UpdateAnnotation[]
    ): Promise<boolean>;

    deleteAnimal(animalID: number | number[]): Promise<boolean>;
    deleteBatch(batchID: number): Promise<boolean>;
    deleteAnnotation(id: number): Promise<boolean>;

    setAnimalBatch(
        animalID: number | number[],
        batchID: number | null
    ): Promise<boolean>;

    nullifyParentalIds(animalID: number | number[]): Promise<boolean>;
}
