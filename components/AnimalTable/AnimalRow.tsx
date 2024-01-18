import Colors from "constants/Colors";
import { Link } from "expo-router";
import { useData } from "hooks/useData";
import { useSelectionMode } from "hooks/useSelectionMode";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Checkbox, DataTable, TouchableRipple } from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { Animal } from "types/Animal";
import { getGenderIcon, getFormattedAge } from "utils/formatters";

interface AnimalRowProps {
	animal: Animal;
	alwaysShowCheckbox?: boolean;
}

export const AnimalRow: React.FC<AnimalRowProps> = ({
	animal,
	alwaysShowCheckbox,
}) => {
	const { isSelectionMode, setIsSelectionMode, selectedIDs, setSelectedIDs } =
		useSelectionMode();
	const { batches } = useData();
	const isSelected = selectedIDs.includes(animal.id);
	const batch = batches.find((b) => animal?.batchId === b.id);

	const toggleSelected = useCallback(() => {
		setSelectedIDs((prevIDs) =>
			isSelected
				? prevIDs.filter((id) => id !== animal.id)
				: [...prevIDs, animal.id]
		);
	}, [animal.id, selectedIDs]);

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
					setSelectedIDs((prevIDs: number[]) => [
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
						{batch && batch.name}
					</DataTable.Cell>
					<DataTable.Cell textStyle={sharedStyles.text}>
						{animal.birthdate && getFormattedAge(animal.birthdate)}
					</DataTable.Cell>
					{(alwaysShowCheckbox || isSelectionMode) && (
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
