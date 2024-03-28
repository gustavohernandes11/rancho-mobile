import { Span } from "components/Span";
import { useFocusEffect } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import React, { useCallback, useEffect } from "react";
import { BackHandler, FlatList, SafeAreaView, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { Animal } from "types";
import { AnimalRow } from "./AnimalRow";
import { SelectionBanner } from "./SelectionBanner";

interface AnimalTableProps {
	animals: Animal[];
	onlySelectionMode?: boolean;
}
export const AnimalTable: React.FC<AnimalTableProps> = ({
	animals,
	onlySelectionMode = false,
}) => {
	const {
		isSelectionMode,
		clearSelection,
		setIsSelectionMode,
		toggleCheckID,
		refreshBatches,
		selectedIDs,
	} = useGlobalState();

	useEffect(() => {
		refreshBatches();
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			const backAction = () => {
				if (isSelectionMode) {
					clearSelection();
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
		}, [isSelectionMode])
	);
	const keyExtractor = useCallback((item: Animal) => item.id.toString(), []);
	const renderItem = ({ item }: { item: Animal }) => (
		<AnimalRow
			onCheck={() => {
				toggleCheckID(item.id);
			}}
			onLongPress={() => {
				if (!isSelectionMode) {
					setIsSelectionMode(true);
					toggleCheckID(item.id);
				}
			}}
			isChecked={selectedIDs.includes(item.id)}
			showCheckbox={onlySelectionMode || isSelectionMode}
			animal={item}
		/>
	);

	const renderHeader = useCallback(
		() => (
			<DataTable>
				<DataTable.Header>
					<DataTable.Title
						style={{ flex: 4 }}
						textStyle={sharedStyles.text}
					>
						Nome
					</DataTable.Title>
					<DataTable.Title
						style={{ flex: 4 }}
						textStyle={sharedStyles.text}
					>
						Lote
					</DataTable.Title>
					<DataTable.Title
						style={{ flex: 2 }}
						textStyle={sharedStyles.text}
					>
						Idade
					</DataTable.Title>
					{(isSelectionMode || onlySelectionMode) && (
						<DataTable.Title
							style={{ flex: 1 }}
							textStyle={[{ flexShrink: 1 }, sharedStyles.text]}
						>
							{" "}
						</DataTable.Title>
					)}
				</DataTable.Header>
			</DataTable>
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
		<SafeAreaView>
			<Span>
				<SelectionBanner
					active={isSelectionMode}
					showActions={true}
					showCloseButton={true}
				/>
			</Span>
			<FlatList
				removeClippedSubviews={true}
				data={animals}
				keyExtractor={keyExtractor}
				renderItem={renderItem as any}
				initialNumToRender={10}
				maxToRenderPerBatch={10}
				style={{ width: "100%" }}
				ListHeaderComponent={renderHeader}
				ListEmptyComponent={renderEmptyList}
				scrollEnabled={true}
			/>
		</SafeAreaView>
	);
};
