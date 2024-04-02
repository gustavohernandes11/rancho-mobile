import { Animal } from "./Animal";

export type Batch = {
	id: number;
	name: string;
	count: number;
	description?: string;
};
export type PopulatedBatch = Batch & {
	animals: Animal[];
};
export type AddBatch = Omit<Batch, "id" | "count">;
export type UpdateBatch = Partial<Batch> & { id: number };
