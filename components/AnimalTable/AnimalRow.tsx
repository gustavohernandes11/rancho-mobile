import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Checkbox, DataTable, TouchableRipple } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useSelectionMode } from "../../hooks/useSelectionMode";
import { sharedStyles } from "../../styles/shared";
import { Animal } from "../../types/Animal";
import { Batch } from "../../types/Batch";
import { getFormattedAge, getGenderIcon } from "../../utils";

interface AnimalRowProps {
	animal: Animal;
	batch?: Batch;
}

export const AnimalRow: React.FC<AnimalRowProps> = ({ animal, batch }) => {
	const { isSelectionMode, setIsSelectionMode, selectedIDs, setSelectedIDs } =
		useSelectionMode();

	const isSelected = selectedIDs.includes(animal.id);

	const toggleSelected = () => {
		if (isSelected) {
			setSelectedIDs((prevIDs: string[]) =>
				prevIDs.filter((id) => id !== animal.id)
			);
		} else {
			setSelectedIDs((prevIDs: string[]) => [...prevIDs, animal.id]);
		}
	};

	return (
		<Link
			href={{
				pathname: `/animals/${animal?.id}`,
				params: { id: animal?.id },
			}}
			asChild
		>
			<TouchableRipple
				key={animal.id}
				style={isSelected ? styles.seleted : null}
				onLongPress={() => {
					setIsSelectionMode(true);
					setSelectedIDs((prevIDs: string[]) => [
						...prevIDs,
						animal.id,
					]);
				}}
			>
				<DataTable.Row>
					<DataTable.Cell textStyle={sharedStyles.text}>
						{getGenderIcon(animal.gender)}
						{" " + animal.name}
					</DataTable.Cell>
					<DataTable.Cell textStyle={sharedStyles.text}>
						{animal.batchId && batch && batch.name}
					</DataTable.Cell>
					<DataTable.Cell textStyle={sharedStyles.text}>
						{animal.birthdate && getFormattedAge(animal.birthdate)}
					</DataTable.Cell>
					{isSelectionMode && (
						<DataTable.Cell
							textStyle={sharedStyles.text}
							style={{ flex: 1 / 3 }}
						>
							<Checkbox
								color={Colors.green}
								status={isSelected ? "checked" : "unchecked"}
								onPress={toggleSelected}
							/>
						</DataTable.Cell>
					)}
				</DataTable.Row>
			</TouchableRipple>
		</Link>
	);
};

const styles = StyleSheet.create({
	seleted: {
		backgroundColor: Colors.gray,
	},
});
