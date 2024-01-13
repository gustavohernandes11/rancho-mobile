import Colors from "constants/Colors";
import Fonts from "constants/Fonts";
import React from "react";
import { StyleSheet, View } from "react-native";
import { HelperText } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";
import { sharedStyles } from "styles/shared";
import { getInputBorderColor } from "utils/getInputBorderColor";

interface DatePickerProps {
	errorText?: string;
}

export const DatePicker: React.FC<
	DatePickerProps & Omit<DatePickerInputProps, "locale">
> = ({ label, errorText, ...props }) => {
	return (
		<View style={styles.inputContainer}>
			{label && (
				<HelperText style={styles.label} type="info">
					{label}
				</HelperText>
			)}
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
				locale="br"
				placeholderTextColor={Colors.darkGray}
				style={styles.input}
				{...props}
			/>
			{errorText && (
				<HelperText type="error" visible={!!errorText}>
					{errorText}
				</HelperText>
			)}
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
	label: {
		...sharedStyles.text,
		paddingLeft: 0,
	},
});
