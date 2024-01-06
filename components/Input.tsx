import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { getInputBorderColor } from "../utils/getInputBorderColor";

import { TextInput, TextInputProps, HelperText } from "react-native-paper";

interface InputProps {
	errorText?: string;
}

export const Input: React.FC<InputProps & TextInputProps> = ({
	label,
	errorText,
	...props
}) => {
	return (
		<View style={styles.inputContainer}>
			<TextInput
				mode="outlined"
				outlineStyle={{ borderColor: getInputBorderColor(!!errorText) }}
				outlineColor={Colors.border}
				activeOutlineColor={Colors.black}
				textColor={Colors.darkGray}
				label={label}
				placeholderTextColor={Colors.darkGray}
				cursorColor={Colors.darkGray}
				error={!!errorText}
				style={[styles.input]}
				{...props}
			/>
			<HelperText type="error" visible={!!errorText}>
				{errorText}
			</HelperText>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
	},
	input: {
		borderRadius: 4,
		backgroundColor: Colors.gray,
	},
});
