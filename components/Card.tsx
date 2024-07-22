import { Link } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";
import React from "react";
import { Image, ImageURISource, StyleSheet, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { Span } from "./Span";

type ColorOptions = "primary" | "blue" | "purple" | "cian";
type SizeOptions = "medium" | "small";
interface CardProps {
    title: string;
    alt: string;
    iconSource: ImageURISource;
    color?: ColorOptions;
    href?: any;
    size?: SizeOptions;
}

export const Card: React.FC<LinkProps & CardProps> = ({
    title,
    alt,
    iconSource,
    color = "primary",
    href,
    size = "medium",
    ...props
}) => {
    const styles = getStyles(color, size);

    return (
        <Link href={href} style={styles.container} asChild {...props}>
            <TouchableRipple>
                <Span
                    direction={size === "medium" ? "column" : "row"}
                    justify={size === "medium" ? "center" : "flex-start"}
                    flexWrap="nowrap"
                    gap={size === "medium" ? 4 : 8}
                >
                    <Image
                        style={
                            size === "medium"
                                ? commonStyles.icon
                                : commonStyles.smallIcon
                        }
                        source={iconSource}
                        alt={alt}
                    />
                    <Text style={styles.title}>{title}</Text>
                </Span>
            </TouchableRipple>
        </Link>
    );
};

const getStyles = (color: ColorOptions, size: SizeOptions) =>
    StyleSheet.create({
        container: {
            ...commonStyles.card,
            backgroundColor: Theme.colors[color],
            paddingVertical: size === "medium" ? 16 : 8,
            paddingHorizontal: 16,
            minHeight: size === "medium" ? 100 : 25,
        },
        title: {
            ...commonStyles.text,
            fontSize: 16,
            flexShrink: 1,
            color: Theme.colors.white,
            marginTop: 4,
        },
    });
