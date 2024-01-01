import React from "react";
import { FlexAlignType, StyleSheet, View, ViewProps } from "react-native";

interface SpanProps {
	children?: React.ReactNode;
	alignItems?: FlexAlignType;
}

export const Span: React.FC<SpanProps & ViewProps> = ({
	children,
	alignItems = "flex-end",
	...props
}) => {
	return (
		<View style={[styles.span, { alignItems }]} {...props}>
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
