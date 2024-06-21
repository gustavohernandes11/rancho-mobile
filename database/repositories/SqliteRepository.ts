import { SQLiteExecuteAsyncResult, openDatabaseSync } from "expo-sqlite";
import {
	AddAnimal,
	AddBatch,
	Animal,
	Batch,
	PopulatedAnimal,
	PopulatedBatch,
	QueryOptions,
	StorageRepository,
	UpdateAnimal,
	UpdateBatch,
} from "types";
import { Count } from "types/Count";
import { nullifyFalsyFields } from "utils/serializers";

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
		await this.ensureAnimalTableExists();
		await this.ensureBatchTableExists();
	}

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

	async count(): Promise<Count> {
		const countAnimalsQuery = `
		SELECT COUNT(id)
		AS animals 
		FROM Animals
		`;
		const countBatchesQuery = `
		SELECT COUNT(id)
		AS batches 
		FROM Batches
		`;

		const [animals, batches] = await Promise.all([
			this.getOne<{ animal: number }>(countAnimalsQuery, []),
			this.getOne<{ batches: number }>(countBatchesQuery, []),
		]);

		return {
			...animals,
			...batches,
		} as Count;
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
			(name, gender, birthdate, batchID, code, paternityID, maternityID, observation)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?);
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
				id, name, gender, birthdate, batchID, code, paternityID, maternityID, observation
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
			id, name, gender, birthdate, batchID, code, paternityID, maternityID, observation
		FROM Animals 
		WHERE paternityID = ? OR maternityID = ?
		`;

		return this.getAll<Animal>(query, [animalID, animalID]);
	}

	async listAnimals(queryOptions: QueryOptions = {}): Promise<Animal[]> {
		let query = `
			SELECT 
				id, name, gender, birthdate, batchID, code, paternityID, maternityID, observation
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
			const operations = updateData.map((data) =>
				this.updateAnimal(data)
			);
			return Promise.all(operations)
				.then(() => true)
				.catch(() => false);
		}

		const query = `
		UPDATE Animals SET 
			name = ?, gender = ?, birthdate = ?, batchID = ?, code = ?, paternityID = ?, maternityID = ?, observation = ?
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
			const operations = updateData.map((data) => this.updateBatch(data));
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
			const operations = animalID.map((id) => this.deleteAnimal(id));
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
			const operations = animalID.map((id) =>
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
			const operations = parentID.map((id) =>
				this.nullifyParentalIds(id)
			);
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
}
