import { AddAnimal } from "../../types/Animal";

export const defaultValues: AddAnimal = {
	name: "",
	gender: "F",
	batchId: "",
	birthdate: new Date().toISOString(),
	code: "",
	maternityId: "",
	paternityId: "",
	observation: "",
};
