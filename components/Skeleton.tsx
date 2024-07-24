import React from "react";
import { View } from "react-native";
import Theme from "styles/Theme";

type SkeletonProps = {
    width?: number | "100%";
    height?: number | "100%";
    marginY?: number;
    marginX?: number;
    flex?: number;
};
export const Skeleton: React.FC<SkeletonProps> = ({
    width,
    height = 20,
    marginX = 0,
    marginY = 5,
    flex = 1,
    ...props
}) => {
    return (
        <View
            style={{
                backgroundColor: Theme.colors.lightest,
                flex,
                height,
                width,
                marginVertical: marginY,
                marginHorizontal: marginX,
                borderRadius: 8,
            }}
            {...props}
        />
    );
};
