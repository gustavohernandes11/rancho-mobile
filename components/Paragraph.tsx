import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextProps } from "react-native-paper";
import { commonStyles } from "styles/Common";
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
            ...(secondary ? commonStyles.secondaryText : commonStyles.text),
            color: getColor(color),
        },
    });

const getColor = (color: TextColorOptions) => {
    if (color === "white") return Theme.colors.white;
    else if (color === "green") return Theme.colors.primary;
    else return Theme.colors.darkest;
};
