import { FontAwesome } from "@expo/vector-icons";
import Colors from "constants/Colors";

export const getFormattedAge = (input: string): string => {
	const current = new Date();
	const birthdate = new Date(input);

	const years = current.getFullYear() - birthdate.getFullYear();
	const months = current.getMonth() - birthdate.getMonth();
	const days = current.getDate() - birthdate.getDate();

	if (years < 1) {
		if (months < 1) {
			return `${days} dias`;
		} else {
			return `${months} meses`;
		}
	} else {
		if (months < 0 || (months === 0 && days < 0)) {
			return `${years - 1} anos e ${12 + months} meses`;
		} else if (months === 0) {
			return `${years} anos`;
		} else {
			return `${years} anos e ${months} meses`;
		}
	}
};

export const getFormattedGender = (gender: "F" | "M") =>
	gender === "M" ? "♂ Macho" : "♀ Fêmea";

export const getGenderIcon = (gender: "F" | "M") =>
	gender === "M" ? (
		<FontAwesome color={Colors.blue} name="mars" />
	) : (
		<FontAwesome color={Colors.red} name="venus" />
	);
