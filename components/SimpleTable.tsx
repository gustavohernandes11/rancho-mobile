import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
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
            contentContainerStyle={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            <FlatList
                style={styles.table}
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
        <Text style={commonStyles.text}>{item.key}</Text>
        <Text style={commonStyles.text}>{item.value}</Text>
    </View>
);

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        overflow: "hidden",
    },
    row: {
        overflow: "hidden",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 8,
        justifyContent: "space-between",
    },
});
