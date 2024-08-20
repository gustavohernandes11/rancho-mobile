import { DayProduction } from "./Production";

export interface ProductionRepositoryMethods {
    getDayProduction(date: Date): Promise<DayProduction | null>;
    listTimespanProduction(start: Date, end: Date): Promise<DayProduction[]>;
    upsertDayProduction(production: DayProduction): Promise<boolean>;
}
