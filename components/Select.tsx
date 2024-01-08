import React from "react";
import SelectDropdown from "react-native-select-dropdown";

import { StyleSheet, Text, View, ViewProps } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Item } from "../types/Item";
import { getInputBorderColor } from "../utils/getInputBorderColor";
import Fonts from "../constants/Fonts";

const dropdownIcon = () => (
	<FontAwesome style={{ marginRight: 8 }} size={18} name="angle-down" />
);

interface SelectProps {
	items: Item[];
	onSelect: (selectedItem: Item, index: number) => void;
	errorText?: string;
	label?: string;
	defaultValue?: string;
	defaultButtonText?: string;
}
export const Select: React.FC<SelectProps & ViewProps> = ({
	items,
	onSelect,
	defaultButtonText,
	label,
	errorText,
	...props
}) => {
	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.label}>{label}</Text>}
			<SelectDropdown
				renderDropdownIcon={dropdownIcon}
				buttonTextStyle={styles.text}
				buttonStyle={[
					styles.button,
					{ borderColor: getInputBorderColor(!!errorText) },
				]}
				rowStyle={styles.row}
				rowTextStyle={styles.text}
				dropdownStyle={styles.dropdown}
				defaultButtonText={defaultButtonText || "Selecione uma opção"}
				data={items}
				onSelect={onSelect}
				buttonTextAfterSelection={(selectedItem) => {
					return selectedItem.key;
				}}
				rowTextForSelection={(item: Item) => {
					return item.key;
				}}
				{...props}
			/>
			{errorText && <Text style={styles.errorText}>{errorText}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		marginBottom: 4,
	},
	dropdown: {
		borderRadius: 4,
	},
	button: {
		width: "auto",
		borderRadius: 4,
		backgroundColor: Colors.gray,
		borderWidth: 1,
		borderColor: Colors.border,
		padding: 8,
		marginVertical: 4,
	},
	row: {
		borderRadius: 4,
		backgroundColor: Colors.gray,
		borderWidth: 1,
		borderColor: Colors.border,
		padding: 8,
	},
	text: {
		fontSize: 14,
		color: Colors.darkGray,
		fontFamily: Fonts.primaryFamily,
	},
	label: {
		fontSize: 14,
		color: Colors.darkGray,
		fontFamily: Fonts.primaryFamily,
	},
	errorText: {
		fontSize: 12,
		color: Colors.red,
		fontFamily: Fonts.primaryFamily,
	},
});
