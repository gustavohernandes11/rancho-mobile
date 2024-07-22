import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextProps } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";

type ParagraphProps = {
    color?: "white" | "black";
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

const getStyles = (color: "white" | "black", secondary: boolean) =>
    StyleSheet.create({
        text: {
            ...(secondary ? commonStyles.secondaryText : commonStyles.text),
            color:
                color === "black" ? Theme.colors.darkest : Theme.colors.white,
        },
    });
