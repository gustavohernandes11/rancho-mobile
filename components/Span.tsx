import React from "react";
import { FlexAlignType, StyleSheet, View, ViewProps } from "react-native";

interface SpanProps {
	children?: React.ReactNode;
	align?: FlexAlignType;
	justify?:
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
		| "space-evenly";
	p?: number;
	py?: number;
	px?: number;
	flexWrap?: "wrap" | "nowrap";
	my?: number;
}

export const Span: React.FC<SpanProps & ViewProps> = ({
	children,
	align = "flex-end",
	justify,
	py,
	px,
	p,
	my = 8,
	flexWrap,
	...props
}) => {
	return (
		<View
			style={[
				styles.span,
				{
					alignItems: align,
					justifyContent: justify,
					padding: p,
					paddingVertical: py,
					paddingHorizontal: px,
					marginVertical: my,
					flexWrap,
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
		width: "100%",
	},
});
