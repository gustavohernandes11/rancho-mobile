import { Stack } from "expo-router";
import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";

export default function AddAnimalScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />
			<Heading>Adicionar animal</Heading>
		</ContainerView>
	);
}
