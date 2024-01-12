import { router, useNavigation } from "expo-router";
import { FormikValues, useFormik } from "formik";
import React from "react";
import { Alert, View } from "react-native";
import { StorageService } from "../../database/StorageService";
import { Batch } from "../../types/Batch";
import { Button } from "../Button";
import { Input } from "../Input";
import { Span } from "../Span";
import { defaultValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

const getFieldError = (field: string, formik: FormikValues) =>
	formik.touched[field] && formik.errors[field] ? formik.errors[field] : "";

interface BatchFormProps {
	initialValues?: Batch;
}
export const BatchForm: React.FC<BatchFormProps> = ({
	initialValues = defaultValues,
}) => {
	const navigation = useNavigation();
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			initialValues.id
				? StorageService.updateBatch(values)
						.then(() => {
							router.replace("/(screens)/batches/");
						})
						.catch((error) => Alert.alert("Error", error))
				: StorageService.insertBatch(values)
						.then(() => {
							router.replace("/(screens)/batches/");
						})
						.catch((error) => Alert.alert("Error", error));
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
