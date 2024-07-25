import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import Theme from "styles/Theme";

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
}) => {
    const styles = getStyles(size, shrink);

    return (
        <Text style={styles.heading} {...props}>
            {children}
        </Text>
    );
};

const getStyles = (size: HeadingSizes, shrink: 1 | 0) =>
    StyleSheet.create({
        heading: {
            color: Theme.colors.darkest,
            marginVertical: 4,
            fontFamily: Theme.fonts.primaryFamily,
            fontSize: size === "big" ? 24 : size === "medium" ? 20 : 16,
            flexShrink: shrink,
        },
    });
