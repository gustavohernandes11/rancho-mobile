import React from "react";
import { StyleSheet, Text } from "react-native";
import { ButtonTypes } from "../types/ButtonTypes";
import { getButtonTextColor } from "../utils/getButtonTextColor";
import { getButtonBackgroundColor } from "../utils/getButtonBackgroundColor";
import { getButtonBorderColor } from "../utils/getButtonBorderColor";
import Fonts from "../constants/Fonts";
import { ButtonProps, Button as PaperButton } from "react-native-paper";

type CustomButtonProps = {
	title: string;
	type?: ButtonTypes;
	onPress?: () => any;
} & Omit<ButtonProps, "children">;

export const Button: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	type = "primary",
	...props
}) => {
	return (
		<PaperButton
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
		</PaperButton>
	);
};

const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		borderRadius: 4,
	},
	text: {
		fontSize: 14,
		fontFamily: Fonts.primaryFamily,
	},
});
