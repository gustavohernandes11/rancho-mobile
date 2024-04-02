import { FlashList } from "@shopify/flash-list";
import { Span } from "components/Span";
import { useFocusEffect } from "expo-router";
import {
	ControlledAnimalTableProps,
	useAnimalTable,
} from "hooks/useAnimalTable";
import { useGlobalState } from "hooks/useGlobalState";
import React, { useCallback, useEffect } from "react";
import { BackHandler, Dimensions, Text, View } from "react-native";
import { Animal } from "types";
import { Header } from "./Header";
import { SelectionBanner } from "./SelectionBanner";
import { Row } from "./Row";

type AnimalTableProps = {
	animals: Animal[];
	onlySelectionMode?: boolean;
	liftedController?: ControlledAnimalTableProps | null;
};

export const AnimalTable: React.FC<AnimalTableProps> = ({
	animals,
	onlySelectionMode = false,
	liftedController = null,
}) => {
	const { refreshBatches, refreshAnimals } = useGlobalState();
	const localController = useAnimalTable();
	const controller = liftedController || localController;

	useEffect(() => {
		console.log(JSON.stringify(controller, null, 2));
	}, [controller]);

	useEffect(() => {
		refreshBatches();
	}, []);

	useEffect(() => {
		refreshBatches();
	}, []);

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
	const handleDeleteManyFromState = () => {
		refreshAnimals();
		controller.clearSelection();
	};

	useFocusEffect(
		React.useCallback(() => {
			const backAction = () => {
				if (controller.isSelectionMode) {
					controller.clearSelection();
					return true;
				} else {
					return false;
				}
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove();
		}, [controller.isSelectionMode, controller.selectedIDs])
	);

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
				<Text>Nenhum animal encontrado.</Text>
			</Span>
		),
		[animals]
	);

	return (
		<>
			<Span>
				<SelectionBanner
					active={!!controller.isSelectionMode}
					showActions={true}
					showCloseButton={true}
					onClearSelection={controller.clearSelection}
					onSelectAll={handleSelectAll}
					selectedIDs={controller.selectedIDs}
					onDeleteMany={handleDeleteManyFromState}
				/>
			</Span>
			<View
				style={{
					minHeight: 300,
					width: Dimensions.get("screen").width,
				}}
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
				/>
			</View>
		</>
	);
};
