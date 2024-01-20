import { Database } from "./Database";
import { MockedRepository } from "./repositories/MockedRepository";
import { SqliteRepository } from "./repositories/SqliteRepository";

const mockedRepo = new MockedRepository();
const sqliteRepo = new SqliteRepository();
export const StorageService = new Database(sqliteRepo);
