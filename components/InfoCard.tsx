import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";

interface InfoCardProps {
    title: string;
    label: string;
    size?: "big" | "medium" | "small";
}

export const InfoCard: React.FC<ViewProps & InfoCardProps> = ({
    title,
    label,
    size = "big",
    ...props
}) => {
    return (
        <View {...props} style={styles.card}>
            <Heading size={size} shrink={1}>
                {title}
            </Heading>
            <Paragraph secondary>{label}</Paragraph>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        ...commonStyles.card,
        flex: 1,
        width: "auto",
        gap: 0,
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: Theme.colors.white,
        borderWidth: 1,
        borderColor: Theme.colors.lightGray,
        elevation: 0,
    },
});
