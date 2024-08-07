import React from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";

type HeaderProps = {
    showCheckbox: boolean;
    showAnimalBatch: boolean;
};

export const Header = ({ showCheckbox, showAnimalBatch }: HeaderProps) => {
    return (
        <DataTable>
            <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title
                    style={{ flex: 4 }}
                    textStyle={commonStyles.text}
                >
                    Nome
                </DataTable.Title>
                {showAnimalBatch ? (
                    <DataTable.Title
                        style={{ flex: 4 }}
                        textStyle={commonStyles.text}
                    >
                        Lote
                    </DataTable.Title>
                ) : null}
                <DataTable.Title
                    style={{ flex: 2 }}
                    textStyle={commonStyles.text}
                >
                    Idade
                </DataTable.Title>
                {showCheckbox ? (
                    <DataTable.Title
                        style={{ flex: 1, justifyContent: "center" }}
                        textStyle={[{ flexShrink: 1 }, commonStyles.text]}
                    >
                        ✓
                    </DataTable.Title>
                ) : null}
            </DataTable.Header>
        </DataTable>
    );
};

const styles = StyleSheet.create({
    tableHeader: {
        borderBottomWidth: 1,
        borderColor: Theme.colors.lightGray,
        backgroundColor: Theme.colors.lightest,
    },
});
