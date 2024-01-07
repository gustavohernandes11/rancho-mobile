import React from "react";
import {
	Image,
	ImageURISource,
	Pressable,
	StyleSheet,
	Text,
} from "react-native";
import Colors from "../constants/Colors";
import { Link, LinkProps } from "expo-router";
import Fonts from "../constants/Fonts";

type ColorOptions = "green" | "blue" | "purple";
interface CardProps {
	title: string;
	alt: string;
	iconSource: ImageURISource;
	color?: ColorOptions;
	href?: any;
}

export const Card: React.FC<LinkProps<any> & CardProps> = ({
	title,
	alt,
	iconSource,
	color = "green",
	href,
	...props
}) => {
	return (
		<Link
			href={href}
			style={[styles.card, { backgroundColor: Colors[color] }]}
			asChild
			{...props}
		>
			<Pressable>
				<Text style={styles.title}>{title}</Text>
				<Image style={styles.image} source={iconSource} alt={alt} />
			</Pressable>
		</Link>
	);
};

const styles = StyleSheet.create({
	card: {
		width: "48%",
		aspectRatio: 1.6 / 1,
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
		fontFamily: Fonts.primaryFamily,
		flexShrink: 1,
		color: Colors.white,
	},
});
