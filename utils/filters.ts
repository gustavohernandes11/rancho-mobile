import moment from "moment";
import { Animal } from "types/Animal";

const atLeastOneYearOld = (animal: Animal) =>
	animal.birthdate ? moment().diff(animal.birthdate, "years") > 1 : true;
const oneYearOlderThenChild = (animal: Animal, childBirthdate?: string) =>
	animal.birthdate
		? moment(animal.birthdate).isBefore(
				moment(childBirthdate).subtract(1, "years")
		  )
		: true;

const isMale = (animal: Animal) => animal.gender === "F";
const isFemale = (animal: Animal) => animal.gender === "M";

export const filterPossibleMaternity = (
	animals: Animal[],
	childBirthdate?: string
) => {
	let filteredAnimals = animals
		.filter(isFemale)
		.filter(atLeastOneYearOld)
		.filter((animal) => oneYearOlderThenChild(animal, childBirthdate));

	return filteredAnimals;
};

export const filterPossiblePaternity = (
	animals: Animal[],
	childBirthdate?: string
) => {
	let filteredAnimals = animals
		.filter(isMale)
		.filter(atLeastOneYearOld)
		.filter((animal) => oneYearOlderThenChild(animal, childBirthdate));

	return filteredAnimals;
};
