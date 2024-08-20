import { SqliteHelper } from "database/sqliteHelper";
import moment from "moment";
import { DayProduction } from "types/Production";
import { ProductionRepositoryMethods } from "types/ProductionRepositoryMethods";
import { formatDateToISO } from "utils/formatters";

export class ProductionRepository implements ProductionRepositoryMethods {
    private sqliteHelper = SqliteHelper.getInstance();

    async listTimespanProduction(
        start: Date,
        end: Date
    ): Promise<DayProduction[]> {
        const query = `
		SELECT day, quantity
		FROM DayProduction
		WHERE day BETWEEN ? AND ?
		ORDER BY day;
		`;

        const formattedStart = formatDateToISO(start);
        const formattedEnd = formatDateToISO(end);
        const params = [formattedStart, formattedEnd];

        try {
            return this.sqliteHelper.getAll<DayProduction>(query, params);
        } catch {
            return [];
        }
    }

    async getDayProduction(date: Date): Promise<DayProduction | null> {
        const query = `
		SELECT day, quantity
		FROM DayProduction
		WHERE day = ?;
		`;

        const formattedDate = formatDateToISO(date);
        const params = [formattedDate];

        const production = await this.sqliteHelper.getOne<DayProduction>(
            query,
            params
        );
        return production || null;
    }

    async upsertDayProduction(production: DayProduction): Promise<boolean> {
        const { day, quantity } = production;
        const formattedDay = formatDateToISO(moment(day).toDate());
        const query = `
		INSERT INTO DayProduction (day, quantity)
		VALUES (?, ?)
		ON CONFLICT(day) DO UPDATE SET quantity = excluded.quantity;
		`;

        const params = [formattedDay, quantity];

        try {
            await this.sqliteHelper.execute(query, params);
            return true;
        } catch {
            return false;
        }
    }
}
