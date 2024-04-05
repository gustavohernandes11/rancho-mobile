import { AnimalForm } from "components/AnimalForm";
import { ContainerView } from "components/ContainerView";
import { Stack } from "expo-router";

export default function AddAnimalScreen() {
	const StackScreen = () => (
		<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />
	);
	return (
		<ContainerView immediateContent={<StackScreen />}>
			<AnimalForm />
		</ContainerView>
	);
}
