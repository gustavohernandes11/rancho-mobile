import { SqliteHelper } from "database/sqliteHelper";
import { AddBatch, Batch, UpdateBatch } from "types/Batch";
import { BatchRepositoryMethods } from "types/BatchRepositoryMethods";
import { nullifyFalsyFields } from "utils/nullifyFalsyFields";

export class BatchRepository implements BatchRepositoryMethods {
    private sqliteHelper = SqliteHelper.getInstance();

    async getBatch(batchID: number): Promise<Batch | null> {
        const query = `
        SELECT 
            Batches.id, Batches.name, Batches.description,
            COUNT(Animals.id) AS count
        FROM Batches
        LEFT JOIN Animals ON Batches.id = Animals.batchID AND Animals.status = 'active'
        WHERE Batches.id = ?
        GROUP BY Batches.id, Batches.name, Batches.description
        `;

        return await this.sqliteHelper.getOne<Batch>(query, [batchID]);
    }

    async listBatches(): Promise<Batch[]> {
        const query = `
        SELECT 
            Batches.id, Batches.name, Batches.description,
            COUNT(Animals.id) AS count
        FROM Batches
        LEFT JOIN Animals ON Batches.id = Animals.batchID AND Animals.status = 'active'
        GROUP BY Batches.id, Batches.name, Batches.description
        `;

        return this.sqliteHelper.getAll<Batch>(query, []);
    }

    async updateBatch(
        updateData: UpdateBatch | UpdateBatch[]
    ): Promise<boolean> {
        if (Array.isArray(updateData)) {
            const operations = updateData.map(data => this.updateBatch(data));
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const query = `
		UPDATE Batches SET 
			name = ?, description = ?
		WHERE id = ?
		`;

        const parsed = nullifyFalsyFields(updateData);
        const params = [parsed.name, parsed.description, parsed.id];

        return this.sqliteHelper
            .execute(query, params)
            .then(() => true)
            .catch(() => false);
    }

    async deleteBatch(batchID: number): Promise<boolean> {
        const deleteBatchQuery = `
		DELETE FROM Batches 
		WHERE id = ?;
		`;

        const unlinkAnimalsQuery = `
		UPDATE Animals 
		SET batchID = NULL 
		WHERE batchID = ?;
		`;

        const operations = [
            this.sqliteHelper.execute(deleteBatchQuery, [batchID]),
            this.sqliteHelper.execute(unlinkAnimalsQuery, [batchID]),
        ];

        return Promise.all(operations)
            .then(() => true)
            .catch(() => false);
    }

    async insertBatch(batch: AddBatch): Promise<number | undefined> {
        const query = `
        INSERT INTO Batches 
            (name, description)
        VALUES (?, ?);
        `;

        const parsed = nullifyFalsyFields(batch);
        const params = [parsed.name, parsed.description];

        return this.sqliteHelper
            .execute(query, params)
            .then(({ lastInsertRowId }) => lastInsertRowId);
    }
}
