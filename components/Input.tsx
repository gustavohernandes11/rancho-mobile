import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from "react-native";
import Colors from "../constants/Colors";
import { getInputBorderColor } from "../utils/getInputBorderColor";

interface InputProps {
	label?: string;
	error?: string;
	textArea?: boolean;
}

export const Input: React.FC<InputProps & TextInputProps> = ({
	label,
	error,
	textArea,
	...props
}) => {
	const hasTextAreaStyle = () => (textArea ? styles.textArea : {});

	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				numberOfLines={textArea ? 5 : 1}
				style={[
					styles.input,
					{ borderColor: getInputBorderColor(!!error) },
					hasTextAreaStyle(),
				]}
				{...props}
			/>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 8,
	},
	input: {
		minWidth: "48.8%",
		borderRadius: 4,
		backgroundColor: Colors.gray,
		borderWidth: 1,
		borderColor: Colors.border,
		padding: 8,
		marginVertical: 4,
	},
	textArea: {
		textAlignVertical: "top",
	},
	label: {
		fontSize: 14,
		color: Colors.darkGray,
	},
	error: {
		fontSize: 12,
		color: Colors.red,
	},
});
