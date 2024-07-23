import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextProps } from "react-native-paper";
import Theme from "styles/Theme";

type TextColorOptions = "white" | "black" | "green";
type ParagraphProps = {
    color?: TextColorOptions;
    secondary?: boolean;
};

export const Paragraph: React.FC<TextProps<any> & ParagraphProps> = ({
    children,
    color = "black",
    secondary = false,
    ...props
}) => {
    const styles = getStyles(color, secondary);

    return (
        <Text style={styles.text} {...props}>
            {children}
        </Text>
    );
};

const getStyles = (color: TextColorOptions, secondary: boolean) =>
    StyleSheet.create({
        text: {
            color: getColor(color, secondary),
            fontSize: secondary ? 14 : 16,
            flexWrap: "wrap",
        },
    });

const getColor = (color: TextColorOptions, secondary: boolean) => {
    switch (color) {
        case "white":
            return Theme.colors.white;
        case "green":
            return Theme.colors.primary;
        case "black":
        default:
            return secondary ? Theme.colors.darkGray : Theme.colors.darkest;
    }
};
