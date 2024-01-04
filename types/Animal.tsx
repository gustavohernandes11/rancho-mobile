export type Animal = {
	id: string | number;
	name: string;
	gender: "F" | "M";
	birthdate?: string;
	batchId?: string;
	code?: string | number;
	paternityId?: string;
	maternityId?: string;
	observation?: string;
};