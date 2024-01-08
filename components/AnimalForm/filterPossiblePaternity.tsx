import { Animal } from "../../types/Animal";
import moment from "moment";

/**
 * Filters a list of animals to find potential fathers based on gender and, optionally, birthdate.
 *
 * @param {Animal[]} animals - The list of animals to filter.
 * @param {string} [childBirthdate] - The birthdate of a potential child. If provided, filters animals based on birthdate.
 * @returns {Animal[]} - The filtered list of potential father animals.
 *
 * @example
 * // Filter potential paternity without considering birthdate
 * const potentialPaternity = filterPossiblePaternity(animals);
 *
 * // Filter potential paternity considering birthdate
 * const potentialPaternityWithBirthdate = filterPossiblePaternity(animals, "2024-01-08");
 */
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
