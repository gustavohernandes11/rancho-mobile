import React from "react";
import {
	Image,
	ImageURISource,
	StyleSheet,
	Text,
	View,
	ViewProps,
} from "react-native";
import Colors from "../constants/Colors";

interface CardProps {
	title: string;
	alt: string;
	iconSource: ImageURISource;
}

export const Card: React.FC<ViewProps & CardProps> = ({
	title,
	alt,
	iconSource,
	...props
}) => {
	return (
		<View style={styles.card} {...props}>
			<Text style={styles.title}>{title}</Text>
			<Image style={styles.image} source={iconSource} alt={alt} />
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.green,
		borderRadius: 4,
		padding: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		minHeight: 100,
		gap: 8,
	},
	image: {
		height: 38,
		width: 38,
		resizeMode: "contain",
	},
	title: {
		fontSize: 16,
		color: Colors.white,
	},
});
