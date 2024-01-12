import Colors from "constants/Colors";
import { ButtonTypes } from "types/ButtonTypes";

export const getButtonTextColor = (type: ButtonTypes) => {
	if (type === "danger") return Colors.red;
	else if (type === "primary") return Colors.white;
	else return Colors.text;
};
