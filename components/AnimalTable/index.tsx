import { FlatList, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { Span } from "components/Span";
import { useFocusEffect } from "expo-router";
import { useData } from "hooks/useData";
import { useSelectionMode } from "hooks/useSelectionMode";
import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { Animal } from "types/Animal";
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
	const { isSelectionMode, clearSelection, selectedIDs } = useSelectionMode();

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
		<AnimalRow alwaysShowCheckbox={onlySelectionMode} animal={item} />
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
				stickyHeaderHiddenOnScroll={false}
				data={animals}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
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
