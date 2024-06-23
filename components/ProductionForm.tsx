import { Button } from "components/Button";
import { DatePicker } from "components/DatePicker";
import { Input } from "components/Input";
import { Span } from "components/Span";
import moment from "moment";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Storage } from "services/StorageService";
import { showToast } from "utils/displayToast";

interface ProductionFormProps {
	initialQuantity: number;
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
}

const ProductionForm: React.FC<ProductionFormProps> = ({
	initialQuantity = 0,
	selectedDate,
	setSelectedDate,
}) => {
	const [quantity, setQuantity] = useState<number>(initialQuantity);

	const handleUpsertDayProduction = async () => {
		const production = {
			day: selectedDate.toISOString(),
			quantity,
		};

		try {
			await Storage.upsertDayProduction(production);
			showToast("Produção inserida com sucesso.");
		} catch (error) {
			Alert.alert("Erro!", "Ocorreu um erro ao salvar a produção.");
		}
	};

	return (
		<Span direction="column">
			<DatePicker
				label="Dia"
				inputMode="start"
				value={selectedDate}
				onChange={(date) => setSelectedDate(moment(date).toDate())}
			/>
			<Input
				label="Litros"
				keyboardType="numeric"
				value={quantity.toString()}
				onChangeText={(text) => setQuantity(Number(text))}
			/>
			<Span direction="row" justify="flex-end">
				<Button onPress={handleUpsertDayProduction} title="Salvar" />
			</Span>
		</Span>
	);
};

export default ProductionForm;
