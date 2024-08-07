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
    const renderItem = ({ item }: { item: Animal }) => (
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
        <View style={styles.tableContainer}>
            <FlashList
                removeClippedSubviews={true}
                data={animals}
                indicatorStyle="white"
                keyExtractor={keyExtractor}
                extraData={[selectedIDs.length]}
                renderItem={renderItem}
                estimatedItemSize={50}
                estimatedListSize={{
                    width: Dimensions.get("screen").width - 16,
                    height: 500,
                }}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmptyList}
                testID="animal-table"
            />
        </View>
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
