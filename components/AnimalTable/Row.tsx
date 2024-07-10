import { Link } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Checkbox, DataTable, TouchableRipple } from "react-native-paper";
import Colors from "styles/Colors";
import { Animal } from "types";
import { formatAge, getGenderIcon } from "utils/formatters";
import { Cell } from "./Cell";

interface RowProps {
    animal: Animal;
    onCheck: () => void;
    isChecked: boolean;
}

const isEqual = (prevProps: RowProps, nextProps: RowProps) => {
    return (
        prevProps.isChecked === nextProps.isChecked &&
        prevProps.animal.name === nextProps.animal.name &&
        prevProps.animal?.birthdate === nextProps.animal?.birthdate &&
        prevProps.animal?.batchID === nextProps.animal?.batchID
    );
};

export const Row: React.FC<RowProps> = memo(
    ({ animal, isChecked = false, onCheck }) => {
        const { batches } = useGlobalState();
        const batch = batches.find(batch => batch.id === animal.batchID);

        return (
            <Link
                href={{
                    pathname: `/animals/${animal?.id}`,
                    params: { id: animal?.id },
                }}
                key={animal.id}
                asChild
            >
                <TouchableRipple style={isChecked ? styles.checked : null}>
                    <DataTable.Row style={styles.row}>
                        <Cell flex={4}>
                            {getGenderIcon(animal.gender)}
                            {" " + animal.name}
                        </Cell>
                        <Cell flex={4}>
                            {animal.batchID && batch ? batch.name : ""}
                        </Cell>
                        <Cell flex={2}>
                            {animal.birthdate
                                ? formatAge(animal.birthdate)
                                : ""}
                        </Cell>
                        <Cell flex={1}>
                            <Checkbox
                                color={Colors.green}
                                uncheckedColor={Colors.gray}
                                status={isChecked ? "checked" : "unchecked"}
                                onPress={onCheck}
                            />
                        </Cell>
                    </DataTable.Row>
                </TouchableRipple>
            </Link>
        );
    },
    isEqual
);

const styles = StyleSheet.create({
    checked: {
        backgroundColor: Colors.surface,
    },
    row: {
        borderTopWidth: 1,
        borderColor: Colors.border,
    },
});
