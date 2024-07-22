import { Paragraph } from "components/Paragraph";
import React from "react";
import { StyleSheet, View } from "react-native";
import Theme from "styles/Theme";

export const Point = ({
    formattedValue,
    formattedTime,
}: {
    formattedValue?: string;
    formattedTime?: string;
}) => {
    return (
        <View style={styles.activePoint}>
            <Paragraph>{formattedValue || ""}</Paragraph>
            <Paragraph>{formattedTime || ""}</Paragraph>
        </View>
    );
};

const styles = StyleSheet.create({
    activePoint: {
        backgroundColor: Theme.colors.lightest,
        borderColor: Theme.colors.mediumGray,
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
        zIndex: 99,
    },
});
