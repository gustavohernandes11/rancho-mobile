import { Batch } from "types/Batch";
import { Item } from "types/Item";

/**
 * Serializes a list of batches into key-value pairs.
 *
 * @param {Batch[]} batches - The list of batches to serialize.
 * @returns {Item[]} - The serialized key-value pairs representing the batches.
 *
 * @example
 * const batches = [
 *   { id: "1", name: "Batch A", count: 10, description: "First batch" },
 *   { id: "2", name: "Batch B", count: 15, description: "Second batch" },
 * ];
 * const serializedBatches = serializeBatchesToKeyValue(batches);
 * // Result: [{ key: "Batch A", value: "1" }, { key: "Batch B", value: "2" }]
 */
export const serializeBatchesToKeyValue = (batches: Batch[]): Item[] =>
	batches.map((b) => ({
		key: b.name,
		value: b.id,
	})) || [];
