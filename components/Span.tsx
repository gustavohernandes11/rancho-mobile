import React from "react";
import { FlexAlignType, StyleSheet, View, ViewProps } from "react-native";
import { FlexJustifyTypes } from "types";

interface SpanProps {
    children?: React.ReactNode;
    align?: FlexAlignType;
    justify?: FlexJustifyTypes;
    py?: number;
    px?: number;
    p?: number;
    flexWrap?: "wrap" | "nowrap";
    my?: number;
    direction?: "row" | "column";
    gap?: number;
}

export const Span: React.FC<SpanProps & ViewProps> = ({
    children,
    align = "flex-start",
    justify,
    py,
    px,
    p,
    my = 8,
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
                    padding: p,
                    paddingVertical: py,
                    paddingHorizontal: px,
                    marginVertical: my,
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
