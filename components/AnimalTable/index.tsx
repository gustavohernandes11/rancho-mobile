import React, { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { createStorageService } from "../../database/createStorageServiceFactory";
import { Animal } from "../../types/Animal";
import { Batch } from "../../types/Batch";
import { AnimalRow } from "./AnimalRow";
import { SelectedHeader } from "./SelectedHeader";

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
					<DataTable.Title>Nome</DataTable.Title>
					<DataTable.Title>Lote</DataTable.Title>
					<DataTable.Title>Idade</DataTable.Title>
					{isEditMode && (
						<DataTable.Title>Selecionado?</DataTable.Title>
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
