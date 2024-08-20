import { MonthDetails } from "./MonthDetails";

export interface MonthDetailsRepositoryMethods {
    upsertMonthDetails(monthDetails: MonthDetails): Promise<boolean>;
    getMonthDetails(month: Date): Promise<MonthDetails | null>;
}
