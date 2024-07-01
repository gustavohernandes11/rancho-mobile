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
    height = 100,
    ...props
}) => {
    const styles = getStyles(height);

    return (
        <View style={styles.container}>
            <ActivityIndicator color={Colors.green} size={30} {...props} />
        </View>
    );
};

const getStyles = (height: number) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: height,
        },
    });
