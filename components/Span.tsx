import React from "react";
import { FlexAlignType, StyleSheet, View, ViewProps } from "react-native";

interface SpanProps {
	children?: React.ReactNode;
	alignItems?: FlexAlignType;
	justifyContent?:
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
		| "space-evenly";
	padding?: number;
	paddingVertical?: number;
	paddingHorizontal?: number;
	flexWrap?: "wrap" | "nowrap";
	marginVertical?: number;
}

export const Span: React.FC<SpanProps & ViewProps> = ({
	children,
	alignItems = "flex-end",
	justifyContent,
	paddingVertical,
	paddingHorizontal,
	padding,
	marginVertical,
	flexWrap,
	...props
}) => {
	return (
		<View
			style={[
				styles.span,
				{
					alignItems,
					justifyContent,
					padding,
					paddingVertical,
					paddingHorizontal,
					flexWrap,
					marginVertical,
				},
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
		marginVertical: 8,
		width: "100%",
	},
});
