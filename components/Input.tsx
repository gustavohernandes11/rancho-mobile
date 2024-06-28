import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import { getInputBorderColor } from "utils/conditionalStyles";
import { Label } from "./Label";

interface InputProps {
	errorText?: string;
}

export const Input: React.FC<InputProps & TextInputProps> = ({
	label,
	errorText,
	multiline,
	...props
}) => {
	const inputStyle = [
		commonStyles.inputAspect,
		{
			height: multiline ? 80 : 50,
			borderWidth: 0,
		},
	];
	const outlineStyle = [
		commonStyles.inputAspect,
		{
			borderColor: getInputBorderColor(!!errorText),
		},
	];

	return (
		<View style={styles.inputContainer}>
			{label && <Label>{label}</Label>}
			<TextInput
				mode="outlined"
				outlineStyle={outlineStyle}
				outlineColor={Colors.border}
				activeOutlineColor={Colors.black}
				textColor={Colors.darkGray}
				placeholderTextColor={Colors.gray}
				cursorColor={Colors.darkGray}
				error={!!errorText}
				multiline={multiline}
				style={inputStyle}
				{...props}
			/>
			{errorText && <Text style={commonStyles.error}>{errorText}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		width: "100%",
	},
});
