import Colors from "constants/Colors";
import Fonts from "constants/Fonts";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

type HeadingSizes = "medium" | "small";
interface HeadingProps {
	children?: string;
	size?: HeadingSizes;
}

export const Heading: React.FC<TextProps & HeadingProps> = ({
	children,
	size = "medium",
	...props
}: HeadingProps) => {
	const getFontSize = (size: HeadingSizes) => {
		if (size === "medium") return 20;
		else if (size === "small") return 16;
	};

	return (
		<Text
			style={[styles.heading, { fontSize: getFontSize(size) }]}
			{...props}
		>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	heading: {
		fontSize: 20,
		color: Colors.text,
		marginVertical: 8,
		fontFamily: Fonts.primaryFamily,
	},
});
