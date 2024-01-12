import { Stack } from "expo-router";
import { ContainerView } from "components/ContainerView";
import { AnimalForm } from "components/AnimalForm";

export default function AddAnimalScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />
			<AnimalForm />
		</ContainerView>
	);
}
