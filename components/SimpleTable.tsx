import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import Theme from "styles/Theme";
import { Item } from "types";
import { Paragraph } from "./Paragraph";

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
        <Paragraph>{item.key}</Paragraph>
        <Paragraph>{item.value}</Paragraph>
    </View>
);

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: Theme.colors.lightGray,
        borderRadius: 8,
        overflow: "hidden",
    },
    row: {
        overflow: "hidden",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: Theme.colors.lightGray,
        paddingVertical: 16,
        paddingHorizontal: 8,
        justifyContent: "space-between",
    },
});
