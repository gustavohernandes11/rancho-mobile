import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { getInputBorderColor } from "../utils/getInputBorderColor";
import { TextInput, TextInputProps, HelperText } from "react-native-paper";
import Fonts from "../constants/Fonts";
import { sharedStyles } from "../styles/shared";

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
			{label && (
				<HelperText style={sharedStyles.label} type="info">
					{label}
				</HelperText>
			)}
			<TextInput
				mode="outlined"
				outlineStyle={{
					borderColor: getInputBorderColor(!!errorText),
					borderWidth: 2,
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
			{errorText && <HelperText type="error">{errorText}</HelperText>}
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
		backgroundColor: Colors.lightGray,
	},
});
