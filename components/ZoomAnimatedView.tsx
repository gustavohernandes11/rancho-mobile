import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

type ZoomAnimatedViewProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    durationIn?: number;
    durationOut?: number;
};

export const ZoomAnimatedView: React.FC<ZoomAnimatedViewProps> = ({
    children,
    style,
    durationIn = 200,
    durationOut = 100,
}) => {
    return (
        <Animated.View
            entering={ZoomIn.duration(durationIn)}
            exiting={ZoomOut.duration(durationOut)}
            style={style}
        >
            {children}
        </Animated.View>
    );
};
