import { Batch } from "types/Batch";
import { Item } from "types/Item";

export const serializeBatchesToKeyValue = (batches: Batch[]): Item[] =>
	batches.map((b) => ({
		key: b.name,
		value: b.id,
	})) || [];
