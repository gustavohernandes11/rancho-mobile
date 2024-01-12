import Colors from "constants/Colors";
import { ButtonTypes } from "types/ButtonTypes";

export const getButtonBackgroundColor = (type: ButtonTypes) =>
	type === "primary" ? Colors.green : Colors.gray;
