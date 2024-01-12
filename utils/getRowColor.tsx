import Colors from "constants/Colors";

export const getRowColor = (index: number) =>
	index % 2 === 0 ? Colors.white : Colors.lightGray;
