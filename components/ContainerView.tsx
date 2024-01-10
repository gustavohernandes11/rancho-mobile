import React from "react";
import { StyleSheet, ViewProps, ScrollView, View } from "react-native";
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
			<View style={styles.inner}>{children}</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,

		flex: 1,
	},
	inner: {
		paddingHorizontal: 8,
		paddingVertical: 16,
	},
});
