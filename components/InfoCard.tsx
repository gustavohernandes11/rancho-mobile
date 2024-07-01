import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";

interface InfoCardProps {
    title: string;
    description: string;
}

export const InfoCard: React.FC<ViewProps & InfoCardProps> = ({
    title,
    description,
    ...props
}) => {
    return (
        <View {...props} style={styles.card}>
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
        flex: 1,
        width: "auto",
        gap: 0,
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        elevation: 0,
    },
});
