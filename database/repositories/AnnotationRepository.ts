import { toDateId } from "@marceloterreiro/flash-calendar";
import { SqliteHelper } from "database/sqliteHelper";
import moment from "moment";
import {
    AddAnnotation,
    Annotation,
    AnnotationQueryOptions,
    UpdateAnnotation,
} from "types";
import { AnnotationRepositoryMethods } from "types/AnnotationRepositoryMethods";
import { convertAnimalIDsToString } from "utils/convertAnimalsIdsToString";
import { convertStringToAnimalIDs } from "utils/convertStringToAnimalIds";
import { dateIdToDate } from "utils/dateIdToDate";
import { nullifyFalsyFields } from "utils/nullifyFalsyFields";

export class AnnotationRepository implements AnnotationRepositoryMethods {
    private sqliteHelper = SqliteHelper.getInstance();

    async insertAnnotation(
        annotation: AddAnnotation
    ): Promise<number | undefined> {
        const query = `
		INSERT INTO Annotations (title, type, description, date, animalIDs, dosage, medicineName)
		VALUES (?, ?, ?, ?, ?, ?, ?);
		`;

        const parsed = nullifyFalsyFields(annotation);

        const params = [
            parsed.title,
            parsed.type,
            parsed.description,
            parsed.date ? toDateId(parsed.date) : null,
            parsed.animalIDs
                ? convertAnimalIDsToString(parsed.animalIDs)
                : null,
            parsed.dosage,
            parsed.medicineName,
        ];
        return this.sqliteHelper
            .execute(query, params)
            .then(({ lastInsertRowId }) => lastInsertRowId);
    }

    async getAnnotation(id: number): Promise<Annotation | null> {
        const query = `
        SELECT id, title, type, description, date, animalIDs, dosage, medicineName
        FROM Annotations
        WHERE id = ?;
        `;

        const annotation = await this.sqliteHelper.getOne<Annotation>(query, [
            id,
        ]);

        if (!annotation) {
            return null;
        }

        return {
            ...annotation,
            date: annotation.date ? dateIdToDate(annotation.date) : null,
            animalIDs: annotation.animalIDs
                ? convertStringToAnimalIDs(
                      annotation.animalIDs as unknown as string
                  )
                : [],
        } as Annotation;
    }

    async listAnnotations(
        queryOptions?: AnnotationQueryOptions
    ): Promise<Annotation[]> {
        let sqlQuery = `
        SELECT id, title, type, description, date, animalIDs, dosage, medicineName
        FROM Annotations
        `;

        const params: (string | number)[] = [];
        let whereClauses: string[] = [];

        if (queryOptions?.types && queryOptions.types.length > 0) {
            const placeholders = queryOptions.types.map(() => "?").join(", ");
            whereClauses.push(`type IN (${placeholders})`);
            params.push(...queryOptions.types);
        }

        if (queryOptions?.searchText) {
            whereClauses.push(
                `(title LIKE '%' || ? || '%' OR description LIKE '%' || ? || '%')`
            );
            params.push(queryOptions.searchText, queryOptions.searchText);
        }

        if (queryOptions?.day) {
            if (queryOptions.shouldIncludeMonthlyAnnotations) {
                const [year, month] = queryOptions.day.split("-").map(Number);
                whereClauses.push(`strftime('%Y-%m', date) = ?`);
                params.push(`${year}-${month.toString().padStart(2, "0")}`);
            } else {
                whereClauses.push(`date = ?`);
                params.push(queryOptions.day);
            }
        }

        if (queryOptions?.includesAnimalId) {
            whereClauses.push(`animalIDs LIKE '%' || ? || '%'`);
            params.push(queryOptions.includesAnimalId.toString());
        }

        if (whereClauses.length > 0) {
            sqlQuery += ` WHERE ${whereClauses.join(" AND ")}`;
        }

        const annotations = await this.sqliteHelper.getAll<Annotation>(
            sqlQuery,
            params
        );

        return annotations.map(annotation => ({
            ...annotation,
            date: annotation.date ? dateIdToDate(annotation.date) : undefined,
            animalIDs: annotation.animalIDs
                ? convertStringToAnimalIDs(
                      annotation.animalIDs as unknown as string
                  )
                : [],
        }));
    }

    async updateAnnotation(
        updateData: UpdateAnnotation | UpdateAnnotation[]
    ): Promise<boolean> {
        if (Array.isArray(updateData)) {
            const operations = updateData.map(data =>
                this.updateAnnotation(data)
            );
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const query = `
        UPDATE Annotations SET 
            title = ?, type = ?, description = ?, date = ?, animalIDs = ?, dosage = ?, medicineName = ?
        WHERE id = ?;
        `;

        const parsed = nullifyFalsyFields(updateData);

        const params = [
            parsed.title,
            parsed.type,
            parsed.description,
            parsed.date ? moment(parsed.date).toISOString() : null,
            parsed.animalIDs
                ? convertAnimalIDsToString(parsed.animalIDs)
                : null,
            parsed.dosage,
            parsed.medicineName,
            updateData.id,
        ];

        await this.sqliteHelper.execute(query, params);
        return true;
    }

    async deleteAnnotation(id: number): Promise<boolean> {
        const query = `
        DELETE FROM Annotations
        WHERE id = ?;
        `;

        return this.sqliteHelper
            .execute(query, [id])
            .then(() => true)
            .catch(() => false);
    }

    async unlinkAnimalFromAnnotations(
        animalID: number | number[]
    ): Promise<boolean> {
        if (Array.isArray(animalID)) {
            const operations = animalID.map(id =>
                this.unlinkAnimalFromAnnotations(id)
            );
            return Promise.all(operations)
                .then(() => true)
                .catch(() => false);
        }

        const queryAnnotations = `
        SELECT id, animalIDs 
        FROM Annotations 
        WHERE animalIDs LIKE '%' || ? || '%';
        `;

        try {
            const annotations = await this.sqliteHelper.getAll<Annotation>(
                queryAnnotations,
                [animalID.toString()]
            );

            const updateOperations = annotations.map(async annotation => {
                const animalIDs = convertStringToAnimalIDs(
                    annotation.animalIDs as unknown as string
                );
                const updatedAnimalIDs = animalIDs.filter(id => id != animalID);

                const updatedAnimalIDsString =
                    convertAnimalIDsToString(updatedAnimalIDs);

                const updateQuery = `
                UPDATE Annotations SET animalIDs = ? WHERE id = ?;
                `;

                await this.sqliteHelper.execute(updateQuery, [
                    updatedAnimalIDsString,
                    annotation.id,
                ]);
            });

            const results = await Promise.allSettled(updateOperations);

            return results.every(result => result.status === "fulfilled");
        } catch (error) {
            return false;
        }
    }
}
