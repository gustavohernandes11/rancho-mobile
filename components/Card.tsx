import Colors from "constants/Colors";
import { Link, LinkProps } from "expo-router";
import React from "react";
import { Image, ImageURISource, StyleSheet, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { Span } from "./Span";

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
			<TouchableRipple>
				<Span
					alignItems="center"
					justifyContent="center"
					flexWrap="nowrap"
				>
					<Text style={styles.title}>{title}</Text>
					<Image style={styles.image} source={iconSource} alt={alt} />
				</Span>
			</TouchableRipple>
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
		elevation: 3,
	},
	image: {
		height: 38,
		width: 38,
		resizeMode: "contain",
	},
	title: {
		...sharedStyles.text,
		flexShrink: 1,
		color: Colors.white,
	},
});
