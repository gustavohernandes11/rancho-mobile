import { SqliteHelper } from "database/sqliteHelper";
import {
    AddAnimal,
    Animal,
    AnimalStatusOptions,
    QueryOptions,
    UpdateAnimal,
} from "types";
import { AnimalRepositoryMethods } from "types/AnimalRepositoryMethods";
import { nullifyFalsyFields } from "utils/nullifyFalsyFields";

export class AnimalRepository implements AnimalRepositoryMethods {
    private sqliteHelper = SqliteHelper.getInstance();

    async setAnimalStatus(
        animalID: number | number[],
        status: AnimalStatusOptions
    ): Promise<boolean> {
        if (Array.isArray(animalID)) {
            const operations = animalID.map(id =>
                this.setAnimalStatus(id, status)
            );

            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const query = `
		UPDATE Animals SET 
			status = ?
		WHERE id = ?
		`;

        return this.sqliteHelper
            .execute(query, [status, animalID])
            .then(() => true)
            .catch(() => false);
    }

    async insertAnimal(animal: AddAnimal): Promise<number | undefined> {
        const query = `
		INSERT INTO Animals 
			(name, gender, birthdate, batchID, code, paternityID, maternityID, observation, status)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
		`;

        const parsed = nullifyFalsyFields(animal);
        const params = [
            parsed.name,
            parsed.gender,
            parsed.birthdate,
            parsed.batchID,
            parsed.code,
            parsed.paternityID,
            parsed.maternityID,
            parsed.observation,
            parsed.status,
        ];

        return this.sqliteHelper
            .execute(query, params)
            .then(({ lastInsertRowId }) => lastInsertRowId);
    }

    async getAnimal(animalID: number): Promise<Animal> {
        const query = `
            SELECT 
                id, name, gender, birthdate, batchID, code, paternityID, maternityID, observation, status
            FROM Animals 
            WHERE id = ?
            `;

        return (await this.sqliteHelper.getOne<Animal>(query, [
            animalID,
        ])) as Animal;
    }

    async listOffspring(animalID: number): Promise<Animal[]> {
        const query = `
		SELECT 
			id, name, gender, birthdate, batchID, code, paternityID, maternityID, observation, status
		FROM Animals 
		WHERE paternityID = ? OR maternityID = ?
		`;

        return this.sqliteHelper.getAll<Animal>(query, [animalID, animalID]);
    }

    async listAnimals(queryOptions: QueryOptions = {}): Promise<Animal[]> {
        let query = `
            SELECT 
                id, name, gender, birthdate, batchID, code, paternityID, maternityID, observation, status
            FROM Animals
        `;

        const params: (string | number)[] = [];

        if (queryOptions.batchID) {
            query += ` WHERE batchID = ?`;
            params.push(queryOptions.batchID);
        }

        if (queryOptions.searchText) {
            query += queryOptions.batchID ? ` AND` : ` WHERE`;
            query += ` (name LIKE '%' || ? || '%' OR code LIKE '%' || ? || '%' OR observation LIKE '%' || ? || '%')`;
            params.push(
                queryOptions.searchText,
                queryOptions.searchText,
                queryOptions.searchText
            );
        }

        if (queryOptions.status && queryOptions.status.length > 0) {
            query +=
                queryOptions.batchID !== undefined || queryOptions.searchText
                    ? ` AND`
                    : ` WHERE`;

            query += ` status IN (${queryOptions.status
                .map(() => "?")
                .join(",")})`;

            params.push(...queryOptions.status);
        }

        switch (queryOptions.orderBy) {
            case "alfabetic":
                query += ` ORDER BY name`;
                break;
            case "age":
                query += ` ORDER BY CASE WHEN birthdate IS NULL THEN 1 ELSE 0 END, birthdate DESC`;
                break;
            default:
                query += ` ORDER BY name`;
                break;
        }

        return this.sqliteHelper.getAll<Animal>(query, params).catch(e => {
            return [];
        });
    }

    async updateAnimal(
        updateData: UpdateAnimal | UpdateAnimal[]
    ): Promise<boolean> {
        if (Array.isArray(updateData)) {
            const operations = updateData.map(data => this.updateAnimal(data));
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const query = `
		UPDATE Animals SET 
			name = ?, gender = ?, birthdate = ?, batchID = ?, code = ?, paternityID = ?, maternityID = ?, observation = ?, status = ?
		WHERE id = ?
		`;

        const parsed = nullifyFalsyFields(updateData);
        const params = [
            parsed.name,
            parsed.gender,
            parsed.birthdate,
            parsed.batchID,
            parsed.code,
            parsed.paternityID,
            parsed.maternityID,
            parsed.observation,
            parsed.status,
            parsed.id,
        ];

        return this.sqliteHelper
            .execute(query, params)
            .then(() => true)
            .catch(() => false);
    }

    async deleteAnimal(animalID: number | number[]): Promise<boolean> {
        if (Array.isArray(animalID)) {
            const operations = animalID.map(id => this.deleteAnimal(id));
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const deleteQuery = `
		DELETE FROM Animals 
		WHERE id = ?
		`;

        return this.sqliteHelper
            .execute(deleteQuery, [animalID])
            .then(() => true)
            .catch(() => false);
    }

    async setAnimalBatch(
        animalID: number | number[],
        batchID: number | null
    ): Promise<boolean> {
        if (Array.isArray(animalID)) {
            const operations = animalID.map(id =>
                this.setAnimalBatch(id, batchID)
            );
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const query = `
		UPDATE Animals SET 
			batchID = ?
		WHERE id = ?
		`;

        return this.sqliteHelper
            .execute(query, [batchID, animalID])
            .then(() => true)
            .catch(() => false);
    }

    async nullifyParentalIds(parentID: number | number[]): Promise<boolean> {
        if (Array.isArray(parentID)) {
            const operations = parentID.map(id => this.nullifyParentalIds(id));
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const nullifyPaternityQuery = `
		UPDATE Animals
		SET paternityID = NULL
		WHERE paternityID = ?
		`;
        const nullifyMaternityQuery = `
		UPDATE Animals
		SET maternityID = NULL
		WHERE maternityID = ?
		`;

        const operations = [
            this.sqliteHelper.execute(nullifyPaternityQuery, [parentID]),
            this.sqliteHelper.execute(nullifyMaternityQuery, [parentID]),
        ];

        return Promise.all(operations)
            .then(() => true)
            .catch(() => false);
    }
}
