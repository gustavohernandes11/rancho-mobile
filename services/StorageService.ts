import { AnimalRepository } from "database/repositories/AnimalRepository";
import { AnnotationRepository } from "database/repositories/AnnotationRepository";
import { BatchRepository } from "database/repositories/BatchRepository";
import { MonthDetailsRepository } from "database/repositories/MonthDetailsRepository";
import { ProductionRepository } from "database/repositories/ProductionRepository";
import { UserInformationRepository } from "database/repositories/UserInformationRepository";
import moment from "moment";
import {
    AddAnimal,
    AddAnnotation,
    AddBatch,
    Animal,
    AnimalPreview,
    Annotation,
    AnnotationQueryOptions,
    Batch,
    Count,
    DayProduction,
    MonthDetails,
    PopulatedAnimal,
    PopulatedBatch,
    QueryOptions,
    StorageServicesMethods,
    UpdateAnimal,
    UpdateAnnotation,
    UpdateBatch,
} from "types";
import { formatDateToISO } from "utils/formatters";

export class StorageServices implements StorageServicesMethods {
    constructor(
        private readonly animalRepository: AnimalRepository,
        private readonly batchRepository: BatchRepository,
        private readonly annotationRepository: AnnotationRepository,
        private readonly monthDetailsRepository: MonthDetailsRepository,
        private readonly productionRepository: ProductionRepository,
        private readonly userInformationRepository: UserInformationRepository
    ) {}
    getMonthDetails(month: Date): Promise<MonthDetails | null> {
        return this.monthDetailsRepository.getMonthDetails(month);
    }

    upsertMonthDetails(monthDetails: MonthDetails): Promise<boolean> {
        return this.monthDetailsRepository.upsertMonthDetails(monthDetails);
    }

    count(): Promise<Count> {
        return this.userInformationRepository.count();
    }

    insertAnimal(animal: AddAnimal): Promise<number | undefined> {
        return this.animalRepository.insertAnimal(animal);
    }

    insertBatch(batch: AddBatch): Promise<number | undefined> {
        return this.batchRepository.insertBatch(batch);
    }

    getAnimal(animalID: number): Promise<Animal> {
        return this.animalRepository.getAnimal(animalID);
    }

    async getPopulatedAnimal(animalID: number): Promise<PopulatedAnimal> {
        const animal = await this.getAnimal(animalID);

        const operations: Promise<any>[] = [
            this.animalRepository.listOffspring(animalID),
        ];
        const resolveNull = () => Promise.resolve(null);

        operations.push(
            animal.batchID
                ? this.batchRepository.getBatch(animal.batchID)
                : resolveNull()
        );
        operations.push(
            animal.maternityID
                ? this.animalRepository.getAnimal(animal.maternityID)
                : resolveNull()
        );
        operations.push(
            animal.paternityID
                ? this.animalRepository.getAnimal(animal.paternityID)
                : resolveNull()
        );
        operations.push(
            this.annotationRepository.listAnnotations({
                includesAnimalId: animal.id,
            })
        );

        const [offspring, batch, maternity, paternity, annotations] =
            await Promise.all(operations);

        return {
            ...animal,
            offspring,
            batch,
            maternity,
            paternity,
            annotations,
        };
    }

    async getPopulatedBatch(batchID: number): Promise<PopulatedBatch> {
        const [batch, animals] = await Promise.all([
            this.batchRepository.getBatch(batchID),
            this.animalRepository.listAnimals({ batchID }),
        ]);

        return {
            ...batch,
            animals,
        } as PopulatedBatch;
    }

    listAnimals(query?: QueryOptions): Promise<Animal[]> {
        return this.animalRepository.listAnimals(query);
    }

    private populateAnimalsPreview = async (
        animals: Animal[]
    ): Promise<AnimalPreview[]> => {
        return Promise.all(
            animals.map(async animal => {
                if (animal.batchID) {
                    const batch = await this.batchRepository.getBatch(
                        animal.batchID
                    );
                    if (batch) {
                        return { ...animal, batch };
                    }
                }
                return animal;
            })
        );
    };

    async listAnimalPreview(query?: QueryOptions): Promise<AnimalPreview[]> {
        const animals = await this.animalRepository.listAnimals(query);
        return this.populateAnimalsPreview(animals);
    }

    listBatches(): Promise<Batch[]> {
        return this.batchRepository.listBatches();
    }

    updateAnimal(updateData: UpdateAnimal | UpdateAnimal[]): Promise<boolean> {
        return this.animalRepository.updateAnimal(updateData);
    }

    async updateBatch(
        updateData: UpdateBatch | UpdateBatch[]
    ): Promise<boolean> {
        if (Array.isArray(updateData)) {
            for (const batch of updateData) {
                await this.batchRepository.updateBatch(batch);
            }
        } else {
            await this.batchRepository.updateBatch(updateData);
        }
        return true;
    }

    async deleteAnimal(animalID: number | number[]): Promise<boolean> {
        await Promise.all([
            this.animalRepository.nullifyParentalIds(animalID),
            this.annotationRepository.unlinkAnimalFromAnnotations(animalID),
        ]);

        return await this.animalRepository.deleteAnimal(animalID);
    }

    async deleteBatch(batchID: number): Promise<boolean> {
        const animalsToUnlink = await this.animalRepository.listAnimals({
            batchID,
        });
        const operations = animalsToUnlink.map(animal =>
            this.animalRepository.setAnimalBatch(animal.id, null)
        );
        operations.push(this.batchRepository.deleteBatch(batchID));

        return Promise.all(operations)
            .then(() => true)
            .catch(() => false);
    }

    async deleteBatchWithAnimals(batchID: number): Promise<boolean> {
        const animalsToDelete = await this.animalRepository.listAnimals({
            batchID,
        });
        const operations = animalsToDelete.map(animal =>
            this.deleteAnimal(animal.id)
        );
        operations.push(this.batchRepository.deleteBatch(batchID));

        return Promise.all(operations)
            .then(() => true)
            .catch(() => false);
    }

    moveAnimalToBatch(
        animalID: number | number[],
        batchID: number | null
    ): Promise<boolean> {
        return this.animalRepository.setAnimalBatch(animalID, batchID);
    }

    async compareBatchAnimalsWithSelectedAndUpdate(
        selectedIDs: number[],
        batchID: number
    ): Promise<boolean> {
        const [batch, animals] = await Promise.all([
            this.getPopulatedBatch(batchID),
            this.animalRepository.listAnimals(),
        ]);

        let operations = animals.map(animal => {
            const isSelected = selectedIDs.includes(animal.id);
            const belongsToBatch = animal.batchID === batch.id;

            if (belongsToBatch && !isSelected) {
                return this.animalRepository.setAnimalBatch(animal.id, null);
            } else if (!belongsToBatch && isSelected) {
                return this.animalRepository.setAnimalBatch(
                    animal.id,
                    batch.id
                );
            }
        });

        return Promise.all(operations)
            .then(() => true)
            .catch(() => false);
    }

    upsertDayProduction(production: DayProduction): Promise<boolean> {
        return this.productionRepository.upsertDayProduction(production);
    }

    listMonthProduction(month: Date): Promise<DayProduction[]> {
        const startOfMonth = moment(month).startOf("month").toDate();
        const endOfMonth = moment(month).endOf("month").toDate();

        return this.productionRepository.listTimespanProduction(
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
            daysInMonth.push(formatDateToISO(date));
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
        return this.productionRepository.getDayProduction(date);
    }

    async generateDeathAnnotation(
        animalID: number | number[],
        reason: string
    ): Promise<boolean> {
        let title = "";
        let relatedAnimalIDs: number[] = [];

        if (Array.isArray(animalID)) {
            title = animalID.length + " animais morreram.";
            relatedAnimalIDs = animalID;
        } else {
            const animal = await this.animalRepository.getAnimal(animalID);
            title = animal.name + " morreu.";
            relatedAnimalIDs = [animalID];
        }

        this.annotationRepository.insertAnnotation({
            title,
            type: "death",
            animalIDs: relatedAnimalIDs,
            date: new Date(),
            description: reason,
        });

        return true;
    }

    async generateSaleAnnotation(
        animalID: number | number[],
        reason: string
    ): Promise<boolean> {
        let title = "";
        let relatedAnimalIDs: number[] = [];

        if (Array.isArray(animalID)) {
            title = animalID.length + " animais foram vendidos.";
            relatedAnimalIDs = animalID;
        } else {
            const animal = await this.animalRepository.getAnimal(animalID);
            title = animal.name + " foi vendido.";
            relatedAnimalIDs = [animalID];
        }

        await this.annotationRepository.insertAnnotation({
            title,
            type: "sell",
            animalIDs: relatedAnimalIDs,
            date: new Date(),
            description: reason,
        });

        return true;
    }

    async writeOffByDeath(
        animalIDs: number | number[],
        generateAnnotation: boolean,
        reason: string
    ): Promise<boolean> {
        try {
            if (generateAnnotation) {
                await this.generateDeathAnnotation(animalIDs, reason);
            }
            await this.animalRepository.setAnimalStatus(animalIDs, "dead");

            return true;
        } catch {
            return false;
        }
    }

    async writeOffBySale(
        animalIDs: number | number[],
        generateAnnotation: boolean,
        reason: string
    ): Promise<boolean> {
        try {
            if (generateAnnotation) {
                await this.generateSaleAnnotation(animalIDs, reason);
            }
            await this.animalRepository.setAnimalStatus(animalIDs, "sold");

            return true;
        } catch {
            return false;
        }
    }

    insertAnnotation(annotation: AddAnnotation): Promise<number | undefined> {
        return this.annotationRepository.insertAnnotation(annotation);
    }

    getAnnotation(id: number): Promise<Annotation | null> {
        return this.annotationRepository.getAnnotation(id);
    }

    listAnnotations(
        query?: AnnotationQueryOptions | undefined
    ): Promise<Annotation[]> {
        return this.annotationRepository.listAnnotations(query);
    }

    updateAnnotation(
        updateData: UpdateAnnotation | UpdateAnnotation[]
    ): Promise<boolean> {
        return this.annotationRepository.updateAnnotation(updateData);
    }

    deleteAnnotation(id: number): Promise<boolean> {
        return this.annotationRepository.deleteAnnotation(id);
    }
}

const animalRepository = new AnimalRepository();
const batchRepository = new BatchRepository();
const annotationRepository = new AnnotationRepository();
const monthDetailsRepository = new MonthDetailsRepository();
const productionRepository = new ProductionRepository();
const userInformationRepository = new UserInformationRepository();

export const Storage = new StorageServices(
    animalRepository,
    batchRepository,
    annotationRepository,
    monthDetailsRepository,
    productionRepository,
    userInformationRepository
);
