import { Link } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";
import React from "react";
import { Image, ImageURISource, StyleSheet, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import { Span } from "./Span";

type ColorOptions = "green" | "blue" | "purple" | "cian";
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
	const containerStyle = [
		commonStyles.card,
		{ backgroundColor: Colors[color] },
	];

	return (
		<Link href={href} style={containerStyle} asChild {...props}>
			<TouchableRipple>
				<Span direction="column" justify="center" flexWrap="nowrap">
					<Image
						style={commonStyles.icon}
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
		...commonStyles.text,
		fontSize: 16,
		flexShrink: 1,
		color: Colors.white,
		marginTop: 4,
	},
});
