import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
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
            {label && <Label>{label}</Label>}
            <View style={styles.checkboxGroup}>
                {options.map((option, index) => (
                    <View key={index} style={styles.checkboxItem}>
                        <Checkbox.Item
                            label={option.label}
                            status={
                                selectedValues.includes(option.value)
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={() => handleCheckboxChange(option.value)}
                            color={Colors.green}
                            labelStyle={commonStyles.text}
                            uncheckedColor={Colors.darkGray}
                            position="leading"
                        />
                    </View>
                ))}
            </View>
            {errorText && <Text style={commonStyles.error}>{errorText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    checkboxGroup: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        ...commonStyles.inputAspect,
    },
    checkboxItem: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default CheckboxInput;
