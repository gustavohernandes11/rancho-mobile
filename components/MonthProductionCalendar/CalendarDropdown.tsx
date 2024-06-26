import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { commonStyles } from "styles/Common";
import { Item } from "types";

interface CalendarDropdownProps {
    items: Item[];
    onSelect: (selectedItem: Item) => void;
    defaultValue?: string;
    defaultButtonText: string;
}

const SmallDropdownIcon = () => (
    <FontAwesome style={{ marginRight: 24 }} size={12} name="angle-down" />
);

export const CalendarDropdown = ({
    defaultButtonText = "Selecione uma opção",
    items,
    onSelect,
    ...props
}: CalendarDropdownProps) => {
    return (
        <SelectDropdown
            renderDropdownIcon={SmallDropdownIcon}
            buttonTextStyle={commonStyles.text}
            buttonStyle={styles.buttonStyle}
            rowStyle={styles.rowStyle}
            rowTextStyle={commonStyles.text}
            dropdownStyle={commonStyles.inputAspect}
            data={items}
            onSelect={onSelect}
            buttonTextAfterSelection={selectedItem => selectedItem.key}
            rowTextForSelection={(item: Item) => item.key}
            defaultButtonText={defaultButtonText}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        minHeight: 45,
        backgroundColor: "transparent",
        width: "auto",
        flex: 1,
    },
    rowStyle: {
        minHeight: 45,
    },
});
