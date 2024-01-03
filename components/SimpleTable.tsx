import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Item } from "../types/Item";
import Colors from "../constants/Colors";
import { RowProps } from "../types/RowProps";
import { getRowColor } from "../utils/getRowColor";

interface SimpleTableProps {
	data: Item[];
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ data, ...props }) => (
	<View>
		<FlatList
			data={data}
			renderItem={(props: RowProps<Item>) => <Row {...props} />}
			{...props}
		/>
	</View>
);

const Row: React.FC<RowProps<Item>> = ({ item, index }) => (
	<View style={[styles.row, { backgroundColor: getRowColor(index) }]}>
		<Text style={styles.text}>{item.key}</Text>
		<Text style={styles.text}>{item.value}</Text>
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
	text: {
		color: Colors.darkGray,
	},
});
