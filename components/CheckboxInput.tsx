import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { Label } from "./Label";

interface CheckboxInputProps {
    label?: string;
    options: { label: string; value: string }[];
    selectedValues: string[];
    onValueChange: (value: any[]) => void;
    errorText?: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
    label,
    options,
    selectedValues,
    onValueChange,
    errorText,
}) => {
    const handleCheckboxChange = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter(item => item !== value)
            : [...selectedValues, value];

        onValueChange(newSelectedValues);
    };

    return (
        <View style={styles.container}>
            {label ? <Label>{label}</Label> : null}
            <View style={styles.group}>
                {options.map(option => (
                    <Checkbox.Item
                        key={option.value}
                        label={option.label}
                        status={
                            selectedValues.includes(option.value)
                                ? "checked"
                                : "unchecked"
                        }
                        onPress={() => handleCheckboxChange(option.value)}
                        color={Theme.colors.primary}
                        labelStyle={commonStyles.text}
                        uncheckedColor={Theme.colors.mediumGray}
                        position="leading"
                        style={styles.item}
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
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    item: {
        margin: 0,
        paddingHorizontal: 0,
        marginRight: 8,
    },
});

export default CheckboxInput;
