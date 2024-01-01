import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from "react-native";
import Colors from "../constants/Colors";

interface InputProps {
	label?: string;
	error?: string;
}

export const Input: React.FC<InputProps & TextInputProps> = ({
	label,
	error,
	...props
}) => {
	const getBorderColor = (error?: string) =>
		error ? Colors.red : Colors.border;

	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={[styles.input, { borderColor: getBorderColor(error) }]}
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
		borderRadius: 4,
		backgroundColor: Colors.gray,
		borderWidth: 1,
		borderColor: Colors.border,
		padding: 8,
		marginVertical: 4,
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
