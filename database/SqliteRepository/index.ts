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
	loadAnimal(animalID: number): Promise<Animal> {
		const query = `SELECT (name, 
			gender,
			birthdate, 
			batchId, 
			code, 
			paternityId, 
			maternityId, 
			observation) FROM Animals WHERE id = ?`;

		return new Promise((resolve, reject) => {
			this.db.transaction(
				async (tx) => {
					tx.executeSql(query, [animalID], (_, { rows }) =>
						resolve(rows.item(0))
					);
				},
				(error) => {
					console.log(error);
					reject(error);
				}
			);
		});
	}
	listAnimals(): Promise<Animal[]> {
		const query = `SELECT (
			id,
			name, 
			gender,
			birthdate, 
			batchId, 
			code, 
			paternityId, 
			maternityId, 
			observation
		) FROM Animals`;

		return new Promise((resolve, reject) => {
			this.db.transaction(
				async (tx) => {
					tx.executeSql(query, [], (_, { rows }) =>
						resolve(rows._array)
					);
				},
				(error) => {
					console.log(error);
					reject(error);
				}
			);
		});
	}
	loadBatchAnimals(batchId: number): Promise<Animal[]> {
		const query = `SELECT (
			id,
			name, 
			gender,
			birthdate, 
			batchId, 
			code, 
			paternityId, 
			maternityId, 
			observation
		) FROM Animals WHERE batchId = ?`;

		return new Promise((resolve, reject) => {
			this.db.transaction(
				async (tx) => {
					tx.executeSql(query, [batchId], (_, { rows }) => {
						console.log(rows._array);
						resolve(rows._array);
					});
				},
				(error) => {
					console.log(error);
					reject(error);
				}
			);
		});
	}
	loadBatchInfo(batchID: number): Promise<Batch> {
		const query = `SELECT (
			id,
			name,  
			description
		) FROM Batches WHERE id = ?`;
		const countQuery = `SELECT COUNT(id) AS animalCount FROM Animals WHERE batchId = ?`;

		return new Promise((resolve, reject) => {
			this.db.transaction(
				async (tx) => {
					tx.executeSql(query, [batchID], (_, { rows }) => {
						const batchInfo = rows.item(0);

						tx.executeSql(countQuery, [batchID], (_, { rows }) => {
							const animalCount = rows.item(0).animalCount;
							const result = { ...batchInfo, animalCount };
							console.log(result);
							resolve(result);
						});
					});
				},
				(error) => {
					console.log(error);
					reject(error);
				}
			);
		});
	}
	listAllBatchesInfo(): Promise<Batch[]> {
		const query = `SELECT (
			id,
			name,  
			description
		) FROM Batches`;

		return new Promise((resolve, reject) => {
			this.db.transaction(
				async (tx) => {
					tx.executeSql(query, [], (_, { rows }) =>
						resolve(rows._array)
					);
				},
				(error) => {
					console.log(error);
					reject(error);
				}
			);
		});
	}
	async clearDatabase(): Promise<boolean> {
		const operations = [
			this.execQueryAsync("DROP TABLE IF EXISTS Animals"),
			this.execQueryAsync("DROP TABLE IF EXISTS Batches"),
		];
		return Promise.all(operations)
			.then(() => true)
			.catch(() => false);
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
