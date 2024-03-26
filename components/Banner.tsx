import Colors from "constants/Colors";
import Fonts from "constants/Fonts";
import React from "react";
import {
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
	ViewProps,
} from "react-native";
import { sharedStyles } from "styles/shared";

interface BannerProps {
	iconSource: ImageSourcePropType;
	iconAlt: string;
	title: string | React.ReactNode;
	description?: string;
	cornerDescription?: string;
}

export const Banner: React.FC<BannerProps & ViewProps> = ({
	iconAlt,
	iconSource,
	title,
	description,
	cornerDescription,
	...props
}) => {
	return (
		<Pressable style={styles.container} {...props}>
			<View style={styles.iconSpan}>
				<Image
					style={sharedStyles.icon}
					source={iconSource}
					alt={iconAlt}
				/>
			</View>
			<View style={styles.left}>
				<Text style={styles.title}>{title}</Text>
				{description && (
					<Text style={styles.description}>{description}</Text>
				)}
			</View>
			<View style={styles.right}>
				{cornerDescription && (
					<Text style={styles.description}>{cornerDescription}</Text>
				)}
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
