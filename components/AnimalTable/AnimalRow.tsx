import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Checkbox, DataTable, TouchableRipple } from "react-native-paper";
import Colors from "../../constants/Colors";
import { Animal } from "../../types/Animal";
import { Batch } from "../../types/Batch";
import { getFormattedAge } from "../../utils/getFormattedAge";
import { getGenderIcon } from "../../utils/getGenderIcon";

interface AnimalRowProps {
	animal: Animal;
	batch?: Batch;
	isEditMode?: boolean;
	isSelected?: boolean;
	setIsEditMode: (editMode: boolean) => any;
	setSelectedIDs: Function;
}

export const AnimalRow: React.FC<AnimalRowProps> = ({
	animal,
	batch,
	setIsEditMode,
	setSelectedIDs,
	isSelected = false,
	isEditMode = false,
}) => {
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
					setIsEditMode && setIsEditMode(true);
					setSelectedIDs &&
						setSelectedIDs((prevIDs: string[]) => [
							...prevIDs,
							animal.id,
						]);
				}}
			>
				<DataTable.Row>
					<DataTable.Cell>
						{getGenderIcon(animal.gender)}
						{" " + animal.name}
					</DataTable.Cell>
					<DataTable.Cell>
						{animal.batchId && batch && batch.name}
					</DataTable.Cell>
					<DataTable.Cell>
						{animal.birthdate && getFormattedAge(animal.birthdate)}
					</DataTable.Cell>
					{isEditMode && (
						<DataTable.Cell style={{ flex: 1 / 3 }}>
							<Checkbox
								color={Colors.green}
								status={isSelected ? "checked" : "unchecked"}
								onPress={() => {
									setSelectedIDs((prevIDs: string[]) => [
										...prevIDs,
										animal.id,
									]);
								}}
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
	relative: {
		position: "relative",
		right: 10,
		top: 10,
	},
});
