import moment from "moment";
import {
    AddAnimal,
    AddAnnotation,
    AddBatch,
    Animal,
    Annotation,
    AnnotationQueryOptions,
    Batch,
    Count,
    DayProduction,
    PopulatedAnimal,
    PopulatedBatch,
    QueryOptions,
    StorageRepository,
    StorageServicesMethods,
    UpdateAnimal,
    UpdateAnnotation,
    UpdateBatch,
} from "types";

import { SqliteRepository } from "../database/repositories/SqliteRepository";

export class StorageServices implements StorageServicesMethods {
    constructor(private readonly DbRepository: StorageRepository) {
        this.DbRepository.initDatabase();
    }

    insertAnnotation(annotation: AddAnnotation): Promise<number | undefined> {
        return this.DbRepository.insertAnnotation(annotation);
    }

    getAnnotation(id: number): Promise<Annotation | null> {
        return this.DbRepository.getAnnotation(id);
    }

    listAnnotations(
        query?: AnnotationQueryOptions | undefined
    ): Promise<Annotation[]> {
        return this.DbRepository.listAnnotations(query);
    }

    updateAnnotation(
        updateData: UpdateAnnotation | UpdateAnnotation[]
    ): Promise<boolean> {
        return this.DbRepository.updateAnnotation(updateData);
    }

    deleteAnnotation(id: number): Promise<boolean> {
        return this.DbRepository.deleteAnnotation(id);
    }

    count(): Promise<Count> {
        return this.DbRepository.count();
    }

    insertAnimal(animal: AddAnimal): Promise<number | undefined> {
        return this.DbRepository.insertAnimal(animal);
    }

    insertBatch(batch: AddBatch): Promise<number | undefined> {
        return this.DbRepository.insertBatch(batch);
    }

    getAnimal(animalID: number): Promise<Animal> {
        return this.DbRepository.getAnimal(animalID);
    }

    getPopulatedAnimal(animalID: number): Promise<PopulatedAnimal> {
        return this.DbRepository.getPopulatedAnimal(animalID);
    }

    getPopulatedBatch(batchID: number): Promise<PopulatedBatch> {
        return this.DbRepository.getPopulatedBatch(batchID);
    }

    listAnimals(query?: QueryOptions): Promise<Animal[]> {
        return this.DbRepository.listAnimals(query);
    }

    listBatches(): Promise<Batch[]> {
        return this.DbRepository.listBatches();
    }

    updateAnimal(updateData: UpdateAnimal | UpdateAnimal[]): Promise<boolean> {
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

    deleteAnimal(animalID: number | number[]): Promise<boolean> {
        return this.DbRepository.nullifyParentalIds(animalID).then(() =>
            this.DbRepository.deleteAnimal(animalID)
        );
    }

    async deleteBatch(batchID: number): Promise<boolean> {
        const animalsToUnlink = await this.DbRepository.listAnimals({
            batchID,
        });
        const operations = animalsToUnlink.map(animal =>
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
        const operations = animalsToDelete.map(animal =>
            this.deleteAnimal(animal.id)
        );
        operations.push(this.DbRepository.deleteBatch(batchID));

        return Promise.all(operations)
            .then(() => true)
            .catch(() => false);
    }

    moveAnimalToBatch(
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

        let operations = animals.map(animal => {
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

    upsertDayProduction(production: DayProduction): Promise<boolean> {
        return this.DbRepository.upsertDayProduction(production);
    }

    listMonthProduction(month: Date): Promise<DayProduction[]> {
        const startOfMonth = moment(month).startOf("month").toDate();
        const endOfMonth = moment(month).endOf("month").toDate();

        return this.DbRepository.listTimespanProduction(
            startOfMonth,
            endOfMonth
        );
    }

    // set 0 to days without quantity
    async listPopulatedMonthProduction(month: Date): Promise<DayProduction[]> {
        const productionData = await this.listMonthProduction(month);

        const startOfMonth = moment(month).startOf("month").toDate();
        const endOfMonth = moment(month).endOf("month").toDate();

        const daysInMonth = [];
        for (
            let date = startOfMonth;
            date <= endOfMonth;
            date.setDate(date.getDate() + 1)
        ) {
            daysInMonth.push(moment(date).format("YYYY-MM-DD"));
        }

        const productionMap = new Map(
            productionData.map(p => [p.day, p.quantity])
        );

        const completeProduction: DayProduction[] = daysInMonth.map(day => ({
            day,
            quantity: productionMap.get(day) || 0,
        }));

        return completeProduction;
    }

    getDayProduction(date: Date): Promise<DayProduction | null> {
        return this.DbRepository.getDayProduction(date);
    }
}

const sqliteRepository = new SqliteRepository();
export const Storage = new StorageServices(sqliteRepository);
