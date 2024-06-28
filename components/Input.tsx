import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import { getInputBorderColor } from "utils/conditionalStyles";

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
				<HelperText style={commonStyles.label} type="info">
					{label}
				</HelperText>
			)}
			<TextInput
				mode="outlined"
				outlineStyle={[
					commonStyles.inputAspect,
					{
						borderColor: getInputBorderColor(!!errorText),
					},
				]}
				outlineColor={Colors.border}
				activeOutlineColor={Colors.black}
				textColor={Colors.darkGray}
				placeholderTextColor={Colors.gray}
				cursorColor={Colors.darkGray}
				error={!!errorText}
				multiline={multiline}
				style={[
					commonStyles.inputAspect,
					{
						height: multiline ? 80 : 50,
						borderWidth: 0,
					},
				]}
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
