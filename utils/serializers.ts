import { Animal, Batch, Item } from "types";

export const serializeAnimals = (animals: Animal[]): Item[] =>
	animals.map((a) => ({
		key: a.name,
		value: a.id,
	})) || [];

export const serializeBatches = (batches: Batch[]): Item[] =>
	batches.map((b) => ({
		key: b.name,
		value: b.id,
	})) || [];

export const nullifyFalsyFields = (obj: any) => {
	const clone = { ...obj };
	for (const key in clone) {
		if (clone.hasOwnProperty(key) && !clone[key]) {
			clone[key] = null;
		}
	}
	return clone;
};
