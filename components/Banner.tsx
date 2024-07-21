import { Link } from "expo-router";
import React from "react";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewProps,
} from "react-native";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";

interface BannerProps {
    iconSource: ImageSourcePropType;
    iconAlt: string;
    title: string | React.ReactNode;
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
                <View style={styles.iconSpan}>
                    <Image
                        style={commonStyles.icon}
                        source={iconSource}
                        alt={iconAlt}
                    />
                </View>
                <View style={styles.left}>
                    <Text style={styles.title}>{title}</Text>
                    {description ? (
                        <Text style={styles.description}>{description}</Text>
                    ) : null}
                </View>
                <View style={styles.right}>
                    {rightDescription ? (
                        <Text style={styles.description}>
                            {rightDescription}
                        </Text>
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
        borderRadius: 8,
        backgroundColor: Theme.colors.lightest,
        borderWidth: 1,
        borderColor: Theme.colors.lightGray,
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
        fontFamily: Theme.fonts.primaryFamily,
        color: Theme.colors.darkest,
        fontSize: 16,
    },
    description: {
        ...commonStyles.text,
        fontSize: 12,
        textAlign: "right",
    },
    iconSpan: {
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
    },
});
