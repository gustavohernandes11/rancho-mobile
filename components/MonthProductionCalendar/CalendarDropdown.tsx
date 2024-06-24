import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { sharedStyles } from "styles/Common";
import { Item } from "types/Item";

interface CalendarDropdownProps {
	items: Item[];
	onSelect: (selectedItem: Item) => void;
	defaultValue?: string;
	defaultButtonText: string;
}

const SmallDropdownIcon = () => (
	<FontAwesome style={{ marginRight: 4 }} size={12} name="angle-down" />
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
			buttonTextStyle={sharedStyles.text}
			buttonStyle={{
				minHeight: 45,
				backgroundColor: "transparent",
				width: "auto",
				flex: 1,
			}}
			rowStyle={{
				minHeight: 45,
			}}
			rowTextStyle={sharedStyles.text}
			dropdownStyle={sharedStyles.inputAspect}
			data={items}
			onSelect={onSelect}
			buttonTextAfterSelection={(selectedItem) => selectedItem.key}
			rowTextForSelection={(item: Item) => item.key}
			defaultButtonText={defaultButtonText}
			{...props}
		/>
	);
};