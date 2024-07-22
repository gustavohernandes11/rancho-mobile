import React from "react";
import { StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";

interface CheckboxProps {
    label: string;
    isChecked: "checked" | "unchecked";
    onPress: () => void;
}

export const CheckboxItem: React.FC<CheckboxProps> = ({
    label,
    isChecked,
    onPress,
}) => {
    return (
        <Checkbox.Item
            label={label}
            status={isChecked}
            onPress={onPress}
            color={Theme.colors.primary}
            labelStyle={commonStyles.text}
            uncheckedColor={Theme.colors.mediumGray}
            position="leading"
            style={styles.item}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        margin: 0,
        paddingHorizontal: 0,
        marginRight: 8,
    },
});
