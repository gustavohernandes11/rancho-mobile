import React from "react";
import {
	TouchableHighlight,
	StyleSheet,
	TouchableHighlightProps,
	Text,
} from "react-native";
import { ButtonTypes } from "../types/ButtonTypes";
import { getOnPressedColor } from "../utils/getOnPressedColor";
import { getButtonTextColor } from "../utils/getButtonTextColor";
import { getButtonBackgroundColor } from "../utils/getButtonBackgroundColor";
import { getButtonBorderColor } from "../utils/getButtonBorderColor";

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
	return (
		<TouchableHighlight
			underlayColor={getOnPressedColor(type)}
			style={[
				styles.button,
				{
					backgroundColor: getButtonBackgroundColor(type),
					borderColor: getButtonBorderColor(type),
				},
			]}
			onPress={onPress}
			{...props}
		>
			<Text style={[styles.text, { color: getButtonTextColor(type) }]}>
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
