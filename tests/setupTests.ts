export {
	render,
	screen,
	userEvent,
	waitFor,
} from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

jest.mock("expo-router");
jest.mock("expo-sqlite");
jest.useFakeTimers();
jest.mock("database/repositories/SqliteRepository");
jest.mock("services/StorageService");
