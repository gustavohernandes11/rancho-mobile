import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { Loading } from "components/Loading";
import { Span } from "components/Span";
import { router, useNavigation } from "expo-router";
import { useFormik } from "formik";
import { useAlertUnsavedChanges } from "hooks/useAlertUnsavedChanges";
import { useAnimalTable } from "hooks/useAnimalTable";
import { useGlobalState } from "hooks/useGlobalState";
import React, { useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { List } from "react-native-paper";
import { StorageService } from "services/StorageService";
import { sharedStyles } from "styles/shared";
import { AddBatch, Batch, UpdateBatch } from "types/Batch";
import { showToast } from "utils/displayToast";
import { getFieldError } from "utils/forms";
import { defaultValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

interface BatchFormProps {
	initialValues?: Batch;
}

export const BatchForm: React.FC<BatchFormProps> = ({
	initialValues = defaultValues,
}) => {
	const table = useAnimalTable();
	const { animals, refreshAll } = useGlobalState();
	const navigation = useNavigation();
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => handleSubmit(values, !initialValues.id),
		validationSchema,
	});

	useAlertUnsavedChanges({
		formik,
	});

	useEffect(() => {
		if (initialValues.id) {
			StorageService.listAnimals({
				batchId: initialValues.id,
			}).then((batchAnimals) => {
				table.setSelectedIDs(batchAnimals.map((a) => a.id));
			});
		}
	}, [initialValues.id]);

	const handleSubmit = (
		values: AddBatch & UpdateBatch,
		isNewBatch: boolean
	) => {
		isNewBatch
			? StorageService.insertBatch(values)
					.then((insertedId) =>
						StorageService.moveAnimalsToBatch(
							table.selectedIDs,
							insertedId || null
						)
					)
					.then(() => {
						refreshAll();
						table.clearSelection();
						formik.resetForm();
						showToast("Lote " + values.name + " foi adicionado.");
					})
					.then(() => router.replace("/(tabs)/batches"))

					.catch((error) => Alert.alert("Error", error))
			: StorageService.updateBatch(values)
					.then((batch: Batch) => {
						let promises: Promise<boolean>[] = [];

						animals.forEach(async (animal) => {
							const isSelected = table.selectedIDs.includes(
								animal.id
							);
							const isSameBatch = animal.batchId === batch.id;

							if (isSameBatch && !isSelected) {
								promises.push(
									StorageService.moveAnimalToBatch(
										animal.id,
										null
									)
								);
							} else if (!isSameBatch && isSelected) {
								promises.push(
									StorageService.moveAnimalToBatch(
										animal.id,
										batch.id
									)
								);
							}
						});
						return Promise.all(promises);
					})
					.then(() => {
						refreshAll();
						table.clearSelection();
						formik.resetForm();
						showToast("Lote " + values.name + " foi atualizado.");
					})
					.then(() => router.back())
					.catch((error) => Alert.alert("Error", error));
	};

	return (
		<View>
			<Span>
				<Input
					label="Nome*"
					value={formik.values.name}
					onChangeText={(text) => formik.setFieldValue("name", text)}
					errorText={getFieldError("name", formik)}
				/>
			</Span>
			<Span>
				<Input
					label="Descrição"
					value={formik.values.description}
					onChangeText={(text) =>
						formik.setFieldValue("description", text)
					}
					errorText={getFieldError("description", formik)}
					multiline={true}
				/>
			</Span>
			<Span>
				<Text style={sharedStyles.label}>
					Selecione os animais (você pode fazer isso depois)
				</Text>
			</Span>
			<List.Accordion
				style={[sharedStyles.inputAspect, { padding: 0 }]}
				titleStyle={sharedStyles.text}
				title={`${table.selectedIDs.length} selecionado(s)`}
			>
				{animals ? (
					<AnimalTable
						onlySelectionMode={true}
						liftedController={table}
						animals={animals}
					/>
				) : (
					<Loading />
				)}
			</List.Accordion>
			<Span justify="flex-end" py={16}>
				<Button
					type="light"
					title="Cancelar"
					onPress={() => {
						navigation.goBack();
						table.clearSelection();
					}}
				/>
				<Button
					title="Salvar"
					onPress={formik.isSubmitting ? () => {} : formik.submitForm}
				/>
			</Span>
		</View>
	);
};
