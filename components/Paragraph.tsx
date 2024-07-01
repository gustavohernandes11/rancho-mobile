import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextProps } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";

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
            color: color === "black" ? Colors.darkGray : Colors.white,
        },
    });
