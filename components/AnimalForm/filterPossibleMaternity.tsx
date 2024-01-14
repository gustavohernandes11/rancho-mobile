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
					? moment(a.birthdate).isBefore(childBirthdate)
					: true
			) || []
	);
};
