import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { getInputBorderColor } from "utils/conditionalStyles";
import { Label } from "./Label";

interface InputProps {
    errorText?: string;
}

export const Input: React.FC<InputProps & TextInputProps> = ({
    label,
    errorText,
    multiline,
    ...props
}) => {
    const styles = getStyles({ multiline, hasError: !!errorText });

    return (
        <View style={styles.inputContainer}>
            {label ? <Label>{label}</Label> : null}
            {errorText ? (
                <Text style={commonStyles.error}>{errorText}</Text>
            ) : null}
            <TextInput
                mode="outlined"
                outlineStyle={styles.outline}
                outlineColor={Theme.colors.mediumGray}
                activeOutlineColor={Theme.colors.darkest}
                textColor={Theme.colors.darkGray}
                placeholderTextColor={Theme.colors.mediumGray}
                cursorColor={Theme.colors.darkGray}
                error={!!errorText}
                multiline={multiline}
                style={styles.input}
                {...props}
            />
        </View>
    );
};

const getStyles = ({
    multiline,
    hasError,
}: {
    multiline?: boolean;
    hasError: boolean;
}) =>
    StyleSheet.create({
        inputContainer: {
            flex: 1,
        },
        input: {
            ...commonStyles.inputAspect,
            height: multiline ? 100 : 50,
            borderWidth: 0,
        },
        outline: {
            ...commonStyles.inputAspect,
            borderColor: getInputBorderColor(hasError),
        },
    });
