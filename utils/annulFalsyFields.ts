import { AnyObject } from "../database/SqliteRepository";

export const annulFalsyFields = (obj: AnyObject) => {
	for (const key in obj) {
		if (obj.hasOwnProperty(key) && !obj[key]) {
			obj[key] = null;
		}
	}
};
