import React, { useEffect, useState } from "react";
import { DatePicker } from "../DatePicker";
import { Input } from "../Input";
import { Select } from "../Select";
import { Span } from "../Span";
import { Button } from "../Button";
import { FormikValues, useFormik } from "formik";
import { AddAnimal, Animal } from "../../types/Animal";
import { defaultValues } from "./defaultValues";
import { Text, View } from "react-native";
import { validationSchema } from "./validation.schema";
import { createStorageService } from "../../database/createStorageServiceFactory";
import { Batch } from "../../types/Batch";
import { filterPossiblePaternity } from "./filterPossiblePaternity";
import { serializeBatchesToKeyValue } from "./serializeBatchesToKeyValue";
import { serializeAnimalsToKeyValue } from "./serializeAnimalsToKeyValue";
import { filterPossibleMaternity } from "./filterPossibleMaternity";

const getFieldError = (field: string, formik: FormikValues) =>
	formik.touched[field] && formik.errors[field] ? formik.errors[field] : "";

interface AnimalFormProps {
	initialValues?: AddAnimal;
}
export const AnimalForm: React.FC<AnimalFormProps> = ({
	initialValues = defaultValues,
}) => {
	const storageService = createStorageService();
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => storageService.insertAnimal(values),
		validationSchema,
	});
	const [batches, setBatches] = useState<Batch[]>();
	const [animals, setAnimals] = useState<Animal[]>();

	useEffect(() => {
		const fetchData = async () => {
			const batches = await storageService.listAllBatchesInfo();
			setBatches(batches);
			const animals = await storageService.listAnimals();
			setAnimals(animals);
		};
		fetchData();
	}, []);

	return (
		<View>
			<Text>{JSON.stringify(formik.values)}</Text>
			<Span>
				<Input
					label="Nome*"
					value={formik.values.name}
					onChangeText={(text) => formik.setFieldValue("name", text)}
					errorText={getFieldError("name", formik)}
				/>
			</Span>
			<Span>
				<DatePicker
					inputMode="start"
					locale="pt"
					saveLabel="Salvar"
					errorText={getFieldError("birthdate", formik)}
					onChange={(date) =>
						formik.setFieldValue("birthdate", date!.toISOString())
					}
					value={new Date(formik.values.birthdate as string)}
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
				<Select
					label="Gênero*"
					items={[
						{ key: "Fêmea", value: "F" },
						{ key: "Macho", value: "M" },
					]}
					defaultButtonText={formik.initialValues.gender}
					errorText={getFieldError("gender", formik)}
					onSelect={(option) =>
						formik.setFieldValue("gender", option.value)
					}
				/>
			</Span>
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
			<Span justifyContent="flex-end">
				<Button
					type="light"
					title="Cancelar"
					onPress={() => formik.resetForm()}
				/>
				<Button title="Salvar" onPress={() => formik.submitForm()} />
			</Span>
		</View>
	);
};
