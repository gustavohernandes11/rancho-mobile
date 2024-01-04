import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Batch } from "../types/Batch";
import Colors from "../constants/Colors";

interface BatchInfoProps {
	batch: Batch;
}
const getGrammaticalFlexion = (count: number) =>
	count === 1 ? "animal" : "animais";

export const BatchInfo: React.FC<BatchInfoProps & ViewProps> = ({
	batch,
	...props
}) => {
	return (
		<View style={styles.container} {...props}>
			<View style={styles.left}>
				<Text style={styles.title}>{batch.name}</Text>
				<Text style={styles.description}>{batch.description}</Text>
			</View>
			<View style={styles.right}>
				<Text style={styles.description}>
					{batch.count + " " + getGrammaticalFlexion(batch.count)}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderRadius: 4,
		backgroundColor: Colors.gray,
		borderWidth: 1,
		borderColor: Colors.border,
		padding: 8,
		marginVertical: 4,
	},
	right: {
		flex: 1,
		alignItems: "flex-end",
		justifyContent: "center",
	},
	left: {
		flex: 1,
		alignItems: "flex-start",
		gap: 4,
	},
	title: {
		fontSize: 14,
	},
	description: {
		fontSize: 12,
		color: Colors.darkGray,
	},
});
