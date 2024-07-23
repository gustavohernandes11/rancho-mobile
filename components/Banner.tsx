import { Link } from "expo-router";
import React from "react";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    View,
    ViewProps,
} from "react-native";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";

interface BannerProps {
    iconSource: ImageSourcePropType;
    iconAlt: string;
    title: string;
    description?: string;
    rightDescription?: string;
    href: string;
}

export const Banner: React.FC<BannerProps & ViewProps> = ({
    iconAlt,
    iconSource,
    title,
    description,
    rightDescription,
    href = "",
    ...props
}) => {
    return (
        <Link style={styles.container} href={href} asChild>
            <Pressable {...props}>
                <Image
                    style={commonStyles.icon}
                    source={iconSource}
                    alt={iconAlt}
                />
                <View style={styles.left}>
                    <Heading size="small">{title}</Heading>
                    {description ? (
                        <Paragraph secondary>{description}</Paragraph>
                    ) : null}
                </View>
                <View style={styles.right}>
                    {rightDescription ? (
                        <Paragraph secondary>{rightDescription}</Paragraph>
                    ) : null}
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
        backgroundColor: Theme.colors.lightest,
        borderRadius: 8,
        borderColor: Theme.colors.lightGray,
        borderWidth: 1,
        gap: 16,
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
    },
});
