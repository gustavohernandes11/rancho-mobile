import { Span } from "components/Span";
import { useFocusEffect } from "expo-router";
import { useData } from "hooks/useData";
import { useSelectionMode } from "hooks/useSelectionMode";
import React, { useEffect } from "react";
import { BackHandler, FlatList, Text } from "react-native";
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
	...props
}) => {
	const { refreshBatches } = useData();
	const {
		isSelectionMode,
		clearSelection,
		selectedIDs,
		setSelectedIDs,
		setIsSelectionMode,
	} = useSelectionMode();

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
		}, [isSelectionMode, selectedIDs])
	);

	const renderItem = ({ item }: { item: Animal }) => (
		<AnimalRow
			onCheck={() => {
				setSelectedIDs((prevIDs) =>
					selectedIDs.includes(item.id)
						? prevIDs.filter((id) => id !== item.id)
						: [...prevIDs, item.id]
				);
			}}
			onLongPress={() => {
				if (!isSelectionMode) {
					setIsSelectionMode(true);
					setSelectedIDs((prevIDs: number[]) => [
						...prevIDs,
						item.id,
					]);
				}
			}}
			isChecked={selectedIDs.includes(item.id)}
			showCheckbox={onlySelectionMode || isSelectionMode}
			animal={item}
		/>
	);

	return (
		<>
			{(onlySelectionMode || isSelectionMode) && (
				<Span>
					<SelectionBanner
						showActions={!onlySelectionMode}
						showDeleteButton={!onlySelectionMode}
						allAnimalIDs={animals.map((a) => a.id)}
					/>
				</Span>
			)}

			<FlatList
				data={animals}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				initialNumToRender={10}
				maxToRenderPerBatch={10}
				ListHeaderComponent={() => (
					<DataTable {...props}>
						<DataTable.Header>
							<DataTable.Title textStyle={sharedStyles.text}>
								Nome
							</DataTable.Title>
							<DataTable.Title textStyle={sharedStyles.text}>
								Lote
							</DataTable.Title>
							<DataTable.Title textStyle={sharedStyles.text}>
								Idade
							</DataTable.Title>
							{(onlySelectionMode || isSelectionMode) && (
								<DataTable.Title
									style={{ flex: 1 / 3 }}
									textStyle={[
										{ flexShrink: 1 },
										sharedStyles.text,
									]}
								>
									{" "}
								</DataTable.Title>
							)}
						</DataTable.Header>
					</DataTable>
				)}
				ListEmptyComponent={() => (
					<Span justifyContent="center">
						<Text>Nenhum animal encontrado.</Text>
					</Span>
				)}
			/>
		</>
	);
};
