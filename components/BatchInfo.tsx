import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Batch } from "../types/Batch";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

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
		backgroundColor: Colors.lightGray,
		borderWidth: 2,
		borderColor: Colors.border,
		padding: 16,
		marginVertical: 4,
	},
	right: {
		alignItems: "flex-end",
		justifyContent: "center",
		width: "25%",
	},
	left: {
		flex: 1,
		alignItems: "flex-start",
		gap: 4,
	},
	title: {
		fontSize: 14,
		fontFamily: Fonts.primaryFamily,
	},
	description: {
		fontSize: 12,
		color: Colors.darkGray,
		fontFamily: Fonts.primaryFamily,
	},
});
