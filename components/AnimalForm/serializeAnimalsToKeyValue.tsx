import { Animal } from "../../types/Animal";
import { Item } from "../../types/Item";

/**
 * Serializes a list of animals into key-value pairs.
 *
 * @param {Animal[]} animals - The list of animals to serialize.
 * @returns {Item[]} - The serialized key-value pairs representing the animals.
 *
 * @example
 * const animals = [
 *   { id: "1", name: "Lion", gender: "M", birthdate: "2022-01-01" },
 *   { id: "2", name: "Tiger", gender: "F", birthdate: "2022-02-01" },
 * ];
 * const serializedAnimals = serializeAnimalsToKeyValue(animals);
 * // Result: [{ key: "Lion", value: "1" }, { key: "Tiger", value: "2" }]
 */
export const serializeAnimalsToKeyValue = (animals: Animal[]): Item[] =>
	animals.map((a) => ({
		key: a.name,
		value: a.id,
	})) || [];
