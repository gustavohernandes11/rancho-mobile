import React from "react";
import { Input } from "../Input";
import { Span } from "../Span";
import { Button } from "../Button";
import { FormikValues, useFormik } from "formik";
import { Batch } from "../../types/Batch";
import { defaultValues } from "./defaultValues";
import { View } from "react-native";
import { validationSchema } from "./validation.schema";
import { createStorageService } from "../../database/createStorageServiceFactory";

const getFieldError = (field: string, formik: FormikValues) =>
	formik.touched[field] && formik.errors[field] ? formik.errors[field] : "";

interface BatchFormProps {
	initialValues?: Batch;
}
export const BatchForm: React.FC<BatchFormProps> = ({
	initialValues = defaultValues,
}) => {
	const storageService = createStorageService();
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			initialValues.id
				? storageService.updateBatch(values)
				: storageService.insertBatch(values);
		},
		validationSchema,
	});

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
