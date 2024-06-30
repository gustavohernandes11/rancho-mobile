import { Paragraph } from "components/Paragraph";
import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "styles/Colors";

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
        backgroundColor: Colors.darkGreen,
        borderColor: Colors.green,
        padding: 10,
        borderRadius: 10,
    },
});
