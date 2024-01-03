import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Item } from "../types/Item";
import Colors from "../constants/Colors";

interface SimpleTableProps {
	data: Item[];
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ data, ...props }) => (
	<FlatList
		data={data}
		renderItem={(props: RowProps) => <Row {...props} />}
		{...props}
	/>
);

type RowProps = {
	item: Item;
	index: number;
};
const getRowColor = (index: number) =>
	index % 2 === 0 ? Colors.white : Colors.lightGray;

const Row: React.FC<RowProps> = ({ item, index }) => (
	<View style={[styles.row, { backgroundColor: getRowColor(index) }]}>
		<Text>{item.key}</Text>
		<Text>{item.value}</Text>
	</View>
);

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		borderWidth: 1,
		borderColor: Colors.border,
		paddingVertical: 16,
		paddingHorizontal: 8,
		justifyContent: "space-between",
	},
});
