import { Animal } from "types/Animal";
import { Item } from "types/Item";

export const serializeAnimalsToKeyValue = (animals: Animal[]): Item[] =>
	animals.map((a) => ({
		key: a.name,
		value: a.id,
	})) || [];
