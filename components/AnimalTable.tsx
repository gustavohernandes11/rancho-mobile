import React, { useEffect, useState } from "react";
import { Animal } from "../types/Animal";

import { DataTable, TouchableRipple } from "react-native-paper";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { getFormattedAge } from "../utils/getFormattedAge";
import { createStorageService } from "../database/createStorageServiceFactory";
import { Batch } from "../types/Batch";

interface AnimalTableProps {
	animals: Animal[];
}

export const AnimalTable: React.FC<AnimalTableProps> = ({ animals }) => {
	const storageService = createStorageService();
	const getGenderIcon = (gender: "F" | "M") =>
		gender === "M" ? (
			<FontAwesome color={Colors.blue} name="mars" />
		) : (
			<FontAwesome color={Colors.red} name="venus" />
		);

	const [batches, setBatches] = useState<Batch[]>();

	useEffect(() => {
		const fetchData = async () => {
			const batches = await storageService.listAllBatchesInfo();
			setBatches(batches);
		};
		fetchData();
	}, []);
	return (
		<DataTable>
			<DataTable.Header>
				<DataTable.Title>Nome</DataTable.Title>
				<DataTable.Title>Lote</DataTable.Title>
				<DataTable.Title>Idade</DataTable.Title>
			</DataTable.Header>

			{animals.map((animal) => (
				<Link
					key={animal.id}
					href={{
						pathname: `/animals/${animal?.id}`,
						params: { id: animal?.id },
					}}
					asChild
				>
					<TouchableRipple key={animal.id}>
						<DataTable.Row>
							<DataTable.Cell>
								{getGenderIcon(animal.gender)}
								{" " + animal.name}
							</DataTable.Cell>
							<DataTable.Cell>
								{animal.batchId &&
									batches?.find(
										(b) => b.id === animal.batchId
									)?.name}
							</DataTable.Cell>
							<DataTable.Cell>
								{animal.birthdate &&
									getFormattedAge(animal.birthdate)}
							</DataTable.Cell>
						</DataTable.Row>
					</TouchableRipple>
				</Link>
			))}
		</DataTable>
	);
};
