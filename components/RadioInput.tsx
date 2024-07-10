import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import { Label } from "./Label";

interface RadioInputProps {
    label?: string;
    options: { label: string; value: string }[];
    value: string;
    onValueChange: (value: any) => void;
    errorText?: string;
}

export const RadioInput: React.FC<RadioInputProps> = ({
    label,
    options,
    value,
    onValueChange,
    errorText,
}) => {
    return (
        <View style={styles.container}>
            {label ? <Label>{label}</Label> : null}
            <View style={styles.group}>
                {options.map((option, index) => (
                    <RadioButton.Item
                        position="leading"
                        labelStyle={commonStyles.text}
                        uncheckedColor={
                            errorText ? Colors.red : Colors.darkGray
                        }
                        key={index}
                        label={option.label}
                        value={option.value}
                        color={Colors.green}
                        style={styles.item}
                        status={
                            value === option.value ? "checked" : "unchecked"
                        }
                        onPress={() => onValueChange(option.value)}
                    />
                ))}
            </View>
            {errorText ? (
                <Text style={commonStyles.error}>{errorText}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    group: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    item: {
        margin: 0,
        paddingHorizontal: 0,
        marginRight: 8,
    },
});
