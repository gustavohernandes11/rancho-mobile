import { Database } from "../database/Database";
import { SqliteRepository } from "../database/repositories/SqliteRepository";

const sqliteRepository = new SqliteRepository();
export const StorageService = new Database(sqliteRepository);
