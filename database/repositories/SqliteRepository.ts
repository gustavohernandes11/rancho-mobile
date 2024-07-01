import { SQLiteExecuteAsyncResult, openDatabaseSync } from "expo-sqlite";
import moment from "moment";
import {
    AddAnimal,
    AddAnnotation,
    AddBatch,
    Animal,
    AnimalStatusOptions,
    Annotation,
    AnnotationQueryOptions,
    Batch,
    Count,
    DayProduction,
    PopulatedAnimal,
    PopulatedBatch,
    QueryOptions,
    StorageRepository,
    UpdateAnimal,
    UpdateAnnotation,
    UpdateBatch,
} from "types";
import { nullifyFalsyFields } from "utils/nullifyFalsyFields";

export class SqliteRepository implements StorageRepository {
    private db = openDatabaseSync("rancho.db");

    private execute = async (
        query: string,
        params: (string | number | null)[] = []
    ): Promise<SQLiteExecuteAsyncResult<any>> => {
        const statement = await this.db.prepareAsync(query);
        try {
            return statement.executeAsync(params);
        } catch (error) {
            throw error;
        }
    };

    private getOne = async <T>(
        query: string,
        params: (string | number | null)[] = []
    ): Promise<T | null> => {
        try {
            return this.db.getFirstAsync<T>(query, params);
        } catch (error) {
            throw error;
        }
    };

    private getAll = async <T>(
        query: string,
        params: (string | number | null)[] = []
    ): Promise<T[]> => {
        try {
            return this.db.getAllAsync<T>(query, params);
        } catch (error) {
            throw error;
        }
    };

    async initDatabase() {
        await Promise.all([
            this.ensureAnimalTableExists(),
            this.ensureBatchTableExists(),
            this.ensureProductionTableExists(),
            this.ensureAnnotationTableExists(),
            this.alterAnimalTableToAddStatus(),
        ]);
    }

    private ensureAnnotationTableExists = async () => {
        const query = `
        CREATE TABLE IF NOT EXISTS Annotations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT,
            date TEXT,
            animalIDs TEXT,
            dosage TEXT,
            medicineName TEXT
        );
        `;
        await this.execute(query, []);
    };

    private ensureAnimalTableExists = async () => {
        const query = `
		CREATE TABLE IF NOT EXISTS Animals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            gender TEXT CHECK(gender IN ('F', 'M')) NOT NULL,
            birthdate TEXT,
            batchID INTEGER REFERENCES Batches(id),
            code TEXT,
            paternityID INTEGER REFERENCES Animals(id),
            maternityID INTEGER REFERENCES Animals(id),
            observation TEXT
			);`;

        await this.execute(query, []);
    };

    private ensureBatchTableExists = async () => {
        const query = `
		CREATE TABLE IF NOT EXISTS Batches (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT
        );
		`;

        await this.execute(query, []);
    };

    private ensureProductionTableExists = async () => {
        const query = `
		  CREATE TABLE IF NOT EXISTS DayProduction (
			day TEXT PRIMARY KEY,
			quantity INTEGER
		  );
		`;

        await this.execute(query, []);
    };

    private alterAnimalTableToAddStatus = async () => {
        const query = `
            ALTER TABLE Animals
            ADD COLUMN status TEXT DEFAULT 'active';
        `;

        try {
            await this.execute(query, []);
        } catch {
            // already done
        }
    };

    private formatDate = (date: Date) => date.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD

    async setAnimalStatus(
        animalID: number | number[],
        status: AnimalStatusOptions
    ): Promise<boolean> {
        if (Array.isArray(animalID)) {
            const operations = animalID.map(id =>
                this.setAnimalStatus(id, status)
            );

            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const query = `
		UPDATE Animals SET 
			status = ?
		WHERE id = ?
		`;

        return this.execute(query, [status, animalID])
            .then(() => true)
            .catch(() => false);
    }

    async count(): Promise<Count> {
        const countAnimalsQuery = `
        SELECT COUNT(id) AS animals
        FROM Animals
        WHERE status = 'active'
        `;

        const countBatchesQuery = `
		SELECT COUNT(id) AS batches 
		FROM Batches
		`;

        const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
        const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

        const countLitersProducedQuery = `
        SELECT SUM(quantity) AS litersProduced 
        FROM DayProduction
        WHERE day >= ? AND day <= ?
        `;

        const [animalsResult, batchesResult, litersProducedResult] =
            await Promise.all([
                this.getOne<{ animals: number }>(countAnimalsQuery, []),
                this.getOne<{ batches: number }>(countBatchesQuery, []),
                this.getOne<{ litersProduced: number }>(
                    countLitersProducedQuery,
                    [startOfMonth, endOfMonth]
                ),
            ]);

        return {
            animals: animalsResult?.animals || 0,
            batches: batchesResult?.batches || 0,
            litersProduced: litersProducedResult?.litersProduced || 0,
        };
    }

    async clearDatabase(): Promise<boolean> {
        const dropAnimalsQuery = `
		DROP TABLE IF EXISTS Animals
		`;

        const dropBatchesQuery = `
		DROP TABLE IF EXISTS Batches
		`;

        const operations = [
            this.execute(dropAnimalsQuery),
            this.execute(dropBatchesQuery),
        ];

        return Promise.all(operations)
            .then(() => true)
            .catch(() => false);
    }

    async insertAnimal(animal: AddAnimal): Promise<number | undefined> {
        const query = `
		INSERT INTO Animals 
			(name, gender, birthdate, batchID, code, paternityID, maternityID, observation, status)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
		`;

        const parsed = nullifyFalsyFields(animal);
        const params = [
            parsed.name,
            parsed.gender,
            parsed.birthdate,
            parsed.batchID,
            parsed.code,
            parsed.paternityID,
            parsed.maternityID,
            parsed.observation,
            parsed.status,
        ];

        return this.execute(query, params).then(
            ({ lastInsertRowId }) => lastInsertRowId
        );
    }

    async insertBatch(batch: AddBatch): Promise<number | undefined> {
        const query = `
		INSERT INTO Batches 
			(name, description)
		VALUES (?, ?);
		`;

        const parsed = nullifyFalsyFields(batch);
        const params = [parsed.name, parsed.description];

        return this.execute(query, params).then(
            ({ lastInsertRowId }) => lastInsertRowId
        );
    }

    async getAnimal(animalID: number): Promise<Animal> {
        const query = `
		SELECT 
			id, name, gender, birthdate, batchID, code, paternityID, maternityID, observation, status
		FROM Animals 
		WHERE id = ?
		`;

        return (await this.getOne<Animal>(query, [animalID])) as Animal;
    }

    async getPopulatedAnimal(animalID: number): Promise<PopulatedAnimal> {
        const animal = await this.getAnimal(animalID);

        const operations: Promise<any>[] = [this.listOffspring(animalID)];
        const resolveNull = () => Promise.resolve(null);

        operations.push(
            animal.batchID
                ? this.getPopulatedBatch(animal.batchID)
                : resolveNull()
        );
        operations.push(
            animal.maternityID
                ? this.getAnimal(animal.maternityID)
                : resolveNull()
        );
        operations.push(
            animal.paternityID
                ? this.getAnimal(animal.paternityID)
                : resolveNull()
        );

        const [offspring, batch, maternity, paternity] = await Promise.all(
            operations
        );

        return {
            ...animal,
            offspring,
            batch,
            maternity,
            paternity,
        };
    }

    private async listOffspring(animalID: number): Promise<Animal[]> {
        const query = `
		SELECT 
			id, name, gender, birthdate, batchID, code, paternityID, maternityID, observation, status
		FROM Animals 
		WHERE paternityID = ? OR maternityID = ?
		`;

        return this.getAll<Animal>(query, [animalID, animalID]);
    }

    async listAnimals(queryOptions: QueryOptions = {}): Promise<Animal[]> {
        let query = `
		SELECT 
			id, name, gender, birthdate, batchID, code, paternityID, maternityID, observation, status
		FROM Animals
		`;

        const params: (string | number)[] = [];

        if (queryOptions.batchID) {
            query += ` WHERE batchID = ?`;
            params.push(queryOptions.batchID);
        }

        if (queryOptions.searchText) {
            query += queryOptions.batchID ? ` AND` : ` WHERE`;
            query += ` (name LIKE '%' || ? || '%' OR code LIKE '%' || ? || '%' OR observation LIKE '%' || ? || '%')`;
            params.push(
                queryOptions.searchText,
                queryOptions.searchText,
                queryOptions.searchText
            );
        }

        if (queryOptions.status && queryOptions.status.length > 0) {
            query +=
                queryOptions.batchID !== undefined || queryOptions.searchText
                    ? ` AND`
                    : ` WHERE`;

            query += ` status IN (${queryOptions.status
                .map(() => "?")
                .join(",")})`;

            params.push(...queryOptions.status);
        }

        switch (queryOptions.orderBy) {
            case "alfabetic":
                query += ` ORDER BY name`;
                break;
            case "age":
                query += ` ORDER BY CASE WHEN birthdate IS NULL THEN 1 ELSE 0 END, birthdate DESC`;
                break;
            default:
                query += ` ORDER BY name`;
                break;
        }

        return this.getAll<Animal>(query, params);
    }

    async getPopulatedBatch(batchID: number): Promise<PopulatedBatch> {
        const loadBatchQuery = `
        SELECT 
            Batches.id, Batches.name, Batches.description,
            COUNT(Animals.id) AS count
        FROM Batches
        LEFT JOIN Animals ON Batches.id = Animals.batchID
        WHERE Batches.id = ?
        GROUP BY Batches.id, Batches.name, Batches.description
        `;

        const [batchInfo, animals] = await Promise.all([
            this.getOne<Batch>(loadBatchQuery, [batchID]),
            this.listAnimals({ batchID }),
        ]);

        return {
            ...batchInfo,
            animals,
        } as PopulatedBatch;
    }

    async listBatches(): Promise<Batch[]> {
        const query = `
		SELECT 
        	Batches.id, Batches.name, Batches.description,
        	COUNT(Animals.id) AS count
    	FROM Batches
    	LEFT JOIN Animals ON Batches.id = Animals.batchID
    	GROUP BY Batches.id, Batches.name, Batches.description
		`;

        return this.getAll<Batch>(query, []);
    }

    async updateAnimal(
        updateData: UpdateAnimal | UpdateAnimal[]
    ): Promise<boolean> {
        if (Array.isArray(updateData)) {
            const operations = updateData.map(data => this.updateAnimal(data));
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const query = `
		UPDATE Animals SET 
			name = ?, gender = ?, birthdate = ?, batchID = ?, code = ?, paternityID = ?, maternityID = ?, observation = ?, status = ?
		WHERE id = ?
		`;

        const parsed = nullifyFalsyFields(updateData);
        const params = [
            parsed.name,
            parsed.gender,
            parsed.birthdate,
            parsed.batchID,
            parsed.code,
            parsed.paternityID,
            parsed.maternityID,
            parsed.observation,
            parsed.status,
            parsed.id,
        ];

        return this.execute(query, params)
            .then(() => true)
            .catch(() => false);
    }

    async updateBatch(
        updateData: UpdateBatch | UpdateBatch[]
    ): Promise<boolean> {
        if (Array.isArray(updateData)) {
            const operations = updateData.map(data => this.updateBatch(data));
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const query = `
		UPDATE Batches SET 
			name = ?, description = ?
		WHERE id = ?
		`;

        const parsed = nullifyFalsyFields(updateData);
        const params = [parsed.name, parsed.description, parsed.id];

        return this.execute(query, params)
            .then(() => true)
            .catch(() => false);
    }

    async deleteAnimal(animalID: number | number[]): Promise<boolean> {
        if (Array.isArray(animalID)) {
            const operations = animalID.map(id => this.deleteAnimal(id));
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const deleteQuery = `
		DELETE FROM Animals 
		WHERE id = ?
		`;

        return this.execute(deleteQuery, [animalID])
            .then(() => true)
            .catch(() => false);
    }

    async deleteBatch(batchID: number): Promise<boolean> {
        const deleteBatchQuery = `
		DELETE FROM Batches 
		WHERE id = ?;
		`;

        const unlinkAnimalsQuery = `
		UPDATE Animals 
		SET batchID = NULL 
		WHERE batchID = ?;
		`;

        const operations = [
            this.execute(deleteBatchQuery, [batchID]),
            this.execute(unlinkAnimalsQuery, [batchID]),
        ];

        return Promise.all(operations)
            .then(() => true)
            .catch(() => false);
    }

    async setAnimalBatch(
        animalID: number | number[],
        batchID: number | null
    ): Promise<boolean> {
        if (Array.isArray(animalID)) {
            const operations = animalID.map(id =>
                this.setAnimalBatch(id, batchID)
            );
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const query = `
		UPDATE Animals SET 
			batchID = ?
		WHERE id = ?
		`;

        return this.execute(query, [batchID, animalID])
            .then(() => true)
            .catch(() => false);
    }

    async nullifyParentalIds(parentID: number | number[]): Promise<boolean> {
        if (Array.isArray(parentID)) {
            const operations = parentID.map(id => this.nullifyParentalIds(id));
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const nullifyPaternityQuery = `
		UPDATE Animals
		SET paternityID = NULL
		WHERE paternityID = ?
		`;
        const nullifyMaternityQuery = `
		UPDATE Animals
		SET maternityID = NULL
		WHERE maternityID = ?
		`;

        const operations = [
            this.execute(nullifyPaternityQuery, [parentID]),
            this.execute(nullifyMaternityQuery, [parentID]),
        ];

        return Promise.all(operations)
            .then(() => true)
            .catch(() => false);
    }

    async upsertDayProduction(production: DayProduction): Promise<boolean> {
        const { day, quantity } = production;
        const formattedDay = day.split("T")[0];
        const query = `
		INSERT INTO DayProduction (day, quantity)
		VALUES (?, ?)
		ON CONFLICT(day) DO UPDATE SET quantity = excluded.quantity;
		`;

        const params = [formattedDay, quantity];

        try {
            await this.execute(query, params);
            return true;
        } catch {
            return false;
        }
    }

    async listTimespanProduction(
        start: Date,
        end: Date
    ): Promise<DayProduction[]> {
        const query = `
		SELECT day, quantity
		FROM DayProduction
		WHERE day BETWEEN ? AND ?
		ORDER BY day;
		`;

        const formattedStart = this.formatDate(start);
        const formattedEnd = this.formatDate(end);
        const params = [formattedStart, formattedEnd];

        try {
            return this.getAll<DayProduction>(query, params);
        } catch {
            return [];
        }
    }

    async getDayProduction(date: Date): Promise<DayProduction | null> {
        const query = `
		SELECT day, quantity
		FROM DayProduction
		WHERE day = ?;
		`;

        const formattedDate = this.formatDate(date);
        const params = [formattedDate];

        const production = await this.getOne<DayProduction>(query, params);
        return production || null;
    }
    private convertAnimalIDsToString(animalIDs: number[]): string {
        return animalIDs.join(",");
    }
    async insertAnnotation(
        annotation: AddAnnotation
    ): Promise<number | undefined> {
        const query = `
		INSERT INTO Annotations (title, type, description, date, animalIDs, dosage, medicineName)
		VALUES (?, ?, ?, ?, ?, ?, ?);
		`;

        const parsed = nullifyFalsyFields(annotation);

        const params = [
            parsed.title,
            parsed.type,
            parsed.description,
            parsed.date ? moment(parsed.date).toISOString() : null,
            parsed.animalIDs
                ? this.convertAnimalIDsToString(parsed.animalIDs)
                : null,
            parsed.dosage,
            parsed.medicineName,
        ];
        return this.execute(query, params).then(
            ({ lastInsertRowId }) => lastInsertRowId
        );
    }
    private convertStringToAnimalIDs(animalIDsString: string): number[] {
        return animalIDsString.split(",").map(Number);
    }
    async getAnnotation(id: number): Promise<Annotation | null> {
        const query = `
        SELECT id, title, type, description, date, animalIDs, dosage, medicineName
        FROM Annotations
        WHERE id = ?;
        `;

        const annotation = await this.getOne<Annotation>(query, [id]);

        if (!annotation) {
            return null;
        }

        return {
            ...annotation,
            date: annotation.date ? new Date(annotation.date) : null,
            animalIDs: annotation.animalIDs
                ? this.convertStringToAnimalIDs(
                      annotation.animalIDs as unknown as string
                  )
                : [],
        } as Annotation;
    }
    async listAnnotations(
        queryOptions?: AnnotationQueryOptions
    ): Promise<Annotation[]> {
        let sqlQuery = `
        SELECT id, title, type, description, date, animalIDs, dosage, medicineName
        FROM Annotations
        `;

        const params: (string | number)[] = [];
        if (queryOptions?.types && queryOptions.types.length > 0) {
            const placeholders = queryOptions.types.map(() => "?").join(", ");
            sqlQuery += ` WHERE type IN (${placeholders})`;
            params.push(...queryOptions.types);
        }

        if (queryOptions?.searchText) {
            sqlQuery +=
                queryOptions.types && queryOptions.types.length > 0
                    ? ` AND`
                    : ` WHERE`;
            sqlQuery += ` (title LIKE '%' || ? || '%' OR description LIKE '%' || ? || '%')`;
            params.push(queryOptions.searchText, queryOptions.searchText);
        }

        const annotations = await this.getAll<Annotation>(sqlQuery, params);

        return annotations.map(annotation => ({
            ...annotation,
            date: annotation.date ? new Date(annotation.date) : undefined,
            animalIDs: annotation.animalIDs
                ? this.convertStringToAnimalIDs(
                      annotation.animalIDs as unknown as string
                  )
                : [],
        }));
    }
    async updateAnnotation(
        updateData: UpdateAnnotation | UpdateAnnotation[]
    ): Promise<boolean> {
        if (Array.isArray(updateData)) {
            const operations = updateData.map(data =>
                this.updateAnnotation(data)
            );
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const query = `
        UPDATE Annotations SET 
            title = ?, type = ?, description = ?, date = ?, animalIDs = ?, dosage = ?, medicineName = ?
        WHERE id = ?;
        `;

        const parsed = nullifyFalsyFields(updateData);

        const params = [
            parsed.title,
            parsed.type,
            parsed.description,
            parsed.date ? moment(parsed.date).toISOString() : null,
            parsed.animalIDs
                ? this.convertAnimalIDsToString(parsed.animalIDs)
                : null,
            parsed.dosage,
            parsed.medicineName,
            updateData.id,
        ];

        await this.execute(query, params);
        return true;
    }
    async deleteAnnotation(id: number): Promise<boolean> {
        const query = `
        DELETE FROM Annotations
        WHERE id = ?;
        `;

        return this.execute(query, [id])
            .then(() => true)
            .catch(() => false);
    }
    async unlinkAnimalFromAnnotations(
        animalID: number | number[]
    ): Promise<boolean> {
        if (Array.isArray(animalID)) {
            const operations = animalID.map(id =>
                this.unlinkAnimalFromAnnotations(id)
            );
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const queryAnnotations = `
        SELECT id, animalIDs 
        FROM Annotations 
        WHERE animalIDs LIKE '%' || ? || '%';
        `;

        try {
            const annotations = await this.getAll<Annotation>(
                queryAnnotations,
                [animalID.toString()]
            );

            const updateOperations = annotations.map(async annotation => {
                const animalIDs = this.convertStringToAnimalIDs(
                    annotation.animalIDs as unknown as string
                );
                const updatedAnimalIDs = animalIDs.filter(id => id != animalID);

                const updatedAnimalIDsString =
                    this.convertAnimalIDsToString(updatedAnimalIDs);

                const updateQuery = `
                UPDATE Annotations SET animalIDs = ? WHERE id = ?;
                `;

                await this.execute(updateQuery, [
                    updatedAnimalIDsString,
                    annotation.id,
                ]);
            });

            const results = await Promise.allSettled(updateOperations);

            return results.every(result => result.status === "fulfilled");
        } catch (error) {
            return false;
        }
    }
}
