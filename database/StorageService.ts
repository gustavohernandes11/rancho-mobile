import { Database } from "./Database";
import { MockedRepository } from "./mockedRepository/MockedRepository";

const mockRepository = new MockedRepository();
export const StorageService = new Database(mockRepository);
