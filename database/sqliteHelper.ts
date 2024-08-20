import {
    openDatabaseSync,
    SQLiteDatabase,
    SQLiteExecuteAsyncResult,
} from "expo-sqlite";

export class SqliteHelper {
    private readonly db: SQLiteDatabase;
    static instance: SqliteHelper;

    private constructor() {
        this.db = openDatabaseSync("rancho.db");
        this.initDatabase();
    }

    public static getInstance = () => {
        if (!this.instance) {
            this.instance = new SqliteHelper();
        }

        return this.instance;
    };

    public getDb = () => this.db;

    public execute = async (
        query: string,
        params: (string | number | null)[] = []
    ): Promise<SQLiteExecuteAsyncResult<any>> => {
        const statement = await this.db.prepareAsync(query);
        try {
            return statement.executeAsync(params);
        } catch (error) {
            throw error;
        }
    };

    public getOne = async <T>(
        query: string,
        params: (string | number | null)[] = []
    ): Promise<T | null> => {
        try {
            return this.db.getFirstAsync<T>(query, params);
        } catch (error) {
            throw error;
        }
    };

    public getAll = async <T>(
        query: string,
        params: (string | number | null)[] = []
    ): Promise<T[]> => {
        try {
            return this.db.getAllAsync<T>(query, params);
        } catch (error) {
            throw error;
        }
    };

    async initDatabase() {
        await Promise.all([
            this.ensureAnimalTableExists(),
            this.ensureBatchTableExists(),
            this.ensureProductionTableExists(),
            this.ensureAnnotationTableExists(),
            this.ensureMonthlyDetailsTableExists(),
        ]);
    }

    private ensureAnnotationTableExists = async () => {
        const query = `
        CREATE TABLE IF NOT EXISTS Annotations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT,
            date TEXT,
            animalIDs TEXT,
            dosage TEXT,
            medicineName TEXT
        );
        `;
        await this.execute(query, []);
    };

    private ensureAnimalTableExists = async () => {
        const query = `
		CREATE TABLE IF NOT EXISTS Animals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            gender TEXT CHECK(gender IN ('F', 'M')) NOT NULL,
            birthdate TEXT,
            batchID INTEGER REFERENCES Batches(id),
            code TEXT,
            paternityID INTEGER REFERENCES Animals(id),
            maternityID INTEGER REFERENCES Animals(id),
            observation TEXT
			);`;

        await this.execute(query, []);
    };

    private ensureBatchTableExists = async () => {
        const query = `
		CREATE TABLE IF NOT EXISTS Batches (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT
        );
		`;

        await this.execute(query, []);
    };

    private ensureProductionTableExists = async () => {
        const query = `
		  CREATE TABLE IF NOT EXISTS DayProduction (
			day TEXT PRIMARY KEY,
			quantity INTEGER
		  );
		`;

        await this.execute(query, []);
    };

    private ensureMonthlyDetailsTableExists = async () => {
        const query = `
            CREATE TABLE IF NOT EXISTS MonthlyDetails (
                month TEXT PRIMARY KEY,
                fatPorcentage REAL,
                proteinPorcentage REAL,
                totalBacterial INTEGER,
                totalSomaticCell INTEGER,
                pricePerLiter REAL,
                lactosePorcentage REAL,
                observation TEXT
            );
        `;
        await this.execute(query, []);
    };
}
