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
import { StorageService } from "services/StorageService";
import { sharedStyles } from "styles/shared";
import { Animal } from "types";
import { showToast } from "utils/displayToast";
import { Header } from "./Header";
import { Row } from "./Row";
import { SelectionBanner } from "./SelectionBanner";

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
		controller.toggleCheckID(id);
	};

	const handleLongPress = (id: number) => {
		if (!controller.isSelectionMode) {
			controller.setIsSelectionMode(true);
			controller.toggleCheckID(id);
		}
	};

	const handleSelectAll = () => {
		controller.setSelectedIDs(animals.map((al) => al.id));
	};

	const handleDeleteMany = () => {
		StorageService.deleteManyAnimals(controller.selectedIDs).then(() => {
			refreshAll();
			controller.clearSelection();
			showToast("Animais removidos com sucesso.");
		});
	};

	const keyExtractor = useCallback((item: Animal) => item.id.toString(), []);
	const renderItem = ({ item }: { item: Animal }) => (
		<Row
			isChecked={controller.selectedIDs.includes(item.id)}
			onCheck={() => handleCheck(item.id)}
			onLongPress={() => handleLongPress(item.id)}
			showCheckbox={
				onlySelectionMode || (controller.isSelectionMode ?? false)
			}
			animal={item}
		/>
	);

	const renderHeader = useCallback(
		() => (
			<Header
				leaveSpaceAtRight={
					onlySelectionMode || !!controller.isSelectionMode
				}
			/>
		),
		[]
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
			{controller.isSelectionMode && (
				<Span>
					<SelectionBanner
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
					},
					sharedStyles.border,
				]}
			>
				<FlashList
					removeClippedSubviews={true}
					data={animals}
					keyExtractor={keyExtractor}
					extraData={[
						controller.selectedIDs,
						controller.isSelectionMode,
					]}
					renderItem={renderItem}
					estimatedItemSize={50}
					ListHeaderComponent={renderHeader}
					ListEmptyComponent={renderEmptyList}
					testID="animal-table"
				/>
			</View>
		</>
	);
};
