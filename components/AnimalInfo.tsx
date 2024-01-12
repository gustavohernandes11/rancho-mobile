import React from "react";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import Colors from "../constants/Colors";
import { sharedStyles } from "../styles/shared";
import { Animal } from "../types/Animal";
import { getFormattedAge, getGenderIcon } from "../utils";

interface AnimalInfoProps {
	animal: Animal;
}

export const AnimalInfo: React.FC<AnimalInfoProps & ViewProps> = ({
	animal,
	...props
}) => {
	return (
		<Pressable style={styles.container} {...props}>
			<View style={styles.left}>
				<Text style={styles.title}>
					{getGenderIcon(animal.gender)}
					{" " + animal.name}
				</Text>
			</View>
			<View style={styles.right}>
				<Text style={styles.description}>
					{animal.birthdate && getFormattedAge(animal.birthdate)}
				</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 4,
		backgroundColor: Colors.lightGray,
		borderWidth: 2,
		borderColor: Colors.border,
		padding: 16,
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
		...sharedStyles.text,
		color: Colors.text,
	},
	description: {
		...sharedStyles.text,
		fontSize: 12,
		textAlign: "right",
	},
});
