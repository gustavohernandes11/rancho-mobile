import Colors from "constants/Colors";
import Fonts from "constants/Fonts";
import React from "react";
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
	ViewProps,
} from "react-native";
import { sharedStyles } from "styles/shared";
import { Animal } from "types/Animal";
import { getFormattedAge, getGenderIcon } from "utils/formatters";

interface AnimalBannerProps {
	animal: Animal;
}

export const AnimalBanner: React.FC<AnimalBannerProps & ViewProps> = ({
	animal,
	...props
}) => {
	return (
		<Pressable style={styles.container} {...props}>
			<View style={styles.iconSpan}>
				<Image
					style={sharedStyles.icon}
					source={require("../assets/images/RoundedAnimalIcon.png")}
					alt={"Lote"}
				/>
			</View>
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
		borderWidth: 1,
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
		fontFamily: Fonts.primaryFamily,
		color: Colors.text,
		fontSize: 16,
	},
	description: {
		...sharedStyles.text,
		fontSize: 12,
		textAlign: "right",
	},
	iconSpan: {
		alignItems: "center",
		justifyContent: "center",
		paddingRight: 16,
	},
});
