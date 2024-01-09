import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { getInputBorderColor } from "../utils/getInputBorderColor";

import { HelperText } from "react-native-paper";
import Fonts from "../constants/Fonts";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";
import { sharedStyles } from "../styles/shared";

interface DatePickerProps {
	errorText?: string;
}

export const DatePicker: React.FC<DatePickerProps & DatePickerInputProps> = ({
	label,
	errorText,
	...props
}) => {
	return (
		<View style={styles.inputContainer}>
			<HelperText style={styles.label} type="info">
				{label}
			</HelperText>
			<DatePickerInput
				iconColor={Colors.darkGray}
				mode="outlined"
				outlineStyle={{
					borderColor: getInputBorderColor(!!errorText),
					borderWidth: 2,
				}}
				outlineColor={Colors.border}
				activeOutlineColor={Colors.black}
				textColor={Colors.darkGray}
				placeholderTextColor={Colors.darkGray}
				style={styles.input}
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
		...sharedStyles.text,
		paddingLeft: 0,
	},
});
