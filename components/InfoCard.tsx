import React from "react";
import {
    Image,
    ImageURISource,
    StyleSheet,
    View,
    ViewProps,
} from "react-native";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";

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
                    style={commonStyles.icon}
                    source={iconSource}
                    alt={alt}
                />
            )}
            <Heading size="big" shrink={1}>
                {title}
            </Heading>
            <Paragraph>{description}</Paragraph>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        ...commonStyles.card,
        gap: 0,
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        elevation: 0,
    },
});
