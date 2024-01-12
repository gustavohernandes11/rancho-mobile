import React from "react";
import { StyleSheet, Text } from "react-native";
import { ButtonProps, Button as PaperButton } from "react-native-paper";
import Colors from "../constants/Colors";
import { sharedStyles } from "../styles/shared";
import { ButtonTypes } from "../types/ButtonTypes";
import {
	getButtonBackgroundColor,
	getButtonBorderColor,
	getButtonTextColor,
} from "../utils/";

type CustomButtonProps = {
	title: string;
	type?: ButtonTypes;
	onPress?: () => any;
} & Omit<ButtonProps, "children">;

export const Button: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	disabled,
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
				disabled && styles.disabled,
			]}
			disabled={disabled}
			onPress={onPress}
			{...props}
		>
			<Text
				style={[
					sharedStyles.text,
					{ color: getButtonTextColor(type) },
					disabled && styles.textDisabled,
				]}
			>
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
	disabled: {
		backgroundColor: Colors.lightGray,
		borderColor: Colors.border,
		borderStyle: "dashed",
		borderRadius: 4,
		borderWidth: 2,
	},
	textDisabled: {
		color: Colors.darkGray,
	},
});
