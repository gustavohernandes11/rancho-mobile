import Colors from "constants/Colors";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, ViewProps } from "react-native";
import { Loading } from "./Loading";

interface ContainerViewType {
	flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
	immediateContent?: React.ReactNode;
	children?: React.ReactNode;
}

export const ContainerView: React.FC<ContainerViewType & ViewProps> = ({
	children,
	flexDirection,
	immediateContent,
	...props
}) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<ScrollView style={[styles.container, { flexDirection }]} {...props}>
			<>
				{immediateContent}
				{isLoading ? (
					<Loading height={500} />
				) : (
					<View style={styles.inner}>{children}</View>
				)}
			</>
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
