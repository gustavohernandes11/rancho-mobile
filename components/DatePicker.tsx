import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HelperText } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";
import Colors from "styles/Colors";
import { sharedStyles } from "styles/Common";
import Fonts from "styles/Fonts";
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
					sharedStyles.inputAspect,
					{
						borderColor: getInputBorderColor(!!errorText),
					},
				]}
				outlineColor={Colors.border}
				activeOutlineColor={Colors.darkGray}
				textColor={Colors.darkGray}
				startYear={1990}
				endYear={2025}
				locale="pt"
				placeholderTextColor={Colors.gray}
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
