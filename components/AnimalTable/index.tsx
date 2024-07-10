import { FlashList } from "@shopify/flash-list";
import { Span } from "components/Span";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useClearSelectionOnHardwareBack } from "hooks/useClearSelectionOnHardwareBack";
import React, { useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "styles/Common";
import { Animal } from "types";
import { Header } from "./Header";
import { Row } from "./Row";

type AnimalTableProps = {
    animals: Animal[];
};

export const AnimalTable: React.FC<AnimalTableProps> = ({ animals }) => {
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);
    const isSelectionMode = useAnimalSelectionStore(
        state => state.isSelectionMode
    );
    const toggleCheckID = useAnimalSelectionStore(state => state.toggleCheckID);
    const setIsSelectionMode = useAnimalSelectionStore(
        state => state.setIsSelectionMode
    );

    useClearSelectionOnHardwareBack();

    const handleCheck = (id: number) => {
        toggleCheckID(id);

        if (!isSelectionMode || !!selectedIDs) {
            setIsSelectionMode(true);
        }
    };

    const keyExtractor = useCallback((item: Animal) => item.id.toString(), []);
    const renderItem = ({ item }: { item: Animal }) => (
        <Row
            isChecked={selectedIDs.includes(item.id)}
            onCheck={() => handleCheck(item.id)}
            animal={item}
        />
    );

    const renderEmptyList = () => (
        <Span justify="center">
            <Text style={{ padding: 16 }}>Nenhum animal encontrado.</Text>
        </Span>
    );

    return (
        <View style={styles.tableContainer}>
            <FlashList
                removeClippedSubviews={true}
                data={animals}
                indicatorStyle="white"
                keyExtractor={keyExtractor}
                extraData={[selectedIDs, isSelectionMode]}
                renderItem={renderItem}
                estimatedItemSize={50}
                ListHeaderComponent={Header}
                ListEmptyComponent={renderEmptyList}
                testID="animal-table"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    tableContainer: {
        minHeight: 20,
        width: Dimensions.get("screen").width - 16,
        borderRadius: 8,
        overflow: "hidden",
        ...commonStyles.border,
    },
});
