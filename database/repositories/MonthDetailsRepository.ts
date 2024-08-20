import { SqliteHelper } from "database/sqliteHelper";
import { MonthDetails } from "types/MonthDetails";
import { MonthDetailsRepositoryMethods } from "types/MonthDetailsRepositoryMethods";
import { dateIdToDate } from "utils/dateIdToDate";
import { formatMonthToISO } from "utils/formatters";
import { nullifyFalsyFields } from "utils/nullifyFalsyFields";

export class MonthDetailsRepository implements MonthDetailsRepositoryMethods {
    private sqliteHelper = SqliteHelper.getInstance();

    async upsertMonthDetails(monthDetails: MonthDetails): Promise<boolean> {
        const formattedMonth = formatMonthToISO(
            dateIdToDate(monthDetails.month)
        );
        const query = `
            INSERT INTO MonthlyDetails (month, fatPorcentage, proteinPorcentage, totalBacterial, totalSomaticCell, pricePerLiter, lactosePorcentage, observation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(month) DO UPDATE SET
                fatPorcentage = excluded.fatPorcentage,
                proteinPorcentage = excluded.proteinPorcentage,
                totalBacterial = excluded.totalBacterial,
                totalSomaticCell = excluded.totalSomaticCell,
                pricePerLiter = excluded.pricePerLiter,
                lactosePorcentage = excluded.lactosePorcentage,
                observation = excluded.observation;
        `;
        const parsed = nullifyFalsyFields(monthDetails);

        const params = [
            formattedMonth,
            parsed.fatPorcentage,
            parsed.proteinPorcentage,
            parsed.totalBacterial,
            parsed.totalSomaticCell,
            parsed.pricePerLiter,
            parsed.lactosePorcentage,
            parsed.observation,
        ];

        return this.sqliteHelper
            .execute(query, params)
            .then(() => true)
            .catch(() => false);
    }

    async getMonthDetails(month: Date): Promise<MonthDetails | null> {
        const query = `
            SELECT month, fatPorcentage, proteinPorcentage, totalBacterial, totalSomaticCell, pricePerLiter, lactosePorcentage, observation
            FROM MonthlyDetails
            WHERE month = ?
        `;
        const params = [formatMonthToISO(month)];

        return await this.sqliteHelper.getOne<MonthDetails>(query, params);
    }
}
