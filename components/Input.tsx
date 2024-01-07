import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { getInputBorderColor } from "../utils/getInputBorderColor";

import { TextInput, TextInputProps, HelperText } from "react-native-paper";
import Fonts from "../constants/Fonts";

interface InputProps {
	errorText?: string;
}

export const Input: React.FC<InputProps & TextInputProps> = ({
	label,
	errorText,
	multiline,
	...props
}) => {
	return (
		<View style={styles.inputContainer}>
			<HelperText style={styles.label} type="info">
				{label}
			</HelperText>
			<TextInput
				mode="outlined"
				outlineStyle={{
					borderColor: getInputBorderColor(!!errorText),
				}}
				outlineColor={Colors.border}
				activeOutlineColor={Colors.black}
				textColor={Colors.darkGray}
				placeholderTextColor={Colors.darkGray}
				cursorColor={Colors.darkGray}
				error={!!errorText}
				multiline={multiline}
				style={[styles.input, { height: multiline ? 80 : 50 }]}
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
		height: 50,
		fontSize: 14,
		fontFamily: Fonts.primaryFamily,
		backgroundColor: Colors.gray,
	},
	label: {
		fontSize: 14,
		color: Colors.darkGray,
		fontFamily: Fonts.primaryFamily,
		paddingLeft: 0,
	},
});
