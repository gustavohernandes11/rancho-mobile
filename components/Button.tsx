import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import {
	Button as PaperButton,
	ButtonProps as PaperButtonProps,
} from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { ButtonTypes } from "types/ButtonTypes";
import {
	getButtonBackgroundColor,
	getButtonBorderColor,
	getButtonTextColor,
} from "utils/conditional-styles";

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
				disabled && sharedStyles.disabled,
			]}
			disabled={disabled}
			onPress={onPress}
			{...rest}
		>
			<Text
				style={[
					sharedStyles.text,
					{ color: getButtonTextColor(type) },
					disabled && sharedStyles.textDisabled,
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
		borderRadius: 8,
		elevation: 4,
	},
});
