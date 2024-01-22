import Colors from "constants/Colors";
import React from "react";
import {
	Image,
	ImageURISource,
	StyleSheet,
	View,
	ViewProps,
} from "react-native";
import { sharedStyles } from "styles/shared";
import { Heading } from "./Heading";
import { SubTitle } from "./SubTitle";

type ColorOptions = "green" | "blue" | "purple";
interface InfoCardProps {
	title: string;
	description: string;
	iconSource?: ImageURISource;
	alt?: string;
	color?: ColorOptions;
	href?: any;
}

export const InfoCard: React.FC<ViewProps & InfoCardProps> = ({
	title,
	description,
	iconSource,
	color = "green",
	href,
	alt,
	...props
}) => {
	return (
		<View {...props} style={styles.card}>
			{iconSource && (
				<Image
					style={sharedStyles.icon}
					source={iconSource}
					alt={alt}
				/>
			)}
			<Heading size="big" shrink={1}>
				{title}
			</Heading>
			<SubTitle>{description}</SubTitle>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		...sharedStyles.card,
		gap: 0,
		flexDirection: "column",
		alignItems: "flex-start",
		backgroundColor: Colors.gray,
		borderWidth: 1,
		borderColor: Colors.border,
		elevation: 0,
	},
});
