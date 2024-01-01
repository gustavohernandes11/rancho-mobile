import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import Colors from "../constants/Colors";

interface HeadingProps {
	children?: string;
}

export const Heading: React.FC<TextProps & HeadingProps> = ({
	children,
	...props
}: HeadingProps) => {
	return (
		<Text style={styles.heading} {...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	heading: {
		fontSize: 20,
		color: Colors.text,
		marginVertical: 16,
	},
});
