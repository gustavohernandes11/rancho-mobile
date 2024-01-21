import moment from "moment";
import { Animal } from "types/Animal";

export const filterPossibleMaternity = (
	animals: Animal[],
	childBirthdate?: string
) => {
	return (
		animals
			?.filter((a) => a.gender === "F")
			?.filter((a) =>
				childBirthdate
					? moment(a.birthdate).isBefore(
							moment(childBirthdate).add(1, "y")
					  )
					: true
			) || []
	);
};

export const filterPossiblePaternity = (
	animals: Animal[],
	childBirthdate?: string
) => {
	return (
		animals
			?.filter((a) => a.gender === "M")
			?.filter((a) =>
				childBirthdate
					? moment(a.birthdate).isBefore(
							moment(childBirthdate).add(1, "y")
					  )
					: true
			) || []
	);
};
