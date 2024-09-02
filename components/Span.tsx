import React from "react";
import { FlexAlignType, StyleSheet, View, ViewProps } from "react-native";
import { FlexJustifyTypes } from "types";

interface SpanProps {
    children?: React.ReactNode;
    align?: FlexAlignType;
    justify?: FlexJustifyTypes;
    paddingY?: number;
    paddingX?: number;
    padding?: number;
    flexWrap?: "wrap" | "nowrap";
    flexGrow?: 1 | 0;
    marginY?: number | "auto";
    marginX?: number | "auto";
    direction?: "row" | "column";
    gap?: number;
}

export const Span: React.FC<SpanProps & ViewProps> = ({
    children,
    align = "flex-start",
    justify,
    paddingY,
    paddingX,
    padding,
    marginY = 8,
    marginX = 0,
    flexWrap = "wrap",
    direction = "row",
    flexGrow = 0,
    gap = 8,
    style: incommingStyle,
    ...props
}) => {
    return (
        <View
            style={[
                styles.span,
                {
                    alignItems: align,
                    justifyContent: justify,
                    padding: padding,
                    paddingVertical: paddingY,
                    paddingHorizontal: paddingX,
                    marginVertical: marginY,
                    marginHorizontal: marginX,
                    flexDirection: direction,
                    flexWrap,
                    flexGrow,
                    gap,
                },
                incommingStyle,
            ]}
            {...props}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    span: {
        width: "100%",
    },
});
