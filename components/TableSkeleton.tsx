import React from "react";
import { View } from "react-native";
import { Skeleton } from "./Skeleton";
import { Span } from "./Span";

export const TableSkeleton = () => {
    return (
        <View style={{ width: "100%", paddingVertical: 16 }}>
            {Array.from(Array(5).keys()).map((_, index) => (
                <Span key={index} direction="row" py={0}>
                    <Skeleton my={0} height={20} flex={3} />
                    <Skeleton my={0} height={20} flex={3} />
                    <Skeleton my={0} height={20} flex={3} />
                    <Skeleton my={0} height={20} flex={1} />
                </Span>
            ))}
        </View>
    );
};
