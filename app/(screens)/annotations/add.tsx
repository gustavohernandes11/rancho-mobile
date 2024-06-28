import { AnnotationForm } from "components/AnnotationForm";
import { ContainerView } from "components/ContainerView";
import { Stack } from "expo-router";

export default function AddBatchScreen() {
	const StackScreen = () => (
		<Stack.Screen options={{ headerTitle: "Adicionar anotação" }} />
	);

	return (
		<ContainerView immediateContent={<StackScreen />}>
			<AnnotationForm />
		</ContainerView>
	);
}
