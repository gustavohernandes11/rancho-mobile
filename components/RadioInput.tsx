import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import { Label } from "./Label";

interface RadioInputProps {
    label?: string;
    options: { label: string; value: string }[];
    value: string;
    onValueChange: (value: any) => void;
    errorText?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
    label,
    options,
    value,
    onValueChange,
    errorText,
}) => {
    return (
        <View style={styles.container}>
            {label && <Label>{label}</Label>}
            <View style={styles.radioGroup}>
                {options.map((option, index) => (
                    <RadioButton.Item
                        position="leading"
                        labelStyle={commonStyles.text}
                        uncheckedColor={Colors.darkGray}
                        key={index}
                        label={option.label}
                        value={option.value}
                        color={Colors.green}
                        status={
                            value === option.value ? "checked" : "unchecked"
                        }
                        onPress={() => onValueChange(option.value)}
                    />
                ))}
            </View>
            {errorText && <Text style={commonStyles.error}>{errorText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        ...commonStyles.inputAspect,
    },
});

export default RadioInput;
