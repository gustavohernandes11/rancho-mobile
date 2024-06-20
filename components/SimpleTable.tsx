import Colors from "constants/Colors";
import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { sharedStyles } from "styles/shared";
import { Item } from "types";

interface SimpleTableProps {
	data: Item[];
}
type RowProps<T> = {
	item: T;
	index: number;
};

export const SimpleTable: React.FC<SimpleTableProps> = ({ data, ...props }) => (
	<ScrollView horizontal={false}>
		<ScrollView
			horizontal={true}
			contentContainerStyle={{ width: "100%", height: "100%" }}
		>
			<FlatList
				style={styles.tableContainer}
				data={data}
				keyExtractor={(item: Item) => item.key}
				renderItem={(props: RowProps<Item>) => <Row {...props} />}
				{...props}
			/>
		</ScrollView>
	</ScrollView>
);

const Row: React.FC<RowProps<Item>> = ({ item }) => (
	<View style={styles.row}>
		<Text style={sharedStyles.text}>{item.key}</Text>
		<Text style={sharedStyles.text}>{item.value}</Text>
	</View>
);

const styles = StyleSheet.create({
	tableContainer: {
		borderWidth: 1,
		borderColor: Colors.border,
		borderTopWidth: 0,
	},
	row: {
		flexDirection: "row",
		borderTopWidth: 1,
		borderColor: Colors.border,
		paddingVertical: 16,
		paddingHorizontal: 8,
		justifyContent: "space-between",
	},
});
