import Colors from "../constants/Colors";
import { ButtonTypes } from "../types/ButtonTypes";

export const getButtonBorderColor = (type: ButtonTypes) =>
	type === "primary" ? "transparent" : Colors.border;
