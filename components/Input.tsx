import Colors from "constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { getInputBorderColor } from "utils/conditional-styles";

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
					borderWidth: 1,
				}}
				outlineColor={Colors.border}
				activeOutlineColor={Colors.black}
				textColor={Colors.darkGray}
				placeholderTextColor={Colors.darkGray}
				cursorColor={Colors.darkGray}
				error={!!errorText}
				multiline={multiline}
				style={[
					sharedStyles.inputAspect,
					{ height: multiline ? 80 : 50, borderWidth: 0 },
				]}
				{...props}
			/>
			{errorText && <Text style={sharedStyles.error}>{errorText}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		width: "100%",
	},
});
