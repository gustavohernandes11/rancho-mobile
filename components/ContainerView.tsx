import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Colors from "../constants/Colors";

interface ContainerViewType {
	flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
	children?: React.ReactNode;
}

export const ContainerView: React.FC<ContainerViewType & ViewProps> = ({
	children,
	flexDirection,
	...props
}) => {
	return (
		<View style={[styles.container, { flexDirection }]} {...props}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		direction: "ltr",
		padding: 8,
		flex: 1,
		justifyContent: "flex-start",
	},
});
