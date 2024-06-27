import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import Colors from "styles/Colors";
import { sharedStyles } from "styles/Common";
import Fonts from "styles/Fonts";
import { AnnotationTypeOption } from "types/Annotation";

type AnnotationBannerProps = {
	title: string;
	type: AnnotationTypeOption;
	href: string;
	description?: string;
	date?: Date;
	animalIds?: number[];
};

export const AnnotationBanner: React.FC<AnnotationBannerProps & ViewProps> = ({
	title,
	description,
	href,
	id,
	type,
	date,
	animalIds,
	...props
}) => {
	return (
		<Link style={styles.container} href={href} asChild>
			<Pressable {...props}>
				<View style={styles.left}>
					<Text style={styles.title}>{title}</Text>
					{description && (
						<Text style={styles.description}>{description}</Text>
					)}
				</View>
			</Pressable>
		</Link>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 8,
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
