import { Link } from "expo-router";
import { useGlobalStore } from "hooks/useGlobalStore";
import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Checkbox, DataTable, TouchableRipple } from "react-native-paper";
import Theme from "styles/Theme";
import { Animal } from "types";
import { getAgeString } from "utils/getAgeString";
import { getGenderIcon } from "utils/getGenderIcon";
import { Cell } from "./Cell";

interface RowProps {
    animal: Animal;
    onCheck: () => void;
    isChecked: boolean;
    showCheckbox: boolean;
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
    ({ animal, isChecked = false, onCheck, showCheckbox }) => {
        const batches = useGlobalStore(state => state.batches);
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
                                ? getAgeString(animal.birthdate)
                                : ""}
                        </Cell>
                        {showCheckbox ? (
                            <Cell flex={1}>
                                <Checkbox
                                    color={Theme.colors.primary}
                                    uncheckedColor={Theme.colors.mediumGray}
                                    status={isChecked ? "checked" : "unchecked"}
                                    onPress={onCheck}
                                />
                            </Cell>
                        ) : null}
                    </DataTable.Row>
                </TouchableRipple>
            </Link>
        );
    },
    isEqual
);

const styles = StyleSheet.create({
    checked: {
        backgroundColor: Theme.colors.lightest,
    },
    row: {
        borderTopWidth: 1,
        borderColor: Theme.colors.lightGray,
    },
});
