import { AddBatch, Batch, UpdateBatch } from "./Batch";

export interface BatchRepositoryMethods {
    insertBatch(batch: AddBatch): Promise<number | undefined>;
    getBatch(batchID: number): Promise<Batch | null>;
    listBatches(): Promise<Batch[]>;
    updateBatch(updateData: UpdateBatch | UpdateBatch[]): Promise<boolean>;
    deleteBatch(batchID: number): Promise<boolean>;
}
