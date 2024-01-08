import { Animal } from "../../types/Animal";
import moment from "moment";

/**
 * Filters a list of animals to find potential mothers based on gender and, optionally, birthdate.
 *
 * @param {Animal[]} animals - The list of animals to filter.
 * @param {string} [childBirthdate] - The birthdate of a potential child. If provided, filters animals based on birthdate.
 * @returns {Animal[]} - The filtered list of potential mother animals.
 *
 * @example
 * // Filter potential maternity without considering birthdate
 * const potentialMaternity = filterPossibleMaternity(animals);
 *
 * // Filter potential maternity considering birthdate
 * const potentialMaternityWithBirthdate = filterPossibleMaternity(animals, "2024-01-08");
 */
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
