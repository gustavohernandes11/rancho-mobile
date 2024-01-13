import { Button } from "components/Button";
import { DatePicker } from "components/DatePicker";
import { Input } from "components/Input";
import { Select } from "components/Select";
import { Span } from "components/Span";
import { StorageService } from "database/StorageService";
import { router, useNavigation } from "expo-router";
import { FormikValues, useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Animal } from "types/Animal";
import { Batch } from "types/Batch";
import { getFormattedGender } from "utils/getFormattedGender";
import { defaultValues } from "./defaultValues";
import { filterPossibleMaternity } from "./filterPossibleMaternity";
import { filterPossiblePaternity } from "./filterPossiblePaternity";
import { serializeAnimalsToKeyValue } from "./serializeAnimalsToKeyValue";
import { serializeBatchesToKeyValue } from "./serializeBatchesToKeyValue";
import { validationSchema } from "./validation.schema";

const getFieldError = (field: string, formik: FormikValues) =>
	formik.touched[field] && formik.errors[field] ? formik.errors[field] : "";

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
							Alert.alert("UPDATE");
							router.replace("/(screens)/animals/");
						})
						.catch((error) => Alert.alert("Error", error))
				: StorageService.insertAnimal(values)
						.then(() => {
							Alert.alert("INSERIDO");
							router.replace("/(screens)/animals/");
						})
						.catch((error) => Alert.alert("Error", error));
		},
		validationSchema,
	});
	const [batches, setBatches] = useState<Batch[]>();
	const [animals, setAnimals] = useState<Animal[]>();

	useEffect(() => {
		const fetchData = async () => {
			const batches = await StorageService.listAllBatchesInfo();
			setBatches(batches);
			const animals = await StorageService.listAnimals();
			setAnimals(animals);
		};
		fetchData();
	}, []);

	return (
		<View>
			<Span alignItems="flex-start">
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
						getFormattedGender(formik.values.gender) || ""
					}
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
				items={serializeBatchesToKeyValue(batches || [])}
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
					items={
						serializeAnimalsToKeyValue(
							filterPossiblePaternity(
								animals!,
								formik.values.birthdate
							)
						) || []
					}
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
					items={
						serializeAnimalsToKeyValue(
							filterPossibleMaternity(
								animals!,
								formik.values.birthdate
							)
						) || []
					}
					errorText={getFieldError("maternityId", formik)}
					defaultValue={formik.initialValues.maternityId}
					onSelect={(option) =>
						formik.setFieldValue("maternityId", option.value)
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
			<Span justifyContent="flex-end" paddingVertical={16}>
				<Button
					type="light"
					title="Cancelar"
					onPress={navigation.goBack}
				/>
				<Button title="Salvar" onPress={formik.submitForm} />
			</Span>
		</View>
	);
};
