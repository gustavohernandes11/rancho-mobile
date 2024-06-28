import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import {
    Button as PaperButton,
    ButtonProps as PaperButtonProps,
} from "react-native-paper";
import { commonStyles } from "styles/Common";
import { ButtonTypes } from "types/ButtonTypes";
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

    const buttonStyle = [
        styles.button,
        {
            backgroundColor: getButtonBackgroundColor(type),
            borderColor: getButtonBorderColor(type),
        },
        disabled && commonStyles.disabled,
    ];

    const textStyle = [
        commonStyles.text,
        { color: getButtonTextColor(type) },
        disabled && commonStyles.textDisabled,
    ];

    return (
        <PaperButton
            textColor={getButtonTextColor(type)}
            ref={ref}
            style={buttonStyle}
            disabled={disabled}
            onPress={onPress}
            {...rest}
        >
            <Text style={textStyle}>{title}</Text>
        </PaperButton>
    );
});

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 8,
    },
});
