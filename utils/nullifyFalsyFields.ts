export const nullifyFalsyFields = (obj: any) => {
	const clone = structuredClone(obj);
	for (const key in clone) {
		if (clone.hasOwnProperty(key) && !clone[key]) {
			clone[key] = null;
		}
	}
	return clone;
};
