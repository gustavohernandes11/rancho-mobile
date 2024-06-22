import Colors from "constants/Colors";
import Fonts from "constants/Fonts";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HelperText } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";
import { sharedStyles } from "styles/shared";
import { getInputBorderColor } from "utils/conditionalStyles";

interface DatePickerProps {
	errorText?: string;
}

export const DatePicker: React.FC<
	DatePickerProps & Omit<DatePickerInputProps, "locale">
> = ({ label, errorText, ...props }) => {
	return (
		<View style={styles.inputContainer}>
			{label && (
				<HelperText style={sharedStyles.label} type="info">
					{label}
				</HelperText>
			)}
			<DatePickerInput
				iconColor={Colors.darkGray}
				mode="outlined"
				outlineStyle={[
					{
						borderColor: getInputBorderColor(!!errorText),
					},
					sharedStyles.inputAspect,
				]}
				outlineColor={Colors.border}
				activeOutlineColor={Colors.black}
				textColor={Colors.darkGray}
				startYear={1990}
				endYear={2025}
				locale="pt"
				placeholderTextColor={Colors.darkGray}
				style={styles.input}
				withModal={false}
				{...props}
			/>
			{errorText && <Text style={sharedStyles.error}>{errorText}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
	},
	input: {
		borderRadius: 8,
		height: 50,
		fontSize: 14,
		fontFamily: Fonts.primaryFamily,
		backgroundColor: Colors.lightGray,
	},
});
