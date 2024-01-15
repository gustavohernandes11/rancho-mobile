import { AnyObject } from "../database/SqliteRepository";

export const nullifyFalsyFields = (obj: AnyObject) => {
	const clone = structuredClone(obj);
	for (const key in clone) {
		if (clone.hasOwnProperty(key) && !clone[key]) {
			clone[key] = null;
		}
	}
	return clone;
};
