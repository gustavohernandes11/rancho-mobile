import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
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
            {errorText ? (
                <Text style={commonStyles.error}>{errorText}</Text>
            ) : null}
            <View style={styles.group}>
                {options.map((option, index) => (
                    <RadioButton.Item
                        position="leading"
                        labelStyle={commonStyles.text}
                        uncheckedColor={
                            errorText ? Theme.colors.red : Theme.colors.darkGray
                        }
                        key={index}
                        label={option.label}
                        value={option.value}
                        color={Theme.colors.primary}
                        style={styles.item}
                        status={
                            value === option.value ? "checked" : "unchecked"
                        }
                        onPress={() => onValueChange(option.value)}
                    />
                ))}
            </View>
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
