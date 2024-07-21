import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { getInputBorderColor } from "utils/conditionalStyles";
import { Label } from "./Label";

interface DatePickerProps {
    errorText?: string;
}

export const DatePicker: React.FC<
    DatePickerProps & Omit<DatePickerInputProps, "locale">
> = ({ label, errorText, ...props }) => {
    const styles = getStyles(!!errorText);

    return (
        <View style={styles.inputContainer}>
            {!!label ? <Label>{label}</Label> : null}
            <DatePickerInput
                iconColor={Theme.colors.darkGray}
                mode="outlined"
                outlineStyle={styles.outline}
                outlineColor={Theme.colors.mediumGray}
                activeOutlineColor={Theme.colors.darkGray}
                textColor={Theme.colors.darkGray}
                startYear={1990}
                endYear={2025}
                locale="pt"
                placeholderTextColor={Theme.colors.mediumGray}
                style={styles.input}
                withModal={false}
                {...props}
            />
            {!!errorText ? (
                <Text style={commonStyles.error}>{errorText}</Text>
            ) : null}
        </View>
    );
};

const getStyles = (hasError: boolean) =>
    StyleSheet.create({
        inputContainer: {
            flex: 1,
        },
        input: {
            borderRadius: 8,
            height: 50,
            fontSize: 14,
            fontFamily: Theme.fonts.primaryFamily,
            backgroundColor: Theme.colors.lightGray,
        },
        outline: {
            ...commonStyles.inputAspect,
            borderColor: getInputBorderColor(hasError),
        },
    });
