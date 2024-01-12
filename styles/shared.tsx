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
});
