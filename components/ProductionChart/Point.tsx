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
            <Paragraph color="white">{formattedValue || ""}</Paragraph>
            <Paragraph color="white">{formattedTime || ""}</Paragraph>
        </View>
    );
};

const styles = StyleSheet.create({
    activePoint: {
        backgroundColor: Theme.colors.lightest,
        borderColor: Theme.colors.primary,
        padding: 10,
        borderRadius: 10,
    },
});
