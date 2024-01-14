import moment from "moment";
import { Animal } from "types/Animal";

export const filterPossiblePaternity = (
	animals: Animal[],
	childBirthdate?: string
) => {
	return (
		animals
			?.filter((a) => a.gender === "M")
			?.filter((a) =>
				childBirthdate
					? moment(a.birthdate).isBefore(childBirthdate)
					: true
			) || []
	);
};
