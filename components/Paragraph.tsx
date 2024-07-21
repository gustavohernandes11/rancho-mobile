import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextProps } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";

type ParagraphProps = {
    color?: "white" | "black";
};

export const Paragraph: React.FC<TextProps<any> & ParagraphProps> = ({
    children,
    color = "black",
    ...props
}) => {
    const styles = getStyles(color);

    return (
        <Text style={styles.text} {...props}>
            {children}
        </Text>
    );
};

const getStyles = (color: "white" | "black") =>
    StyleSheet.create({
        text: {
            ...commonStyles.text,
            color:
                color === "black" ? Theme.colors.darkest : Theme.colors.white,
        },
    });
