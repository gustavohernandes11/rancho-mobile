import React from "react";
import {
	TouchableHighlight,
	StyleSheet,
	TouchableHighlightProps,
	Text,
} from "react-native";
import Colors from "../constants/Colors";
import { ButtonTypes } from "../types/ButtonTypes";

type CustomButtonProps = {
	title: string;
	onPress?: () => any;
	type?: ButtonTypes;
} & TouchableHighlightProps;

export const Button: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	type = "primary",
	...props
}) => {
	const getOnPressedColor = () =>
		type === "primary" ? Colors.darkGreen : Colors.darkSurface;

	const getTextColor = () => {
		if (type === "danger") return Colors.red;
		else if (type === "primary") return Colors.white;
		else return Colors.text;
	};

	const getBackgroundColor = () =>
		type === "primary" ? Colors.green : Colors.gray;

	const getBorderColor = () =>
		type === "primary" ? "transparent" : Colors.border;

	return (
		<TouchableHighlight
			underlayColor={getOnPressedColor()}
			style={[
				styles.button,
				{
					backgroundColor: getBackgroundColor(),
					borderColor: getBorderColor(),
				},
			]}
			onPress={onPress}
			{...props}
		>
			<Text style={[styles.text, { color: getTextColor() }]}>
				{title}
			</Text>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 4,
	},
	text: {
		fontSize: 14,
	},
});
