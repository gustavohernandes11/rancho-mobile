import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Storage } from "services/StorageService";
import Colors from "styles/Colors";
import { sharedStyles } from "styles/Common";
import { DayItem } from "./index";

export type CellProps<T> = {
	item: T;
	isSelected: boolean;
	onSelect: (date: Date) => void;
	updateUINumber: number;
};

export const Cell: React.FC<CellProps<DayItem>> = ({
	item,
	isSelected,
	onSelect,
	updateUINumber,
	...props
}) => {
	const [quantity, setQuantity] = useState<number | null>();

	useEffect(() => {
		Storage.getDayProduction(item.date).then((prod) =>
			setQuantity(prod?.quantity || null)
		);
	});

	const cellStyles = StyleSheet.flatten([
		styles.cell,
		isSelected && styles.selectedCell,
	]);
	const textStyles = StyleSheet.flatten([
		sharedStyles.text,
		isSelected && styles.selectedText,
	]);
	const boldStyles = StyleSheet.flatten([
		styles.boldText,
		isSelected && styles.selectedText,
	]);

	return (
		<TouchableOpacity
			onPress={() => onSelect(item.date)}
			style={cellStyles}
			{...props}
		>
			<Text style={textStyles}>{item.value}</Text>
			<Text style={boldStyles}>{quantity || " "}</Text>
		</TouchableOpacity>
	);
};

const isEqual = (
	prevProps: CellProps<DayItem>,
	nextProps: CellProps<DayItem>
) =>
	prevProps.isSelected === nextProps.isSelected &&
	prevProps.updateUINumber === nextProps.updateUINumber;

export const MemoizedCell = React.memo(Cell, isEqual);

const styles = StyleSheet.create({
	cell: {
		flexBasis: (Dimensions.get("window").width - 16) / 7,
		paddingHorizontal: 4,
		paddingVertical: 8,
		gap: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	selectedCell: {
		backgroundColor: Colors.green,
		borderRadius: 16,
	},
	boldText: {
		...sharedStyles.text,
		fontWeight: "bold",
	},
	selectedText: {
		color: Colors.white,
	},
});
