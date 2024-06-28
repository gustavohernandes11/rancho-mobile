import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import {
	Button as PaperButton,
	ButtonProps as PaperButtonProps,
} from "react-native-paper";
import { commonStyles } from "styles/Common";
import { ButtonTypes } from "types/ButtonTypes";
import {
	getButtonBackgroundColor,
	getButtonBorderColor,
	getButtonTextColor,
} from "utils/conditionalStyles";

type CustomButtonProps = {
	title: string;
	type?: ButtonTypes;
	onPress?: () => any;
} & Omit<PaperButtonProps, "children">;

export const Button = forwardRef<any, CustomButtonProps>((props, ref) => {
	const { title, onPress, disabled, type = "primary", ...rest } = props;

	return (
		<PaperButton
			textColor={getButtonTextColor(type)}
			ref={ref}
			style={[
				styles.button,
				{
					backgroundColor: getButtonBackgroundColor(type),
					borderColor: getButtonBorderColor(type),
					overflow: "hidden",
				},
				disabled && commonStyles.disabled,
			]}
			disabled={disabled}
			onPress={onPress}
			{...rest}
		>
			<Text
				style={[
					commonStyles.text,
					{ color: getButtonTextColor(type) },
					disabled && commonStyles.textDisabled,
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
	},
});
