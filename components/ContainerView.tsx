import React from "react";
import { StyleSheet, ViewProps, ScrollView } from "react-native";
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
		<ScrollView style={[styles.container, { flexDirection }]} {...props}>
			{children}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		padding: 8,
		flex: 1,
	},
});
