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
    const styles = getStyles(color);

    return (
        <Link href={href} style={styles.container} asChild {...props}>
            <TouchableRipple>
                <Span direction={"column"} flexWrap="nowrap" gap={8}>
                    <Image
                        style={commonStyles.icon}
                        tintColor={Theme.colors.white}
                        source={iconSource}
                        alt={alt}
                    />
                    <Text numberOfLines={2} style={styles.title}>
                        {title}
                    </Text>
                </Span>
            </TouchableRipple>
        </Link>
    );
};

const getStyles = (color: ColorOptions) =>
    StyleSheet.create({
        container: {
            ...commonStyles.border,
            gap: 8,
            paddingHorizontal: 16,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 116, // trust me
            backgroundColor: Theme.colors[color],
        },
        title: {
            ...commonStyles.text,
            fontSize: 16,
            color: Theme.colors.white,
            marginBottom: 0,
        },
    });
