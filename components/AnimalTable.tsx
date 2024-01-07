import React from "react";
import { Animal } from "../types/Animal";

import { DataTable, TouchableRipple } from "react-native-paper";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface AnimalTableProps {
	animals: Animal[];
}

export const AnimalTable: React.FC<AnimalTableProps> = ({ animals }) => {
	const getGenderIcon = (gender: "F" | "M") =>
		gender === "M" ? (
			<FontAwesome color={Colors.red} name="mars" />
		) : (
			<FontAwesome color={Colors.blue} name="venus" />
		);
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
					href={("/view-animals/" + animal.id) as any}
					asChild
				>
					<TouchableRipple key={animal.id}>
						<DataTable.Row>
							<DataTable.Cell>
								{getGenderIcon(animal.gender)}
								{" " + animal.name}
							</DataTable.Cell>
							<DataTable.Cell>{animal.batchId}</DataTable.Cell>
							<DataTable.Cell>{animal.birthdate}</DataTable.Cell>
						</DataTable.Row>
					</TouchableRipple>
				</Link>
			))}
		</DataTable>
	);
};
