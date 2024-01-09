import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Item } from "../types/Item";
import Colors from "../constants/Colors";
import { RowProps } from "../types/RowProps";
import { getRowColor } from "../utils/getRowColor";
import { sharedStyles } from "../styles/shared";

interface SimpleTableProps {
	data: Item[];
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ data, ...props }) => (
	<View style={styles.tableContainer}>
		<FlatList
			data={data}
			renderItem={(props: RowProps<Item>) => <Row {...props} />}
			{...props}
		/>
	</View>
);

const Row: React.FC<RowProps<Item>> = ({ item, index }) => (
	<View style={[styles.row, { backgroundColor: getRowColor(index) }]}>
		<Text style={sharedStyles.text}>{item.key}</Text>
		<Text style={sharedStyles.text}>{item.value}</Text>
	</View>
);

const styles = StyleSheet.create({
	tableContainer: {
		borderRadius: 4,
		marginVertical: 8,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	row: {
		flexDirection: "row",
		borderWidth: 1,
		borderColor: Colors.border,
		paddingVertical: 16,
		paddingHorizontal: 8,
		justifyContent: "space-between",
		gap: 8,
	},
});
