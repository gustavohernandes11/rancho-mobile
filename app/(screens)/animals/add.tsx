import { Stack } from "expo-router";
import { ContainerView } from "../../../components/ContainerView";
import { AnimalForm } from "../../../components/AnimalForm";
import { mockedAnimals } from "../../../database/mockedRepository/mockedAnimals";

export default function AddAnimalScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />
			<AnimalForm initialValues={mockedAnimals[0]} />
		</ContainerView>
	);
}
