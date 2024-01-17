import { Span } from "components/Span";
import { StorageService } from "database/StorageService";
import { useFocusEffect } from "expo-router";
import { useSelectionMode } from "hooks/useSelectionMode";
import React, { useEffect, useState } from "react";
import { BackHandler, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { Animal } from "types/Animal";
import { Batch } from "types/Batch";
import { AnimalRow } from "./AnimalRow";
import { SelectionBanner } from "./SelectionBanner";

interface AnimalTableProps {
	animals: Animal[];
	onlySelectionMode?: boolean;
	scroll?: boolean;
}

export const AnimalTable: React.FC<AnimalTableProps> = ({
	animals,
	scroll,
	onlySelectionMode = false,
	...props
}) => {
	const [batches, setBatches] = useState<Batch[]>();
	const { isSelectionMode, clearSelection, selectedIDs } = useSelectionMode();

	useEffect(() => {
		const fetchData = async () => {
			const batches = await StorageService.listAllBatchesInfo();
			setBatches(batches);
		};
		fetchData();
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
							textStyle={[{ flexShrink: 1 }, sharedStyles.text]}
						>
							{" "}
						</DataTable.Title>
					)}
				</DataTable.Header>
				{animals && animals.length > 0 ? (
					animals.map((animal) => (
						<AnimalRow
							alwaysShowCheckbox={onlySelectionMode}
							animal={animal}
							batch={batches?.find(
								(b) => b.id === animal.batchId
							)}
							key={animal.id}
						/>
					))
				) : (
					<Span justifyContent="center">
						<Text>Nenhum animal encontrado.</Text>
					</Span>
				)}
			</DataTable>
		</>
	);
};
