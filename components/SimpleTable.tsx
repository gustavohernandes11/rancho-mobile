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
            contentContainerStyle={styles.contentContainer}
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
        <View style={styles.cellLeft}>
            <Paragraph>{item.key}</Paragraph>
        </View>
        <View style={styles.cellRight}>
            <Paragraph>{item.value}</Paragraph>
        </View>
    </View>
);

const styles = StyleSheet.create({
    contentContainer: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    table: {
        borderWidth: 1,
        borderColor: Theme.colors.lightGray,
        borderRadius: 4,
        overflow: "hidden",
    },
    row: {
        overflow: "hidden",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: Theme.colors.lightGray,
        borderRadius: 4,
        justifyContent: "space-between",
    },
    cellLeft: {
        flex: 1,
        backgroundColor: Theme.colors.lightest,
        borderRightWidth: 1,
        borderColor: Theme.colors.lightGray,
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    cellRight: {
        flex: 1,
        alignItems: "flex-end",
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
});
