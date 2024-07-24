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
    marginY?: number;
    marginX?: number;
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
    gap = 8,
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
                    gap,
                },
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
