import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import Colors from "styles/Colors";
import { sharedStyles } from "styles/Common";
import Fonts from "styles/Fonts";
import { AnnotationTypeOption } from "types/Annotation";
import { formatAnnotationType, getFormattedPtBRDate } from "utils/formatters";

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
		<Link href={href} style={styles.container} asChild>
			<Pressable {...props} style={styles.container}>
				<View style={styles.top}>
					<Text style={sharedStyles.text}>
						{formatAnnotationType(type)}
					</Text>
					<Text style={styles.date}>
						{date ? getFormattedPtBRDate(date) : " "}
					</Text>
				</View>
				<View style={styles.main}>
					<Text style={styles.title}>{title}</Text>
					{description && (
						<Text style={sharedStyles.text}>{description}</Text>
					)}
				</View>
			</Pressable>
		</Link>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		gap: 8,
		borderRadius: 8,
		padding: 16,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	top: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
	main: {
		flex: 1,
		flexDirection: "column",
		alignItems: "flex-start",
		gap: 4,
	},
	title: {
		fontFamily: Fonts.primaryFamily,
		color: Colors.text,
		fontSize: 16,
	},
	date: {
		...sharedStyles.text,
		textAlign: "right",
	},
});