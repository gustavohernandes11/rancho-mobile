import React from "react";
import {
    ActivityIndicator,
    ActivityIndicatorProps,
    StyleSheet,
    View,
} from "react-native";
import Colors from "styles/Colors";

type CustomLoadingProps = {
    height?: number;
};

export const Loading: React.FC<ActivityIndicatorProps & CustomLoadingProps> = ({
    children,
    height = 100,
    ...props
}) => {
    return (
        <View style={[styles.container, { height }]}>
            <ActivityIndicator color={Colors.green} size={30} {...props} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
});
