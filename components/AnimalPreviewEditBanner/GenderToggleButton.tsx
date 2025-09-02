import React from "react";
import { StyleSheet } from "react-native";
import { ToggleButton } from "react-native-paper";
import Theme from "styles/Theme";

interface GenderToggleButtonProps {
    value: "F" | "M";
    onChange: (value: "F" | "M") => void;
}

export const GenderToggleButton: React.FC<GenderToggleButtonProps> = ({
    value,
    onChange,
}) => {
    const handleSetGender = (value: string) => {
        if (value === "F" || value === "M") onChange(value);
    };
    return (
        <ToggleButton.Row onValueChange={handleSetGender} value={value}>
            <ToggleButton
                iconColor={
                    value === "F" ? Theme.colors.white : Theme.colors.mediumGray
                }
                icon="gender-female"
                style={[
                    styles.button,
                    {
                        backgroundColor:
                            value === "F"
                                ? Theme.colors.pink
                                : Theme.colors.lightest,
                    },
                ]}
                value="F"
            />
            <ToggleButton
                iconColor={
                    value === "M" ? Theme.colors.white : Theme.colors.mediumGray
                }
                icon="gender-male"
                style={[
                    styles.button,
                    {
                        backgroundColor:
                            value === "M"
                                ? Theme.colors.blue
                                : Theme.colors.lightest,
                    },
                ]}
                value="M"
            />
        </ToggleButton.Row>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
    },
});
