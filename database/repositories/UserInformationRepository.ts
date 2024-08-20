import { SqliteHelper } from "database/sqliteHelper";
import moment from "moment";
import { Count } from "types/Count";
import { UserInformationRepositoryMethods } from "types/UserInformationRepositoryMethods";

export class UserInformationRepository
    implements UserInformationRepositoryMethods
{
    private sqliteHelper = SqliteHelper.getInstance();

    async count(): Promise<Count> {
        const countAnimalsQuery = `
        SELECT COUNT(id) AS animals
        FROM Animals
        WHERE status = 'active'
        `;

        const countBatchesQuery = `
		SELECT COUNT(id) AS batches 
		FROM Batches
		`;

        const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
        const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

        const countLitersProducedQuery = `
        SELECT SUM(quantity) AS litersProduced 
        FROM DayProduction
        WHERE day >= ? AND day <= ?
        `;

        const [animalsResult, batchesResult, litersProducedResult] =
            await Promise.all([
                this.sqliteHelper.getOne<{ animals: number }>(
                    countAnimalsQuery,
                    []
                ),
                this.sqliteHelper.getOne<{ batches: number }>(
                    countBatchesQuery,
                    []
                ),
                this.sqliteHelper.getOne<{ litersProduced: number }>(
                    countLitersProducedQuery,
                    [startOfMonth, endOfMonth]
                ),
            ]);

        return {
            animals: animalsResult?.animals || 0,
            batches: batchesResult?.batches || 0,
            litersProduced: litersProducedResult?.litersProduced || 0,
        };
    }
}
