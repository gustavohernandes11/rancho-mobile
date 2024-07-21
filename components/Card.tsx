import { Link } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";
import React from "react";
import { Image, ImageURISource, StyleSheet, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { Span } from "./Span";

type ColorOptions = "primary" | "blue" | "purple" | "cian";
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
    color = "primary",
    href,
    ...props
}) => {
    const styles = getStyles(color);

    return (
        <Link href={href} style={styles.container} asChild {...props}>
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

const getStyles = (color: ColorOptions) =>
    StyleSheet.create({
        container: {
            ...commonStyles.card,
            backgroundColor: Theme.colors[color],
        },
        title: {
            ...commonStyles.text,
            fontSize: 16,
            flexShrink: 1,
            color: Theme.colors.white,
            marginTop: 4,
        },
    });
