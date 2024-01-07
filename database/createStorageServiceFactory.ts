import { DatabaseRepository } from "../types/DatabaseRepository";
import { StorageService } from "./StorageService";
import { MockedRepository } from "./mockedRepository/MockedRepository";

export const createStorageService = (): DatabaseRepository => {
	const mockRepository = new MockedRepository();
	return new StorageService(mockRepository);
};
