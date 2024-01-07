import { Stack } from "expo-router";
import { ContainerView } from "../../components/ContainerView";

import { Input } from "../../components/Input";
import {} from "react-native-paper";
import { Select } from "../../components/Select";
import { Span } from "../../components/Span";
import { DatePicker } from "../../components/DatePicker";
import { Button } from "../../components/Button";

export default function AddAnimalScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />
			<Span>
				<Input label="Nome*" />
			</Span>
			<Span>
				<DatePicker
					inputMode="start"
					locale="pt"
					saveLabel="Salvar"
					onChange={() => {}}
					value={new Date()}
					label="Date de nascimento"
				/>
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
				label="Paternidade"
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
			<Span justifyContent="flex-end">
				<Button type="light" title="Cancelar" />
				<Button title="Salvar" />
			</Span>
		</ContainerView>
	);
}
