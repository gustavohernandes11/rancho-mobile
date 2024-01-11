import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { DataTable } from "react-native-paper";
import { createStorageService } from "../../database/createStorageServiceFactory";
import { Animal } from "../../types/Animal";
import { Batch } from "../../types/Batch";
import { AnimalRow } from "./AnimalRow";
import { SelectedHeader } from "./SelectedHeader";
import { useFocusEffect } from "expo-router";
import { sharedStyles } from "../../styles/shared";

interface AnimalTableProps {
	animals: Animal[];
}
const storageService = createStorageService();
export const AnimalTable: React.FC<AnimalTableProps> = ({ animals }) => {
	const [batches, setBatches] = useState<Batch[]>();
	const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
	const [isEditMode, setIsEditMode] = useState<boolean>();

	useEffect(() => {
		const fetchData = async () => {
			const batches = await storageService.listAllBatchesInfo();
			setBatches(batches);
		};
		fetchData();
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			const backAction = () => {
				if (isEditMode) {
					setIsEditMode(false);
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
		}, [isEditMode, selectedIDs])
	);

	return (
		<>
			{isEditMode && (
				<SelectedHeader
					setIsEditMode={setIsEditMode}
					count={selectedIDs.length}
					selectedIDs={selectedIDs}
					setSelectedIDs={setSelectedIDs}
				/>
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
					{isEditMode && (
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
						isSelected={
							(selectedIDs && selectedIDs.includes(animal.id)) ||
							false
						}
						isEditMode={isEditMode}
						setIsEditMode={setIsEditMode}
						setSelectedIDs={setSelectedIDs}
					/>
				))}
			</DataTable>
		</>
	);
};
