import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Colors from "../constants/Colors";

interface ContainerType {
	flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
	children?: React.ReactNode;
}

export const Container: React.FC<ContainerType & ViewProps> = ({
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
