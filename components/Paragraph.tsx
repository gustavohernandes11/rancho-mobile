import React from "react";
import { Text } from "react-native";
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
    return (
        <Text
            style={[
                commonStyles.text,
                { color: color === "black" ? Colors.darkGray : Colors.white },
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};
