import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { Label } from "./Label";

interface SegmentedButtonsInputProps {
    label?: string;
    options: { label: string; value: string }[];
    selectedValues: string[];
    onValueChange: (value: any[]) => void;
    errorText?: string;
}

const SegmentedButtonsInput: React.FC<SegmentedButtonsInputProps> = ({
    label,
    options,
    selectedValues,
    onValueChange,
    errorText,
}) => {
    const handleSegmentedButtonChange = (value: string[]) => {
        onValueChange(value);
    };

    return (
        <View style={styles.container}>
            {label ? <Label>{label}</Label> : null}
            {errorText ? (
                <Text style={commonStyles.error}>{errorText}</Text>
            ) : null}
            <SegmentedButtons
                multiSelect
                value={selectedValues}
                onValueChange={handleSegmentedButtonChange}
                buttons={options.map(option => ({
                    value: option.value,
                    label: option.label,
                    showSelectedCheck: true,
                    style: styles.button,
                    checkedColor: Theme.colors.primary,
                    labelStyle: styles.label,
                }))}
                style={styles.buttonSpan}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    buttonSpan: {
        borderColor: Theme.colors.mediumGray,
    },
    button: {
        borderColor: Theme.colors.mediumGray,
        backgroundColor: Theme.colors.white,
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontFamily: Theme.fonts.primaryFamily,
    },
});

export default SegmentedButtonsInput;
