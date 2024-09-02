import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { getInputBorderColor } from "utils/getInputBorderColor";
import { CheckboxItem } from "./CheckboxItem";
import { InputInfo } from "./InputInfo";
import { Span } from "./Span";

interface DatePickerProps {
    errorText?: string;
    label?: string;
    showCheckBoxToSelectToday?: boolean;
    onChange: (date?: Date) => void;
    onChangeText: (text?: string) => void;
}

export const DatePicker: React.FC<
    DatePickerProps & Omit<DatePickerInputProps, "locale" | "label">
> = ({
    label,
    errorText,
    showCheckBoxToSelectToday = false,
    onChange,
    onChangeText,
    placeholder,
    ...props
}) => {
    const [isChecked, setIsChecked] = useState(false);
    const styles = getStyles(!!errorText);

    const handleCheckToday = () => {
        const today = new Date();
        const isCheckedNow = !isChecked;
        setIsChecked(isCheckedNow);

        if (isCheckedNow) {
            onChange(today);
            onChangeText(moment(today).format("DD/MM/YYYY"));
        } else {
            // clear field when uncheck "today" box
            onChange(undefined);
            onChangeText("");
        }
    };

    const handleDateChange = (date?: Date) => {
        onChange(date);
    };

    const handleDateChangeText = (text?: string) => {
        onChangeText(text);
    };

    return (
        <View style={styles.inputContainer}>
            <InputInfo errorText={errorText} label={label} />
            <DatePickerInput
                disabled={isChecked}
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
                onChange={handleDateChange}
                onChangeText={handleDateChangeText}
                placeholder={
                    isChecked ? moment().format("DD/MM/YYYY") : placeholder
                }
                {...props}
            />
            {showCheckBoxToSelectToday ? (
                <Span marginY={0}>
                    <CheckboxItem
                        isChecked={isChecked ? "checked" : "unchecked"}
                        label="Hoje"
                        onPress={handleCheckToday}
                    />
                </Span>
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
            borderRadius: 4,
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
