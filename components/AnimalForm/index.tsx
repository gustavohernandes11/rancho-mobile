import { Button } from "components/Button";
import { DatePicker } from "components/DatePicker";
import { Input } from "components/Input";
import { Select } from "components/Select";
import { Span } from "components/Span";
import { StorageService } from "database/StorageService";
import { router, useNavigation } from "expo-router";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { Animal } from "types";
import {
	filterPossibleMaternity,
	filterPossiblePaternity,
} from "utils/filters";
import { getFormattedGender } from "utils/formatters";
import { getFieldError } from "utils/forms";
import { serializeAnimals, serializeBatches } from "utils/serializers";
import { defaultValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";
import { useGlobalState } from "hooks/useGlobalState";

interface AnimalFormProps {
	initialValues?: Animal;
}
export const AnimalForm: React.FC<AnimalFormProps> = ({
	initialValues = defaultValues,
}) => {
	const navigation = useNavigation();
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			initialValues.id
				? StorageService.updateAnimal(values)
						.then(() => {
							refreshAnimals();
							refreshBatches();
							formik.resetForm();
							router.back();
						})
						.catch((error) => Alert.alert("Error", error))
				: StorageService.insertAnimal(values)
						.then(() => {
							refreshAnimals();
							refreshBatches();
							formik.resetForm();
							router.back();
						})
						.catch((error) => Alert.alert("Error", error));
		},
		validationSchema,
	});
	const { animals, batches, refreshAnimals, refreshBatches } =
		useGlobalState();

	useEffect(() => {
		refreshAnimals();
		refreshBatches();
	}, []);

	useEffect(() => {
		const cleanup = navigation.addListener("beforeRemove", (e: any) => {
			if (!formik.dirty || formik.isSubmitting) {
				return;
			}

			e.preventDefault();
			Alert.alert(
				"Sair da página?",
				"É possível perder informações não salvas.",
				[
					{
						text: "Cancelar",
						style: "cancel",
						onPress: () => {},
					},
					{
						text: "Descartar",
						style: "destructive",
						onPress: () => navigation.dispatch(e.data.action),
					},
				]
			);
		});

		return cleanup;
	}, [navigation, formik.dirty, formik.isSubmitting]);

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
							filterPossiblePaternity(
								animals!,
								formik.values.birthdate
							)
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
							filterPossibleMaternity(
								animals!,
								formik.values.birthdate
							)
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
