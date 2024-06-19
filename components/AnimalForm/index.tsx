import { Button } from "components/Button";
import { DatePicker } from "components/DatePicker";
import { Input } from "components/Input";
import { Select } from "components/Select";
import { Span } from "components/Span";
import { router, useNavigation } from "expo-router";
import { useFormik } from "formik";
import { useAlertUnsavedChanges } from "hooks/useAlertUnsavedChanges";
import { useGlobalState } from "hooks/useGlobalState";
import moment from "moment";
import React from "react";
import { Alert, View } from "react-native";
import { StorageService } from "services/StorageService";
import { Animal } from "types";
import { showToast } from "utils/displayToast";
import {
	filterPossibleMaternity,
	filterPossiblePaternity,
} from "utils/filters";
import { getFormattedGender } from "utils/formatters";
import { getFieldError } from "utils/forms";
import { serializeAnimals, serializeBatches } from "utils/serializers";
import { defaultValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

interface AnimalFormProps {
	initialValues?: Partial<Animal>;
}
export const AnimalForm: React.FC<AnimalFormProps> = ({
	initialValues = defaultValues,
}) => {
	let mergedInitialValues: Animal = Object.assign(
		{},
		defaultValues,
		initialValues
	);
	const onSubmit = (values: Animal) => {
		initialValues.id
			? StorageService.updateAnimal(values)
					.then(() => {
						refreshAll();
						formik.resetForm();
						router.back();
						showToast(
							values.name + " foi atualizado(a) com sucesso."
						);
					})
					.catch((error) => Alert.alert("Error", error))
			: StorageService.insertAnimal(values)
					.then(() => {
						refreshAll();
						formik.resetForm();
						router.back();
						showToast(values.name + " foi adicionado.");
					})
					.catch((error) => Alert.alert("Error", error));
	};

	const formik = useFormik({
		initialValues: mergedInitialValues,
		onSubmit,
		validationSchema,
	});
	const { animals, batches, refreshAll } = useGlobalState();
	const navigation = useNavigation();

	useAlertUnsavedChanges({
		formik,
	});

	return (
		<View>
			<Span align="flex-start">
				<Input
					label="Nome*"
					value={formik.values.name}
					onChangeText={(text) => formik.setFieldValue("name", text)}
					errorText={getFieldError("name", formik)}
				/>

				<Select
					label="Gênero*"
					items={[
						{ key: "♀ Fêmea", value: "F" },
						{ key: "♂ Macho", value: "M" },
					]}
					defaultButtonText={
						initialValues.gender
							? getFormattedGender(initialValues.gender)
							: "Escolha um gênero"
					}
					defaultValue={initialValues.gender}
					errorText={getFieldError("gender", formik)}
					onSelect={(option) =>
						formik.setFieldValue("gender", option.value)
					}
				/>
			</Span>
			<Span>
				<DatePicker
					inputMode="start"
					saveLabel="Salvar"
					errorText={getFieldError("birthdate", formik)}
					onChange={(date) => {
						if (moment.isDate(date))
							formik.setFieldValue(
								"birthdate",
								date!.toISOString()
							);
						else formik.setFieldValue("birthdate", "");
					}}
					onChangeText={(text) => {
						if (text === "") {
							formik.setFieldValue("birthdate", "");
						} else if (!moment.isDate(text)) {
							formik.setFieldError(
								"birthdate",
								"Formato de data inválido. Use 'DD/MM/AAAA'"
							);
						}
					}}
					value={
						formik.values.birthdate
							? new Date(formik.values.birthdate)
							: undefined
					}
					label="Date de nascimento"
				/>
			</Span>
			<Select
				items={[
					...serializeBatches(batches || []),
					{ key: "Selecione um lote", value: "" },
				]}
				defaultButtonText={
					batches?.find((b) => b.id === initialValues.batchId)
						?.name || "Selecione um lote"
				}
				errorText={getFieldError("batchId", formik)}
				onSelect={(option) =>
					formik.setFieldValue("batchId", option.value)
				}
				label="Lote"
			/>
			<Span>
				<Input
					label="Código"
					onChangeText={(cod) => formik.setFieldValue("code", cod)}
					value={formik.values.code?.toString()}
					errorText={getFieldError("code", formik)}
					keyboardType="numeric"
				/>
			</Span>
			<Span>
				<Select
					defaultButtonText={
						animals?.find((a) => a.id === initialValues.paternityId)
							?.name || "Selecione um animal"
					}
					items={[
						...serializeAnimals(
							filterPossiblePaternity(animals!, formik.values)
						),
						{ key: "Selecione um animal", value: "" },
					]}
					errorText={getFieldError("paternityId", formik)}
					onSelect={(option) =>
						formik.setFieldValue("paternityId", option.value)
					}
					label="Paternidade"
				/>
				<Select
					defaultButtonText={
						animals?.find((a) => a.id === initialValues.maternityId)
							?.name || "Selecione um animal"
					}
					items={[
						...(serializeAnimals(
							filterPossibleMaternity(animals!, formik.values)
						) || []),
						{ key: "Selecione um animal", value: "" },
					]}
					errorText={getFieldError("maternityId", formik)}
					defaultValue={formik.initialValues.maternityId?.toString()}
					onSelect={(option) =>
						formik.setFieldValue(
							"maternityId",
							Number(option.value)
						)
					}
					label="Maternidade"
				/>
			</Span>
			<Span>
				<Input
					label="Observação"
					onChangeText={(text) =>
						formik.setFieldValue("observation", text)
					}
					errorText={getFieldError("observation", formik)}
					value={formik.values.observation?.toString()}
					multiline={true}
				/>
			</Span>
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
