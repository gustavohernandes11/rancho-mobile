import { Stack } from "expo-router";
import { ContainerView } from "../../components/ContainerView";

import { Input } from "../../components/Input";
import {} from "react-native-paper";
import { Span } from "../../components/Span";
import { Button } from "../../components/Button";

export default function AddBatchScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar um lote" }} />
			<Span>
				<Input label="Nome*" />
			</Span>
			<Span>
				<Input label="Descrição" multiline={true} />
			</Span>
			<Span justifyContent="flex-end">
				<Button type="light" title="Cancelar" />
				<Button title="Salvar" />
			</Span>
		</ContainerView>
	);
}
