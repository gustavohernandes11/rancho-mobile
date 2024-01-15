import { openDatabase } from "expo-sqlite";
import { AddAnimal, Animal, UpdateAnimal } from "types/Animal";
import { AddBatch, Batch, UpdateBatch } from "types/Batch";
import { DatabaseRepository } from "types/DatabaseRepository";
import { nullifyFalsyFields } from "utils/nullifyFalsyFields";

export class SqliteRepository implements DatabaseRepository {
	private db = openDatabase("rancho.db");

	constructor() {
		this.initDatabase();
	}
	private execQueryAsync = async (query: string, params: any[] = []) => {
		this.db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(query, params);
			console.log(result);
		});
	};
	initDatabase = async () => {
		await this.ensureAnimalTableExists();
		await this.ensureBatchTableExists();
	};
	private ensureAnimalTableExists = async () => {
		const query = `CREATE TABLE IF NOT EXISTS Animals (
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

		await this.execQueryAsync(query, []);
	};
	private ensureBatchTableExists = async () => {
		const query = `CREATE TABLE IF NOT EXISTS Batches (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT
        );`;
		await this.execQueryAsync(query, []);
	};
	async insertAnimal(animal: AddAnimal): Promise<number | undefined> {
		const query = `INSERT INTO Animals (name, gender, birthdate, batchId, code, paternityId, maternityId, observation)
		  VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

		const parsed = nullifyFalsyFields(animal);

		return new Promise((resolve, reject) => {
			this.db.transaction(
				async (tx) => {
					tx.executeSql(
						query,
						[
							parsed.name,
							parsed.gender,
							parsed.birthdate,
							parsed.batchId,
							parsed.code,
							parsed.paternityId,
							parsed.maternityId,
							parsed.observation,
						],
						(_, { insertId }) => resolve(insertId)
					);
				},
				(error) => {
					console.log(error);
					reject(error);
				}
			);
		});
	}
	async insertBatch(batch: AddBatch): Promise<number | undefined> {
		const query = `INSERT INTO Batches (name, description)
		VALUES (?, ?);`;

		const parsed = nullifyFalsyFields(batch);

		return new Promise((resolve, reject) => {
			this.db.transaction(
				async (tx) => {
					tx.executeSql(
						query,
						[parsed.name, parsed.description],
						(_, { insertId }) => resolve(insertId)
					);
				},
				(error) => {
					console.log(error);
					reject(error);
				}
			);
		});
	}
	async deleteAnimal(animalID: number): Promise<boolean> {
		const query = `DELETE FROM Animals WHERE id = ?`;

		return new Promise((resolve, reject) => {
			this.db.transaction(
				async (tx) => {
					tx.executeSql(query, [animalID], () => resolve(true));
				},
				(error) => {
					console.log(error);
					reject(error);
				}
			);
		});
	}
	async deleteBatch(batchID: number): Promise<boolean> {
		const deleteBatchQuery = `DELETE FROM Batches WHERE id = ?;`;
		const unsignBatchFromAnimalsQuery = `UPDATE Animals SET batchId = NULL WHERE batchId = ?;`;

		const operations = [
			new Promise((_, reject) => {
				this.db.transaction(
					async (tx) => {
						tx.executeSql(deleteBatchQuery, [batchID]);
					},
					(error) => {
						console.log(error);
						reject(error);
					}
				);
			}),
			new Promise((_, reject) => {
				this.db.transaction(
					async (tx) => {
						tx.executeSql(unsignBatchFromAnimalsQuery, [batchID]);
					},
					(error) => {
						console.log(error);
						reject(error);
					}
				);
			}),
		];

		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
	}
	async deleteBatchAndItsAnimals(batchID: number): Promise<boolean> {
		const deleteBatchQuery = `DELETE FROM Batches WHERE id = ?;`;
		const deleteAnimals = `DELETE FROM Animals WHERE batchId = ?;`;

		const operations = [
			new Promise((_, reject) => {
				this.db.transaction(
					async (tx) => {
						tx.executeSql(deleteBatchQuery, [batchID]);
					},
					(error) => {
						console.log(error);
						reject(error);
					}
				);
			}),
			new Promise((_, reject) => {
				this.db.transaction(
					async (tx) => {
						tx.executeSql(deleteAnimals, [batchID]);
					},
					(error) => {
						console.log(error);
						reject(error);
					}
				);
			}),
		];

		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
	}
	loadAnimal(id: number): Promise<Animal> {
		throw new Error("Method not implemented.");
	}
	listAnimals(): Promise<Animal[]> {
		throw new Error("Method not implemented.");
	}
	loadBatchAnimals(id: number): Promise<Animal[]> {
		throw new Error("Method not implemented.");
	}
	loadBatchInfo(id: number): Promise<Batch> {
		throw new Error("Method not implemented.");
	}
	listAllBatchesInfo(): Promise<Batch[]> {
		throw new Error("Method not implemented.");
	}
	clearDatabase(): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	updateAnimal(updateData: UpdateAnimal): Promise<Animal> {
		throw new Error("Method not implemented.");
	}
	updateBatch(updateData: UpdateBatch): Promise<Batch> {
		throw new Error("Method not implemented.");
	}
	updateManyAnimals(updateDataList: UpdateAnimal[]): Promise<Animal[]> {
		throw new Error("Method not implemented.");
	}
	deleteManyAnimals(animalIDsToDelete: number[]): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
}
