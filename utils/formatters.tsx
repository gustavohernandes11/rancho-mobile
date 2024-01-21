import { FontAwesome } from "@expo/vector-icons";
import Colors from "constants/Colors";
import moment from "moment";

export const getFormattedAge = (input: string): string => {
	const duration = moment.duration(moment().diff(moment(input)));

	const years = duration.years();
	const months = duration.months();
	const days = duration.days();

	if (years === 0) {
		if (months === 0) {
			if (days === 1) {
				return `${days} dia`;
			}
			return `${days} dias`;
		} else {
			if (months === 1) return `${months} mês`;
			return `${months} meses`;
		}
	} else {
		if (months === 0) {
			if (years === 1) {
				return `${years} ano`;
			}
			return `${years} anos`;
		} else {
			if (years === 1 && months === 1) {
				return `${years} ano e ${months} mês`;
			}
			if (months === 1) {
				return `${years} anos e ${months} mês`;
			}
			if (years === 1) {
				return `${years} ano e ${months} meses`;
			}
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
