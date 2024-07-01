import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "styles/Colors";

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export const WeekDayHeader = () => (
    <View style={styles.daysOfWeekContainer}>
        {daysOfWeek.map(day => (
            <Text key={day} style={styles.dayOfWeek}>
                {day}
            </Text>
        ))}
    </View>
);

const styles = StyleSheet.create({
    daysOfWeekContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dayOfWeek: {
        flex: 1,
        textAlign: "center",
        padding: 4,
        color: Colors.darkGray,
    },
});
