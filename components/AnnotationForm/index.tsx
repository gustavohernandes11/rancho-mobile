import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { DatePicker } from "components/DatePicker";
import { Input } from "components/Input";
import { ListAccordion } from "components/ListAccordion";
import { Loading } from "components/Loading";
import { Select } from "components/Select";
import { Span } from "components/Span";
import { useNavigation, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useAlertUnsavedChanges } from "hooks/useAlertUnsavedChanges";
import { useAnimalTable } from "hooks/useAnimalTable";
import { useGlobalState } from "hooks/useGlobalState";
import moment from "moment";
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { Storage } from "services/StorageService";
import { Annotation } from "types/Annotation";
import { showToast } from "utils/displayToast";
import { formatAnnotationType } from "utils/formatters";
import { getFieldError } from "utils/forms";
import { annotationTypeItems } from "./annotationTypeItems";
import { defaultValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

interface AnnotationFormProps {
	initialValues?: Partial<Annotation>;
}
export const AnnotationForm: React.FC<AnnotationFormProps> = ({
	initialValues = defaultValues,
}) => {
	let mergedInitialValues: Annotation = Object.assign(
		{},
		defaultValues,
		initialValues
	);

	const router = useRouter();
	const table = useAnimalTable();
	const { animals, refreshAll } = useGlobalState();

	useEffect(() => {
		if (mergedInitialValues.animalIDs) {
			table.setSelectedIDs(mergedInitialValues.animalIDs);
		}
	}, []);

	const onSubmit = (values: Annotation) => {
		let annotation = { ...values };
		if (values.type !== "simple") {
			annotation.animalIDs = table.selectedIDs;
		}
		if (initialValues.id) {
			Storage.updateAnnotation(annotation)
				.then(() =>
					onSucess(`Anotação "${values.title}" foi atualizada`)
				)
				.catch(onError);
		} else {
			Storage.insertAnnotation(annotation)
				.then(() => onSucess("Anotado!"))
				.catch(onError);
		}
	};

	const formik = useFormik({
		initialValues: mergedInitialValues,
		onSubmit,
		validationSchema,
	});

	const navigation = useNavigation();

	useAlertUnsavedChanges({
		formik,
	});

	const onSucess = (message: string) => {
		formik.resetForm();
		showToast(message);
		router.back();
		refreshAll();
	};
	const onError = (error: Error) => Alert.alert("Erro!", error.message);

	const handleChangeDate = (date?: Date) => {
		if (moment.isDate(date))
			formik.setFieldValue("date", date!.toISOString());
		else formik.setFieldValue("date", "");
	};

	const handleChangeDateText = (text?: string) => {
		if (text === "") {
			formik.setFieldValue("date", "");
		} else if (!moment.isDate(text)) {
			formik.setFieldError(
				"date",
				"Formato de data inválido. Use 'DD/MM/AAAA'"
			);
		}
	};

	return (
		<View>
			<Span>
				<Select
					label="Tipo de anotação"
					items={annotationTypeItems}
					defaultButtonText={
						initialValues.type
							? formatAnnotationType(initialValues.type)
							: "Simples"
					}
					defaultValue={initialValues.type}
					errorText={getFieldError("type", formik)}
					onSelect={(option) =>
						formik.setFieldValue("type", option.value)
					}
				/>
			</Span>
			<Span>
				<Input
					label="Título*"
					value={formik.values.title}
					onChangeText={(text) => formik.setFieldValue("title", text)}
					errorText={getFieldError("title", formik)}
				/>
			</Span>
			<Span>
				<Input
					label="Descrição"
					onChangeText={(text) =>
						formik.setFieldValue("description", text)
					}
					errorText={getFieldError("description", formik)}
					value={formik.values.description?.toString()}
					multiline={true}
				/>
			</Span>
			{formik.values.type === "heath care" && (
				<Span direction="row">
					<Input
						label="Nome do remédio/vacina"
						onChangeText={(cod) =>
							formik.setFieldValue("medicineName", cod)
						}
						value={formik.values.medicineName}
						errorText={getFieldError("medicineName", formik)}
					/>
					<Input
						label="Dosagem"
						onChangeText={(cod) =>
							formik.setFieldValue("dosage", cod)
						}
						value={formik.values.dosage}
						errorText={getFieldError("dosage", formik)}
					/>
				</Span>
			)}
			<Span>
				<DatePicker
					label="Data"
					inputMode="start"
					saveLabel="Salvar"
					errorText={getFieldError("date", formik)}
					onChange={handleChangeDate}
					onChangeText={handleChangeDateText}
					value={
						formik.values.date
							? new Date(formik.values.date)
							: undefined
					}
				/>
			</Span>
			{formik.values.type !== "simple" && (
				<Span>
					<ListAccordion
						label="Quais animais estão associados?"
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
					</ListAccordion>
				</Span>
			)}
			<Span justify="flex-end" py={16}>
				<Button
					type="light"
					title="Cancelar"
					onPress={navigation.goBack}
				/>
				<Button
					title="Salvar"
					onPress={formik.isSubmitting ? () => {} : formik.submitForm}
				/>
			</Span>
		</View>
	);
};
