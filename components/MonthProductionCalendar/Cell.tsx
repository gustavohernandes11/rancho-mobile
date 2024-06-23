import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Storage } from "services/StorageService";
import Colors from "styles/Colors";
import { sharedStyles } from "styles/Common";
import { DayItem } from "./index";

export type CellProps<T> = {
	item: T;
	isSelected: boolean;
	onSelect: () => void;
};

export const Cell: React.FC<CellProps<DayItem>> = ({
	item,
	isSelected,
	onSelect,
}) => {
	const [quantity, setQuantity] = useState<number | null>();

	useEffect(() => {
		Storage.getDayProduction(moment(item.date).toDate()).then((prod) =>
			setQuantity(prod?.quantity || null)
		);
	});

	const cellStyles = StyleSheet.flatten([
		styles.cell,
		isSelected && styles.selectedCell,
		!item.isCurrentMonth && styles.nonCurrentMonthCell,
	]);

	return (
		<TouchableOpacity onPress={onSelect} style={cellStyles}>
			<Text style={sharedStyles.text}>{item.value}</Text>
			<Text style={styles.boldText}>{quantity || " "}</Text>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	cell: {
		borderWidth: 1,
		flexBasis: (Dimensions.get("window").width - 16) / 7,
		borderColor: Colors.border,
		padding: 4,
		paddingVertical: 8,
		gap: 4,
		justifyContent: "center",
	},
	selectedCell: {
		borderColor: Colors.purple,
		borderBottomWidth: 2,
	},
	nonCurrentMonthCell: {
		backgroundColor: Colors.lightGray,
	},
	boldText: {
		...sharedStyles.text,
		fontWeight: "bold",
	},
});
