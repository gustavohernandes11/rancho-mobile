export type Batch = {
	id: string;
	name: string;
	count: number;
	description?: string;
};

export type AddBatch = Omit<Batch, "id" | "count">;

export type UpdateBatch = Partial<Batch> & { id: string };
