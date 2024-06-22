import React from "react";
import { Text, TextProps } from "react-native";
import { sharedStyles } from "styles/Common";

type HeadingSizes = "big" | "medium" | "small";
interface HeadingProps {
	children?: string;
	size?: HeadingSizes;
	shrink?: 1 | 0;
}

export const Heading: React.FC<TextProps & HeadingProps> = ({
	children,
	size = "medium",
	shrink = 0,
	...props
}: HeadingProps) => {
	const getFontSize = (size: HeadingSizes) => {
		if (size === "big") return 24;
		else if (size === "medium") return 20;
		else if (size === "small") return 16;
	};

	return (
		<Text
			style={[
				sharedStyles.heading,
				{ fontSize: getFontSize(size), flexShrink: shrink },
			]}
			{...props}
		>
			{children}
		</Text>
	);
};
