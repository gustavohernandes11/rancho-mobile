import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import Fonts from "styles/Fonts";
import { getInputBorderColor } from "utils/conditionalStyles";
import { Label } from "./Label";

interface DatePickerProps {
    errorText?: string;
}

export const DatePicker: React.FC<
    DatePickerProps & Omit<DatePickerInputProps, "locale">
> = ({ label, errorText, ...props }) => {
    const outlineStyle = [
        commonStyles.inputAspect,
        {
            borderColor: getInputBorderColor(!!errorText),
        },
    ];
    return (
        <View style={styles.inputContainer}>
            {label && <Label>{label}</Label>}
            <DatePickerInput
                iconColor={Colors.darkGray}
                mode="outlined"
                outlineStyle={outlineStyle}
                outlineColor={Colors.border}
                activeOutlineColor={Colors.darkGray}
                textColor={Colors.darkGray}
                startYear={1990}
                endYear={2025}
                locale="pt"
                placeholderTextColor={Colors.gray}
                style={styles.input}
                withModal={false}
                {...props}
            />
            {errorText && <Text style={commonStyles.error}>{errorText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
    },
    input: {
        borderRadius: 8,
        height: 50,
        fontSize: 14,
        fontFamily: Fonts.primaryFamily,
        backgroundColor: Colors.lightGray,
    },
});
