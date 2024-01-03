import React from "react";
import SelectDropdown from "react-native-select-dropdown";

import { StyleSheet, Text, View, ViewProps } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Item } from "../types/Item";

const dropdownIcon = () => (
	<FontAwesome style={{ marginRight: 8 }} size={18} name="angle-down" />
);

interface SelectProps {
	items: Item[];
	onSelect: (selectedItem: Item, index: number) => void;
	error?: string;
	label?: string;
}
export const Select: React.FC<SelectProps & ViewProps> = ({
	items,
	onSelect,
	label,
	error,
	...props
}) => {
	const getBorderColor = () => (error ? Colors.red : Colors.border);
	return (
		<View>
			{label && <Text style={styles.label}>{label}</Text>}
			<SelectDropdown
				renderDropdownIcon={dropdownIcon}
				buttonTextStyle={styles.text}
				buttonStyle={[styles.button, { borderColor: getBorderColor() }]}
				rowStyle={styles.row}
				rowTextStyle={styles.text}
				dropdownStyle={styles.dropdown}
				defaultButtonText="Selecione uma opção"
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
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	dropdown: {
		borderRadius: 4,
	},
	button: {
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
	},
	label: {
		fontSize: 14,
		color: Colors.darkGray,
	},
	error: {
		fontSize: 12,
		color: Colors.red,
	},
});
