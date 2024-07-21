import React from "react";
import {
    ActivityIndicator,
    ActivityIndicatorProps,
    StyleSheet,
    View,
} from "react-native";
import Theme from "styles/Theme";

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
            <ActivityIndicator
                color={Theme.colors.primary}
                size={30}
                {...props}
            />
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
