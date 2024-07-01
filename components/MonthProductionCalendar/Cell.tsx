import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Storage } from "services/StorageService";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
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
        Storage.getDayProduction(item.date).then(prod =>
            setQuantity(prod?.quantity || null)
        );
    }, [item.date]);

    const styles = getStyles(isSelected);

    return (
        <TouchableOpacity
            onPress={() => onSelect(item.date)}
            style={styles.cell}
            {...props}
        >
            <Text style={styles.text}>{item.value}</Text>
            <Text style={styles.bold}>{quantity || " "}</Text>
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

const getStyles = (isSelected: boolean) =>
    StyleSheet.create({
        cell: {
            flexBasis: (Dimensions.get("window").width - 32) / 7,
            paddingHorizontal: 4,
            paddingVertical: 8,
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isSelected ? Colors.green : "transparent",
            borderRadius: isSelected ? 8 : 0,
        },
        text: {
            ...commonStyles.text,
            color: isSelected ? Colors.white : commonStyles.text.color,
        },
        bold: {
            ...commonStyles.text,
            color: isSelected ? Colors.white : commonStyles.text.color,
            fontWeight: "bold",
        },
    });
