import React from "react";
import SelectDropdown from "react-native-select-dropdown";

import { StyleSheet, Text, View, ViewProps } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Item } from "../types/Item";
import { getInputBorderColor } from "../utils/getInputBorderColor";
import Fonts from "../constants/Fonts";
import { sharedStyles } from "../styles/shared";

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
			{label && <Text style={sharedStyles.text}>{label}</Text>}
			<SelectDropdown
				renderDropdownIcon={dropdownIcon}
				buttonTextStyle={sharedStyles.text}
				buttonStyle={[
					styles.button,
					{ borderColor: getInputBorderColor(!!errorText) },
				]}
				rowStyle={styles.row}
				rowTextStyle={sharedStyles.text}
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
			{errorText && <Text style={styles.error}>{errorText}</Text>}
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
		backgroundColor: Colors.lightGray,
		borderWidth: 2,
		borderColor: Colors.border,
		padding: 8,
		marginVertical: 4,
	},
	row: {
		borderRadius: 4,
		backgroundColor: Colors.lightGray,
		borderWidth: 1,
		borderColor: Colors.border,
		padding: 8,
	},
	error: {
		fontSize: 12,
		color: Colors.red,
		fontFamily: Fonts.primaryFamily,
	},
});
