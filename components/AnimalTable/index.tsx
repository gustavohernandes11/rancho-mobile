import { FlashList } from "@shopify/flash-list";
import { Span } from "components/Span";
import {
    ControlledAnimalTableProps,
    useAnimalTable,
} from "hooks/useAnimalTable";
import { useClearSelectionOnHardwareBack } from "hooks/useClearSelectionOnHardwareBack";
import { useGlobalState } from "hooks/useGlobalState";
import React, { useCallback } from "react";
import { Dimensions, Text, View } from "react-native";
import { Storage } from "services/StorageService";
import { commonStyles } from "styles/Common";
import { Animal } from "types";
import { showToast } from "utils/showToast";
import { Header } from "./Header";
import { Row } from "./Row";
import { SelectionMenu } from "./SelectionMenu";
import { confirmWriteOffByDeath } from "./confirmWriteOffByDeath";
import { confirmwriteOffBySale } from "./confirmwriteOffBySale";

type AnimalTableProps = {
    animals: Animal[];
    onlySelectionMode?: boolean;
    liftedController?: ControlledAnimalTableProps | null;
};

export const AnimalTable: React.FC<AnimalTableProps> = ({
    animals,
    onlySelectionMode = false,
    // an optional controller for the table, when it is needed to control it one level up
    liftedController = null,
}) => {
    const { refreshAll } = useGlobalState();
    const localController = useAnimalTable();
    const controller = liftedController || localController;

    useClearSelectionOnHardwareBack({ controller });

    const handleCheck = (id: number) => {
        if (!controller.isSelectionMode || !!controller.selectedIDs) {
            controller.toggleCheckID(id);
            controller.setIsSelectionMode(() => true);
        } else {
            controller.toggleCheckID(id);
        }
    };

    const handleSelectAll = () => {
        controller.setSelectedIDs(animals.map(al => al.id));
    };

    const handleWriteOffByDeath = () => {
        confirmWriteOffByDeath(controller.selectedIDs, () =>
            onSucess("Animais atualizados.")
        );
    };

    const handlewriteOffBySale = () => {
        confirmwriteOffBySale(controller.selectedIDs, () =>
            onSucess("Animais atualizados.")
        );
    };

    const handleDeleteMany = () => {
        Storage.deleteAnimal(controller.selectedIDs).then(() =>
            onSucess("Animais removidos com sucesso.")
        );
    };

    const onSucess = (message: string) => {
        refreshAll();
        controller.clearSelection();
        showToast(message);
    };

    const keyExtractor = useCallback((item: Animal) => item.id.toString(), []);
    const renderItem = ({ item }: { item: Animal }) => (
        <Row
            isChecked={controller.selectedIDs.includes(item.id)}
            onCheck={() => handleCheck(item.id)}
            animal={item}
        />
    );

    const renderEmptyList = useCallback(
        () => (
            <Span justify="center">
                <Text style={{ padding: 16 }}>Nenhum animal encontrado.</Text>
            </Span>
        ),
        [animals]
    );

    return (
        <>
            {controller.isSelectionMode && !onlySelectionMode && (
                <Span>
                    <SelectionMenu
                        onWriteOffByDeath={handleWriteOffByDeath}
                        onwriteOffBySale={handlewriteOffBySale}
                        showActions={true}
                        showCloseButton={true}
                        onClearSelection={controller.clearSelection}
                        onSelectAll={handleSelectAll}
                        selectedIDs={controller.selectedIDs}
                        onDeleteMany={handleDeleteMany}
                    />
                </Span>
            )}
            <View
                style={[
                    {
                        minHeight: 20,
                        width: Dimensions.get("screen").width - 16,
                        borderRadius: 8,
                        overflow: "hidden",
                    },
                    commonStyles.border,
                ]}
            >
                <FlashList
                    removeClippedSubviews={true}
                    data={animals}
                    indicatorStyle="white"
                    keyExtractor={keyExtractor}
                    extraData={[
                        controller.selectedIDs,
                        controller.isSelectionMode,
                    ]}
                    renderItem={renderItem}
                    estimatedItemSize={50}
                    ListHeaderComponent={Header}
                    ListEmptyComponent={renderEmptyList}
                    testID="animal-table"
                />
            </View>
        </>
    );
};
