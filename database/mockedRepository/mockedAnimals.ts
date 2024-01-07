import { Animal } from "../../types/Animal";

export const mockedAnimals: Animal[] = [
	{
		id: "1",
		gender: "F",
		name: "Jandaia (filha)",
		batchId: "01",
		birthdate: new Date(2015).toISOString(),
		code: "001",
		maternityId: "2",
		paternityId: "3",
		observation: "Some observation mock",
	},
	{
		id: "2",
		gender: "F",
		name: "Jandaia",
		batchId: "02",
		birthdate: new Date(2013).toISOString(),
		code: "0010",
		maternityId: "2",
		paternityId: "3",
		observation: "Some observation mock",
	},
	{
		id: "3",
		gender: "M",
		name: "Talismã",
		batchId: "03",
		birthdate: new Date(2013).toISOString(),
		code: "0012",
		observation: "Some observation mock",
	},
	{
		id: "4",
		gender: "M",
		name: "Goiano",
		batchId: "03",
		birthdate: new Date(2014).toISOString(),
		code: "0013",
		observation: "Some observation mock",
	},
	{
		id: "5",
		gender: "F",
		name: "Estrela",
		batchId: "02",
		birthdate: new Date(2015).toISOString(),
		code: "0014",
		observation: "Some observation mock",
	},
];
