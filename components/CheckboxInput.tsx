import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { commonStyles } from "styles/Common";
import { CheckboxItem } from "./CheckboxItem";
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
            {errorText ? (
                <Text style={commonStyles.error}>{errorText}</Text>
            ) : null}
            <View style={styles.group}>
                {options.map(option => (
                    <CheckboxItem
                        key={option.value}
                        label={option.label}
                        isChecked={
                            selectedValues.includes(option.value)
                                ? "checked"
                                : "unchecked"
                        }
                        onPress={() => handleCheckboxChange(option.value)}
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
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
});

export default CheckboxInput;
