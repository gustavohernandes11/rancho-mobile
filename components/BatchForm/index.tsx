import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { Span } from "components/Span";
import { StorageService } from "database/StorageService";
import { mockedAnimals } from "database/MockedRepository/mockedAnimals";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useFormik } from "formik";
import { useSelectionMode } from "hooks/useSelectionMode";
import React, { useEffect } from "react";
import { Alert, BackHandler, Text, View } from "react-native";
import { List } from "react-native-paper";
import { sharedStyles } from "styles/shared";
import { AddBatch, Batch, UpdateBatch } from "types/Batch";
import { getFieldError } from "utils/getFieldError";
import { defaultValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

interface BatchFormProps {
	initialValues?: Batch;
}

export const BatchForm: React.FC<BatchFormProps> = ({
	initialValues = defaultValues,
}) => {
	const { selectedIDs, setSelectedIDs } = useSelectionMode();
	const navigation = useNavigation();
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => handleSubmit(values, !!initialValues.id),
		validationSchema,
	});

	useFocusEffect(
		React.useCallback(() => {
			const backAction = () => {
				setSelectedIDs([]);
				return false;
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove();
		}, [])
	);

	useEffect(() => {
		if (initialValues.id) {
			const fetchData = async () => {
				const animalsFromBatch = await StorageService.loadBatchAnimals(
					initialValues.id
				);
				setSelectedIDs(animalsFromBatch.map((a) => a.id));
			};
			fetchData();
		}
	}, [initialValues.id]);

	const handleSubmit = (
		values: AddBatch & UpdateBatch,
		isNewBatch: boolean
	) => {
		isNewBatch
			? StorageService.updateBatch(values, selectedIDs)
					.then(() => {
						setSelectedIDs([]);
						router.replace("/(screens)/batches/");
					})
					.catch((error) => Alert.alert("Error", error))
			: StorageService.insertBatch(values, selectedIDs)
					.then(() => {
						setSelectedIDs([]);
						router.replace("/(screens)/batches/");
					})

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
				title={`${selectedIDs.length} selecionado(s)`}
			>
				<AnimalTable
					scroll
					onlySelectionMode={true}
					animals={mockedAnimals}
				/>
			</List.Accordion>
			<Span justifyContent="flex-end" paddingVertical={16}>
				<Button
					type="light"
					title="Cancelar"
					onPress={() => {
						navigation.goBack();
						setSelectedIDs([]);
					}}
				/>
				<Button title="Salvar" onPress={formik.submitForm} />
			</Span>
		</View>
	);
};
