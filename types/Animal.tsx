export type Animal = {
	id: number;
	name: string;
	gender: "F" | "M";
	birthdate?: string;
	batchId?: number;
	code?: string | number;
	paternityId?: number;
	maternityId?: number;
	observation?: string;
};

export type AddAnimal = Omit<Animal, "id">;

export type UpdateAnimal = Partial<Animal> & { id: number };
