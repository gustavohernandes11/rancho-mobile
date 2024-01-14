import Colors from "constants/Colors";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextProps } from "react-native-paper";

export const SubTitle: React.FC<TextProps<any>> = ({ children, ...props }) => {
	return (
		<Text style={styles.subtitle} {...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	subtitle: {
		padding: 0,
		marginBottom: 8,
		color: Colors.darkGray,
		fontSize: 16,
	},
});
