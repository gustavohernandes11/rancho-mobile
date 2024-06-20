import Colors from "constants/Colors";
import { Link } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";
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

export const Card: React.FC<LinkProps & CardProps> = ({
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
			style={[sharedStyles.card, { backgroundColor: Colors[color] }]}
			asChild
			{...props}
		>
			<TouchableRipple>
				<Span align="center" justify="center" flexWrap="nowrap">
					<Image
						style={sharedStyles.icon}
						source={iconSource}
						alt={alt}
					/>
					<Text style={styles.title}>{title}</Text>
				</Span>
			</TouchableRipple>
		</Link>
	);
};

const styles = StyleSheet.create({
	title: {
		...sharedStyles.text,
		flexShrink: 1,
		color: Colors.white,
	},
});
