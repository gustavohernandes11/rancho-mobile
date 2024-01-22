import Colors from "constants/Colors";
import React from "react";
import { ScrollView, StyleSheet, View, ViewProps } from "react-native";

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
		backgroundColor: Colors.background,
		flex: 1,
	},
	inner: {
		paddingHorizontal: 8,
		paddingVertical: 16,
	},
});
