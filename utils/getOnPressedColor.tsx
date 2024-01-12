import Colors from "constants/Colors";
import { ButtonTypes } from "types/ButtonTypes";

export const getOnPressedColor = (type: ButtonTypes) =>
	type === "primary" ? Colors.darkGreen : Colors.darkSurface;
