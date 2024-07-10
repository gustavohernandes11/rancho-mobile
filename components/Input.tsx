import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
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
            <TextInput
                mode="outlined"
                outlineStyle={styles.outline}
                outlineColor={Colors.border}
                activeOutlineColor={Colors.black}
                textColor={Colors.darkGray}
                placeholderTextColor={Colors.gray}
                cursorColor={Colors.darkGray}
                error={!!errorText}
                multiline={multiline}
                style={styles.input}
                {...props}
            />
            {errorText ? (
                <Text style={commonStyles.error}>{errorText}</Text>
            ) : null}
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
            width: "100%",
        },
        input: {
            ...commonStyles.inputAspect,
            height: multiline ? 80 : 50,
            borderWidth: 0,
        },
        outline: {
            ...commonStyles.inputAspect,
            borderColor: getInputBorderColor(hasError),
        },
    });
