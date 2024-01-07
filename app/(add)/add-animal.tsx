import { Stack } from "expo-router";
import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";
import DateTimePicker from "react-native-ui-datepicker";

import { Input } from "../../components/Input";
import {} from "react-native-paper";
import { Select } from "../../components/Select";
import { Span } from "../../components/Span";

export default function AddAnimalScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />
			<Heading size="small">Adicionar animal</Heading>
			<Span>
				<Input label="Name*" />
			</Span>
			<Select
				defaultButtonText="Selecione um lote"
				items={[]}
				onSelect={() => {}}
				label="Lote"
			/>
			<Span>
				<Input label="Código" keyboardType="numeric" />
				<Select
					label="Gênero"
					items={[
						{ key: "Fêmea", value: "F" },
						{ key: "Macho", value: "M" },
					]}
					onSelect={() => {}}
				/>
			</Span>
			<Select
				defaultButtonText="Selecione um animal"
				items={[]}
				onSelect={() => {}}
				label="Paternidadae"
			/>
			<Select
				defaultButtonText="Selecione um animal"
				items={[]}
				onSelect={() => {}}
				label="Maternidade"
			/>
			<Span>
				<Input label="Observação" multiline={true} />
			</Span>
			<DateTimePicker />
		</ContainerView>
	);
}
