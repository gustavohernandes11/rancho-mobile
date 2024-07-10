import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import {
    Button as PaperButton,
    ButtonProps as PaperButtonProps,
} from "react-native-paper";
import { commonStyles } from "styles/Common";
import { ButtonTypes } from "types";
import {
    getButtonBackgroundColor,
    getButtonBorderColor,
    getButtonTextColor,
} from "utils/conditionalStyles";

type CustomButtonProps = {
    title: string;
    type?: ButtonTypes;
    onPress?: () => any;
} & Omit<PaperButtonProps, "children">;

export const Button = forwardRef<any, CustomButtonProps>((props, ref) => {
    const { title, onPress, disabled, type = "primary", ...rest } = props;

    const styles = getStyles(type, disabled);

    return (
        <PaperButton
            textColor={getButtonTextColor(type)}
            ref={ref}
            style={styles.button}
            disabled={disabled}
            onPress={onPress}
            {...rest}
        >
            <Text style={styles.text}>{title}</Text>
        </PaperButton>
    );
});

const getStyles = (type: ButtonTypes, disabled?: boolean) =>
    StyleSheet.create({
        button: {
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: getButtonBackgroundColor(type),
            borderColor: getButtonBorderColor(type),
            ...(disabled && commonStyles.disabled),
        },
        text: {
            ...commonStyles.text,
            color: getButtonTextColor(type),
            ...(disabled && commonStyles.textDisabled),
        },
    });
