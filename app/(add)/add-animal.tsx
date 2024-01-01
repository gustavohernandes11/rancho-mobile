import { Text } from "react-native";
import { Stack } from "expo-router";
import { ContainerView } from "../../components/ContainerView";

export default function AddAnimalScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />
			<Text>Adicionar animal</Text>
		</ContainerView>
	);
}
