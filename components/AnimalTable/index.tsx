import { Span } from "components/Span";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useClearSelectionOnHardwareBack } from "hooks/useClearSelectionOnHardwareBack";
import React, { useCallback } from "react";
import { Dimensions, FlatList, StyleSheet, Text } from "react-native";
import { commonStyles } from "styles/Common";
import { Animal, AnimalPreview } from "types";
import { Header } from "./Header";
import { Row } from "./Row";

type AnimalTableProps = {
    animals: AnimalPreview[];
    showCheckbox?: boolean;
    showAnimalBatch?: boolean;
};

export const AnimalTable: React.FC<AnimalTableProps> = ({
    animals,
    showCheckbox = true,
    showAnimalBatch = true,
}) => {
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
    const renderItem = ({ item }: { item: AnimalPreview }) => (
        <Row
            showAnimalBatch={showAnimalBatch}
            showCheckbox={showCheckbox}
            isChecked={selectedIDs.includes(item.id)}
            onCheck={() => handleCheck(item.id)}
            animal={item}
        />
    );

    const renderHeader = () => (
        <Header showAnimalBatch={showAnimalBatch} showCheckbox={showCheckbox} />
    );

    const renderEmptyList = () => (
        <Span justify="center">
            <Text style={{ padding: 16 }}>Nenhum animal encontrado.</Text>
        </Span>
    );

    return (
        <Span>
            <FlatList
                style={styles.tableContainer}
                removeClippedSubviews={true}
                data={animals}
                indicatorStyle="white"
                keyExtractor={keyExtractor}
                extraData={[selectedIDs.length]}
                renderItem={renderItem}
                onEndReachedThreshold={0.25}
                maxToRenderPerBatch={10}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmptyList}
                scrollEnabled={false}
                testID="animal-table"
            />
        </Span>
    );
};

const styles = StyleSheet.create({
    tableContainer: {
        width: Dimensions.get("screen").width - 16,
        borderRadius: 8,
        overflow: "hidden",
        ...commonStyles.border,
    },
});
