import Colors from "constants/Colors";
import { Link } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import React, { memo, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Checkbox, DataTable, TouchableRipple } from "react-native-paper";
import { Animal } from "types/Animal";
import { getFormattedAge, getGenderIcon } from "utils/formatters";
import { Cell } from "./Cell";

interface RowProps {
	animal: Animal;
	showCheckbox: boolean;
	onCheck: () => void;
	onLongPress: () => void;
	isChecked: boolean;
}

const isEqual = (prevProps: RowProps, nextProps: RowProps) => {
	return (
		prevProps.showCheckbox === nextProps.showCheckbox &&
		prevProps.isChecked === nextProps.isChecked &&
		prevProps.animal === nextProps.animal
	);
};

export const Row: React.FC<RowProps> = memo(
	({ animal, showCheckbox, isChecked = false, onCheck, onLongPress }) => {
		const { batches } = useGlobalState();
		const batch = batches.find((batch) => batch.id === animal.batchId);

		return (
			<Link
				href={{
					pathname: `/animals/${animal?.id}`,
					params: { id: animal?.id },
				}}
				key={animal.id}
				asChild
			>
				<TouchableRipple
					style={isChecked ? styles.checked : null}
					onLongPress={onLongPress}
				>
					<DataTable.Row>
						<Cell flex={4}>
							{getGenderIcon(animal.gender)}
							{" " + animal.name}
						</Cell>
						<Cell flex={4}>
							{animal.batchId && batch && batch.name}
						</Cell>
						<Cell flex={2}>
							{animal.birthdate &&
								getFormattedAge(animal.birthdate)}
						</Cell>
						{showCheckbox && (
							<Cell flex={1}>
								<Checkbox
									color={Colors.green}
									status={isChecked ? "checked" : "unchecked"}
									onPress={onCheck}
								/>
							</Cell>
						)}
					</DataTable.Row>
				</TouchableRipple>
			</Link>
		);
	},
	isEqual
);

const styles = StyleSheet.create({
	checked: {
		backgroundColor: Colors.gray,
	},
});
