import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Animal } from "../types/Animal";
import Colors from "../constants/Colors";
import { getGenderIcon } from "../utils/getGenderIcon";
import { getFormattedAge } from "../utils/getFormattedAge";
import { sharedStyles } from "../styles/shared";

interface AnimalInfoProps {
	animal: Animal;
}

export const AnimalInfo: React.FC<AnimalInfoProps & ViewProps> = ({
	animal,
	...props
}) => {
	return (
		<View style={styles.container} {...props}>
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
		</View>
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
