import { useNavigation } from "expo-router";
import React from "react";
import { IconButton, IconButtonProps } from "react-native-paper";
import Theme from "styles/Theme";

export const GoBackButton: React.FC<Omit<IconButtonProps, "icon">> = ({
    ...props
}) => {
    const navigation = useNavigation();

    return (
        <IconButton
            size={24}
            iconColor={Theme.colors.white}
            accessibilityLabel="Go back"
            style={{ marginRight: 11, marginLeft: 0 }}
            onPress={navigation.goBack}
            icon="arrow-left"
            {...props}
        />
    );
};
