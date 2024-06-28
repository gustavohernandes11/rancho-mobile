import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HelperText } from "react-native-paper";
import SelectDropdown, {
	SelectDropdownProps,
} from "react-native-select-dropdown";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import { Item } from "types/Item";
import { getInputBorderColor } from "utils/conditionalStyles";

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
	backgroundColor?: "gray" | "transparent";
}
export const Select: React.FC<
	SelectProps & Omit<SelectDropdownProps, "data">
> = ({
	items,
	onSelect,
	defaultButtonText,
	label,
	errorText,
	backgroundColor = "gray",
	size = "medium",
	...props
}) => {
	const getSelectHeight = () => (size === "medium" ? 50 : 40);
	const getBackgroundColor = () =>
		backgroundColor === "gray" ? Colors.lightGray : "transparent";
	return (
		<View style={styles.inputContainer}>
			<HelperText
				style={commonStyles.label}
				visible={!!label}
				type="info"
			>
				{label}
			</HelperText>
			<SelectDropdown
				renderDropdownIcon={DropdownIcon}
				buttonTextStyle={commonStyles.label}
				buttonStyle={[
					styles.button,
					{
						height: getSelectHeight(),
						backgroundColor: getBackgroundColor(),
						borderColor: getInputBorderColor(!!errorText),
					},
				]}
				rowStyle={[
					styles.row,
					{
						height: getSelectHeight(),
					},
				]}
				rowTextStyle={commonStyles.text}
				dropdownStyle={commonStyles.inputAspect}
				defaultButtonText={defaultButtonText || "Selecione uma opção"}
				data={items}
				onSelect={onSelect}
				buttonTextAfterSelection={(selectedItem) => selectedItem.key}
				rowTextForSelection={(item: Item) => item.key}
				{...props}
			/>
			{errorText && <Text style={commonStyles.error}>{errorText}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
	},
	dropdown: {
		borderRadius: 8,
	},
	button: {
		width: "auto",
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 8,
		padding: 8,
	},
	row: {
		backgroundColor: Colors.lightGray,
		borderBottomWidth: 1,
		borderColor: Colors.border,
		padding: 8,
	},
});
