import Colors from "constants/Colors";
import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import {
	Button as PaperButton,
	ButtonProps as PaperButtonProps,
} from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { ButtonTypes } from "types/ButtonTypes";
import { getButtonBackgroundColor } from "utils/getButtonBackgroundColor";
import { getButtonBorderColor } from "utils/getButtonBorderColor";
import { getButtonTextColor } from "utils/getButtonTextColor";

type CustomButtonProps = {
	title: string;
	type?: ButtonTypes;
	onPress?: () => any;
} & Omit<PaperButtonProps, "children">;

export const Button = forwardRef<any, CustomButtonProps>((props, ref) => {
	const { title, onPress, disabled, type = "primary", ...rest } = props;

	return (
		<PaperButton
			ref={ref}
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
			{...rest}
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
});

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
