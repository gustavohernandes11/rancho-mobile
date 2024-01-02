import React from "react";
import { FlexAlignType, StyleSheet, View, ViewProps } from "react-native";

interface SpanProps {
	children?: React.ReactNode;
	alignItems?: FlexAlignType;
	padding?: number;
	paddingVertical?: number;
	paddingHorizontal?: number;
}

export const Span: React.FC<SpanProps & ViewProps> = ({
	children,
	alignItems = "flex-end",
	paddingVertical,
	paddingHorizontal,
	padding,
	...props
}) => {
	return (
		<View
			style={[
				styles.span,
				{ alignItems, padding, paddingVertical, paddingHorizontal },
			]}
			{...props}
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	span: {
		gap: 8,
		flexDirection: "row",
		flexWrap: "wrap",
	},
});
