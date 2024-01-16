import Colors from "constants/Colors";
import Fonts from "constants/Fonts";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import { Batch } from "types/Batch";

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
		<Pressable style={styles.container} {...props}>
			<View style={styles.left}>
				<Text style={styles.title}>{batch.name}</Text>
				{batch.description && (
					<Text style={styles.description}>{batch.description}</Text>
				)}
			</View>
			<View style={styles.right}>
				{batch.count > 0 ? (
					<Text style={styles.description}>
						{batch.count + " " + getGrammaticalFlexion(batch.count)}
					</Text>
				) : (
					<Text style={styles.description}>Vazio</Text>
				)}
			</View>
		</Pressable>
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
