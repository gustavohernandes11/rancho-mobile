import Colors from "../constants/Colors";

export const getInputBorderColor = (hasError: boolean) =>
	hasError ? Colors.red : Colors.border;
