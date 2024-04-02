import { SQLResultSet, openDatabase } from "expo-sqlite";
import {
	AddAnimal,
	AddBatch,
	Animal,
	Batch,
	PopulatedBatch,
	QueryOptions,
	Repository,
	UpdateAnimal,
	UpdateBatch,
} from "types";
import { Count } from "types/Count";
import { nullifyFalsyFields } from "utils/serializers";

export class SqliteRepository implements Repository {
	private db = openDatabase("rancho.db");

	constructor() {
		this.initDatabase();
	}

	private executeQuery = async (
		query: string,
		params: (string | number | null)[] = []
	): Promise<SQLResultSet> => {
		return new Promise((resolve, reject) => {
			this.db.transaction(
				async (tx) => {
					tx.executeSql(query, params, (_, result) =>
						resolve(result)
					);
				},
				(error) => reject(error)
			);
		});
	};
	initDatabase = async () => {
		await this.ensureAnimalTableExists();
		await this.ensureBatchTableExists();
	};
	private ensureAnimalTableExists = async () => {
		const query = `
		CREATE TABLE IF NOT EXISTS Animals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            gender TEXT CHECK(gender IN ('F', 'M')) NOT NULL,
            birthdate TEXT,
            batchId INTEGER REFERENCES Batches(id),
            code TEXT,
            paternityId INTEGER REFERENCES Animals(id),
            maternityId INTEGER REFERENCES Animals(id),
            observation TEXT
        );`;

		await this.executeQuery(query, []);
	};
	private ensureBatchTableExists = async () => {
		const query = `
		CREATE TABLE IF NOT EXISTS Batches (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT
        );
		`;

		await this.executeQuery(query, []);
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

		const [animalsResult, batchesResult] = await Promise.all([
			this.executeQuery(countAnimalsQuery, []),
			this.executeQuery(countBatchesQuery, []),
		]);

		return {
			animals: animalsResult.rows.item(0).animals,
			batches: batchesResult.rows.item(0).batches,
		};
	}
	async insertAnimal(animal: AddAnimal): Promise<number | undefined> {
		const query = `
		INSERT INTO Animals 
			(name, gender, birthdate, batchId, code, paternityId, maternityId, observation)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?);
		`;

		const parsed = nullifyFalsyFields(animal);
		const params = [
			parsed.name,
			parsed.gender,
			parsed.birthdate,
			parsed.batchId,
			parsed.code,
			parsed.paternityId,
			parsed.maternityId,
			parsed.observation,
		];

		return this.executeQuery(query, params).then(
			({ insertId }) => insertId
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

		return this.executeQuery(query, params).then(
			({ insertId }) => insertId
		);
	}
	async deleteAnimal(animalID: number): Promise<boolean> {
		const deleteQuery = `
		DELETE FROM Animals 
		WHERE id = ?
		`;
		const unlinkPaternityQuery = `
		UPDATE Animals
		SET paternityId = NULL
		WHERE paternityId = ?
		`;
		const unlinkMaternityQuery = `
		UPDATE Animals
		SET maternityId = NULL
		WHERE maternityId = ?
		`;

		const operations = [
			this.executeQuery(deleteQuery, [animalID]),
			this.executeQuery(unlinkPaternityQuery, [animalID]),
			this.executeQuery(unlinkMaternityQuery, [animalID]),
		];

		return Promise.all(operations)
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
		SET batchId = NULL 
		WHERE batchId = ?;
		`;

		const operations = [
			this.executeQuery(deleteBatchQuery, [batchID]),
			this.executeQuery(unlinkAnimalsQuery, [batchID]),
		];

		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
	}
	async deleteBatchAndItsAnimals(batchID: number): Promise<boolean> {
		const deleteBatchQuery = `
		DELETE FROM Batches 
		WHERE id = ?;
		`;

		const deleteAnimals = `
		DELETE FROM Animals 
		WHERE batchId = ?;
		`;

		const operations = [
			this.executeQuery(deleteBatchQuery, [batchID]),
			this.executeQuery(deleteAnimals, [batchID]),
		];

		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
	}
	async loadAnimal(animalID: number): Promise<Animal> {
		const query = `
		SELECT 
			id, name, gender, birthdate, batchId, code, paternityId, maternityId, observation
		FROM Animals 
		WHERE id = ?
		`;

		return this.executeQuery(query, [animalID]).then(({ rows }) =>
			rows.item(0)
		);
	}
	async listAnimals({
		orderBy = "alfabetic",
		batchId,
		searchText,
	}: QueryOptions): Promise<Animal[]> {
		let query = `
			SELECT 
				id, name, gender, birthdate, batchId, code, paternityId, maternityId, observation
			FROM Animals
		`;

		const params: (string | number)[] = [];

		if (batchId !== undefined) {
			query += ` WHERE batchId = ?`;
			params.push(batchId);
		}

		if (searchText !== undefined) {
			query += batchId !== undefined ? ` AND` : ` WHERE`;
			query += ` (name LIKE '%' || ? || '%' OR code LIKE '%' || ? || '%' OR observation LIKE '%' || ? || '%')`;
			params.push(searchText, searchText, searchText);
		}

		switch (orderBy) {
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

		return this.executeQuery(query, params).then(({ rows }) => rows._array);
	}
	async loadBatchInfo(batchID: number): Promise<Batch> {
		const loadBatchQuery = `
		SELECT 
			id, name, description
		FROM Batches 
		WHERE id = ?
		`;

		const countQuery = `
		SELECT COUNT(id)
		AS count 
		FROM Animals 
		WHERE batchId = ?`;

		const [batchInfoResult, countResult] = await Promise.all([
			this.executeQuery(loadBatchQuery, [batchID]),
			this.executeQuery(countQuery, [batchID]),
		]);

		const batchInfo = batchInfoResult.rows.item(0);
		const count = countResult.rows.item(0).count;

		return { ...batchInfo, count };
	}
	async loadBatch(batchID: number): Promise<PopulatedBatch> {
		const loadBatchQuery = `
        SELECT 
            Batches.id, Batches.name, Batches.description,
            COUNT(Animals.id) AS count
        FROM Batches
        LEFT JOIN Animals ON Batches.id = Animals.batchId
        WHERE Batches.id = ?
        GROUP BY Batches.id, Batches.name, Batches.description
    `;

		const loadAnimalsQuery = `
        SELECT
            id, name, gender, birthdate, batchId, code, paternityId, maternityId, observation
        FROM Animals 
        WHERE batchId = ?
        ORDER BY name
    `;

		const [batchResult, animalsResult] = await Promise.all([
			this.executeQuery(loadBatchQuery, [batchID]),
			this.executeQuery(loadAnimalsQuery, [batchID]),
		]);

		const batchInfo = batchResult.rows.item(0);
		const animals = animalsResult.rows._array;

		return {
			...batchInfo,
			animals,
		};
	}
	async listAllBatchesInfo(): Promise<Batch[]> {
		const query = `
		SELECT 
        	Batches.id, Batches.name, Batches.description,
        COUNT(Animals.id) AS count
    	FROM Batches
    	LEFT JOIN Animals ON Batches.id = Animals.batchId
    	GROUP BY Batches.id, Batches.name, Batches.description
		`;

		return this.executeQuery(query, []).then(({ rows }) => rows._array);
	}
	async clearDatabase(): Promise<boolean> {
		const dropAnimalsQuery = `
		DROP TABLE IF EXISTS Animals
		`;

		const dropBatchesQuery = `
		DROP TABLE IF EXISTS Batches
		`;

		const operations = [
			this.executeQuery(dropAnimalsQuery),
			this.executeQuery(dropBatchesQuery),
		];

		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
	}
	async updateAnimal(updateData: UpdateAnimal): Promise<Animal> {
		const query = `
		UPDATE Animals SET 
			name = ?, gender = ?, birthdate = ?, batchId = ?, code = ?, paternityId = ?, maternityId = ?, observation = ?
		WHERE id = ?
		`;

		const parsed = nullifyFalsyFields(updateData);
		const params = [
			parsed.name,
			parsed.gender,
			parsed.birthdate,
			parsed.batchId,
			parsed.code,
			parsed.paternityId,
			parsed.maternityId,
			parsed.observation,
			parsed.id,
		];

		return this.executeQuery(query, params).then(() =>
			this.loadAnimal(updateData.id)
		);
	}
	async updateBatch(updateData: UpdateBatch): Promise<Batch> {
		const query = `
		UPDATE Batches SET 
			name = ?, description = ?
		WHERE id = ?
		`;

		const parsed = nullifyFalsyFields(updateData);
		const params = [parsed.name, parsed.description, parsed.id];

		return this.executeQuery(query, params).then(() =>
			this.loadBatchInfo(updateData.id)
		);
	}
	async updateManyAnimals(updateDataList: UpdateAnimal[]): Promise<Animal[]> {
		const operations = updateDataList.map((updateData) =>
			this.updateAnimal(updateData)
		);

		return Promise.all(operations);
	}
	async deleteManyAnimals(animalIDsToDelete: number[]): Promise<boolean> {
		const operations = animalIDsToDelete.map((id) => this.deleteAnimal(id));

		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
	}
	async moveAnimalToBatch(
		batchID: number | null,
		animalId: number
	): Promise<boolean> {
		const query = `
		UPDATE Animals SET 
			batchId = ?
		WHERE id = ?
		`;

		return this.executeQuery(query, [batchID, animalId])
			.then(() => true)
			.catch(() => false);
	}
	async moveAnimalsToBatch(
		animalIDsToMove: number[],
		batchID: number | null
	): Promise<boolean> {
		const operations = animalIDsToMove.map((animalId) =>
			this.moveAnimalToBatch(batchID, animalId)
		);

		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
	}
}
