import { StorageService } from "database/StorageService";
import { useFocusEffect } from "expo-router";
import { useSelectionMode } from "hooks/useSelectionMode";
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { DataTable } from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { Animal } from "types/Animal";
import { Batch } from "types/Batch";
import { AnimalRow } from "./AnimalRow";
import { SelectionBanner } from "./SelectionBanner";
import { Span } from "components/Span";

interface AnimalTableProps {
	animals: Animal[];
}
export const AnimalTable: React.FC<AnimalTableProps> = ({ animals }) => {
	const [batches, setBatches] = useState<Batch[]>();
	const { isSelectionMode, setIsSelectionMode, selectedIDs, setSelectedIDs } =
		useSelectionMode();

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
					setIsSelectionMode(false);
					setSelectedIDs([]);
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
			{isSelectionMode && (
				<Span>
					<SelectionBanner />
				</Span>
			)}
			<DataTable>
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
					{isSelectionMode && (
						<DataTable.Title
							style={{ flex: 1 / 3 }}
							textStyle={[{ flexShrink: 1 }, sharedStyles.text]}
						>
							{" "}
						</DataTable.Title>
					)}
				</DataTable.Header>

				{animals.map((animal) => (
					<AnimalRow
						animal={animal}
						batch={batches?.find((b) => b.id === animal.batchId)}
						key={animal.id}
					/>
				))}
			</DataTable>
		</>
	);
};
