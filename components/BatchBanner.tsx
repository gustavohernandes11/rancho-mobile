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
import { Batch } from "types";

interface BatchBannerProps {
	batch: Batch;
}
const getGrammaticalFlexion = (count: number) =>
	count === 1 ? "animal" : "animais";

export const BatchBanner: React.FC<BatchBannerProps & ViewProps> = ({
	batch,
	...props
}) => {
	return (
		<Pressable style={styles.container} {...props}>
			<View style={styles.iconSpan}>
				<Image
					style={sharedStyles.icon}
					source={require("../assets/images/RoundedBatchIcon.png")}
					alt={"Lote"}
				/>
			</View>
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
		borderWidth: 1,
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
		justifyContent: "center",
		gap: 4,
	},
	title: {
		fontSize: 16,
		fontFamily: Fonts.primaryFamily,
	},
	description: {
		fontSize: 12,
		color: Colors.darkGray,
		fontFamily: Fonts.primaryFamily,
	},
	iconSpan: {
		alignItems: "center",
		justifyContent: "center",
		paddingRight: 16,
	},
});
