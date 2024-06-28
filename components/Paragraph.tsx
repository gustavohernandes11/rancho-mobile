import React from "react";
import { Text } from "react-native";
import { TextProps } from "react-native-paper";
import { commonStyles } from "styles/Common";

export const Paragraph: React.FC<TextProps<any>> = ({ children, ...props }) => {
    return (
        <Text style={commonStyles.text} {...props}>
            {children}
        </Text>
    );
};
