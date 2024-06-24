import { Button } from "components/Button";
import { Input } from "components/Input";
import { Span } from "components/Span";
import { FormikHelpers, useFormik } from "formik";
import React, { useEffect } from "react";
import {
	Alert,
	NativeSyntheticEvent,
	TextInputSubmitEditingEventData,
} from "react-native";
import { Storage } from "services/StorageService";
import { DayProduction } from "types/Production";
import { showToast } from "utils/displayToast";
import { getFieldError } from "utils/forms";
import { initialValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

interface ProductionFormProps {
	onSubmitCallback: Function;
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
}

const handleSubmit = async (
	production: DayProduction,
	formikHelpers: FormikHelpers<{
		quantity: number;
	}>,
	onSubmitCallback: Function
) => {
	Storage.upsertDayProduction(production)
		.then(() => {
			showToast("Produção inserida com sucesso.");
			formikHelpers.resetForm();
			onSubmitCallback();
		})
		.catch(() => {
			Alert.alert("Erro!", "Ocorreu um erro ao salvar a produção.");
		});
};

export const ProductionForm: React.FC<ProductionFormProps> = ({
	selectedDate,
	onSubmitCallback,
}) => {
	const formik = useFormik({
		initialValues,
		onSubmit: (values, formikHelpers) =>
			handleSubmit(
				{
					day: selectedDate.toISOString(),
					quantity: values.quantity,
				},
				formikHelpers,
				onSubmitCallback
			),
		validationSchema,
	});

	useEffect(() => {
		Storage.getDayProduction(selectedDate).then((production) => {
			formik.setFieldValue("quantity", production?.quantity || 0);
		});
	}, [selectedDate]);

	const handleChangeText = (text: string) => {
		formik.setFieldValue("quantity", Number(text));
	};

	const handleSubmitEditing = (
		e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
	) => {
		handleChangeText(e.nativeEvent.text);
		formik.submitForm();
	};

	return (
		<Span direction="column">
			<Input
				label="Litros de leite produzidos"
				keyboardType="numeric"
				value={formik.values.quantity.toString()}
				onChangeText={handleChangeText}
				errorText={getFieldError("quantity", formik)}
				returnKeyType="done"
				onSubmitEditing={handleSubmitEditing}
			/>
			<Span direction="row" justify="flex-end">
				<Button
					onPress={formik.isSubmitting ? () => {} : formik.submitForm}
					title="Salvar"
				/>
			</Span>
		</Span>
	);
};
