import Colors from "constants/Colors";
import { ButtonTypes } from "types/ButtonTypes";

export const getButtonBackgroundColor = (type: ButtonTypes) =>
	type === "primary" ? Colors.green : Colors.gray;

export const getButtonBorderColor = (type: ButtonTypes) =>
	type === "primary" ? "transparent" : Colors.border;

export const getButtonTextColor = (type: ButtonTypes) => {
	if (type === "danger") return Colors.red;
	else if (type === "primary") return Colors.white;
	else return Colors.text;
};
export const getInputBorderColor = (hasError: boolean) =>
	hasError ? Colors.red : Colors.border;

export const getOnPressedColor = (type: ButtonTypes) =>
	type === "primary" ? Colors.darkGreen : Colors.darkSurface;

export const getRowColor = (index: number) =>
	index % 2 === 0 ? Colors.white : Colors.lightGray;
