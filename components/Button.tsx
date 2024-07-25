import React, { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import {
    Button as PaperButton,
    ButtonProps as PaperButtonProps,
} from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { ButtonTypes } from "types";

type CustomButtonProps = {
    title: string;
    type?: ButtonTypes;
    onPress?: () => any;
} & Omit<PaperButtonProps, "children">;

export const Button = forwardRef<any, CustomButtonProps>((props, ref) => {
    const { title, onPress, type = "primary", ...rest } = props;

    const styles = getStyles(type);

    return (
        <PaperButton
            textColor={getButtonTextColor(type)}
            ref={ref}
            style={styles.button}
            onPress={onPress}
            {...rest}
        >
            <Text style={styles.text}>{title}</Text>
        </PaperButton>
    );
});

const getStyles = (type: ButtonTypes) =>
    StyleSheet.create({
        button: {
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: getButtonBackgroundColor(type),
            borderColor: getButtonBorderColor(type),
        },
        text: {
            ...commonStyles.text,
            color: getButtonTextColor(type),
        },
    });

export const getButtonBackgroundColor = (type: ButtonTypes) => {
    if (type === "primary") {
        return Theme.colors.primary;
    } else if (type === "danger") return Theme.colors.red;
    else {
        return "transparent";
    }
};

export const getButtonBorderColor = (type: ButtonTypes) => {
    if (type === "primary" || type === "light") return "transparent";
    else if (type === "light-danger" || type === "danger")
        return Theme.colors.red;
    else return Theme.colors.primary;
};

export const getButtonTextColor = (type: ButtonTypes) => {
    if (type === "light-danger") return Theme.colors.red;
    else if (type === "primary" || type === "danger") return Theme.colors.white;
    else return Theme.colors.primary;
};
