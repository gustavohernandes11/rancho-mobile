import Colors from "constants/Colors";
import Fonts from "constants/Fonts";
import { StyleSheet } from "react-native";

export const sharedStyles = StyleSheet.create({
	text: {
		fontSize: 14,
		color: Colors.darkGray,
		fontFamily: Fonts.primaryFamily,
	},
	label: {
		fontSize: 14,
		color: Colors.darkGray,
		fontFamily: Fonts.primaryFamily,
		paddingLeft: 0,
	},
	inputAspect: {
		borderRadius: 4,
		backgroundColor: Colors.lightGray,
		borderColor: Colors.border,
		borderWidth: 1,
		fontFamily: Fonts.primaryFamily,
	},
	error: {
		fontSize: 12,
		color: Colors.red,
		fontFamily: Fonts.primaryFamily,
	},
	heading: {
		fontSize: 20,
		color: Colors.text,
		marginVertical: 8,
		fontFamily: Fonts.primaryFamily,
	},
	disabled: {
		backgroundColor: Colors.lightGray,
		borderColor: Colors.border,
		borderStyle: "dashed",
		borderRadius: 4,
		borderWidth: 1,
	},
	textDisabled: {
		color: Colors.darkGray,
	},
});
