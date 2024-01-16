import { Database } from "./Database";
import { MockedRepository } from "./MockedRepository";
import { SqliteRepository } from "./SqliteRepository";

const mockRepository = new MockedRepository();
const sqliteRepository = new SqliteRepository();
export const StorageService = new Database(sqliteRepository);
