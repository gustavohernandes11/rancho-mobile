import { Stack } from "expo-router";
import { AnimalForm } from "../../../components/AnimalForm";
import { ContainerView } from "../../../components/ContainerView";

export default function AddAnimalScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />
			<AnimalForm />
		</ContainerView>
	);
}
