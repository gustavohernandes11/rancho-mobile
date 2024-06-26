import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown, {
    SelectDropdownProps,
} from "react-native-select-dropdown";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import { Item } from "types";
import { getInputBorderColor } from "utils/conditionalStyles";
import { Label } from "./Label";

const DropdownIcon = () => (
    <FontAwesome style={{ marginRight: 8 }} size={16} name="angle-down" />
);

interface SelectProps {
    items: Item[];
    onSelect: (selectedItem: Item, index: number) => void;
    errorText?: string;
    label?: string;
    defaultValue?: string;
    defaultButtonText?: string;
    size?: "medium" | "small";
}
export const Select: React.FC<
    SelectProps & Omit<SelectDropdownProps, "data">
> = ({
    items,
    onSelect,
    defaultButtonText,
    label,
    errorText,
    size = "medium",
    ...props
}) => {
    const styles = getStyles(size, !!errorText);

    return (
        <View style={styles.inputContainer}>
            {label && <Label>{label}</Label>}
            <SelectDropdown
                renderDropdownIcon={DropdownIcon}
                buttonTextStyle={commonStyles.label}
                buttonStyle={styles.button}
                rowStyle={styles.row}
                rowTextStyle={commonStyles.text}
                dropdownStyle={commonStyles.inputAspect}
                defaultButtonText={defaultButtonText || "Selecione uma opção"}
                data={items}
                onSelect={onSelect}
                buttonTextAfterSelection={selectedItem => selectedItem.key}
                rowTextForSelection={(item: Item) => item.key}
                {...props}
            />
            {errorText && <Text style={commonStyles.error}>{errorText}</Text>}
        </View>
    );
};

const getSelectHeight = (size: string) => (size === "medium" ? 50 : 40);
const getStyles = (size: "medium" | "small", hasError: boolean) =>
    StyleSheet.create({
        inputContainer: {
            flex: 1,
        },
        button: {
            width: "auto",
            ...commonStyles.inputAspect,
            padding: 8,
            height: getSelectHeight(size),
            borderColor: getInputBorderColor(hasError),
        },
        row: {
            borderBottomWidth: 1,
            borderColor: Colors.border,
            padding: 8,
            height: getSelectHeight(size),
        },
    });
