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
    icon?: React.ReactNode;
}

export const InfoCard: React.FC<ViewProps & InfoCardProps> = ({
    title,
    label,
    size = "medium",
    icon,
    ...props
}) => {
    return (
        <View {...props} style={styles.card}>
            {icon}
            <Heading size={size}>{title}</Heading>
            <Paragraph secondary>{label}</Paragraph>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: "auto",
        gap: 0,
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: Theme.colors.white,
        ...commonStyles.border,
        borderRadius: 4,
        padding: 8,
    },
});
