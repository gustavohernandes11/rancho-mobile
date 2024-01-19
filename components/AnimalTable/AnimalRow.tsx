import Colors from "constants/Colors";
import { Link } from "expo-router";
import { useData } from "hooks/useData";
import React from "react";
import { StyleSheet } from "react-native";
import { Checkbox, DataTable, TouchableRipple } from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { Animal } from "types/Animal";
import { getFormattedAge, getGenderIcon } from "utils/formatters";

interface AnimalRowProps {
	animal: Animal;
	showCheckbox?: boolean;
	isChecked: boolean;
	onCheck: () => void;
	onLongPress: () => void;
}

export const AnimalRow: React.FC<AnimalRowProps> = ({
	animal,
	showCheckbox,
	isChecked = false,
	onLongPress,
	onCheck,
}) => {
	const { batches } = useData();
	const batch = batches.find((b) => animal?.batchId === b.id);
	console.log("atualizou: " + animal.id);

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
				style={isChecked ? styles.checked : null}
				onLongPress={onLongPress}
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
					{showCheckbox && (
						<DataTable.Cell
							textStyle={sharedStyles.text}
							style={{ flex: 1 / 3 }}
						>
							<Checkbox
								color={Colors.green}
								status={isChecked ? "checked" : "unchecked"}
								onPress={onCheck}
							/>
						</DataTable.Cell>
					)}
				</DataTable.Row>
			</TouchableRipple>
		</Link>
	);
};

const styles = StyleSheet.create({
	checked: {
		backgroundColor: Colors.gray,
	},
});
