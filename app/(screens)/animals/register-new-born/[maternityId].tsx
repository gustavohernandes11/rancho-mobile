import { AnimalForm } from "components/AnimalForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";
import moment from "moment";

export default function RegisterAnimalBornScreen() {
	const { maternityId } = useLocalSearchParams<{ maternityId: string }>();

	const StackScreen = () => (
		<Stack.Screen options={{ headerTitle: "Registrar nascimento" }} />
	);

	return (
		<ContainerView immediateContent={<StackScreen />}>
			<AnimalForm
				initialValues={{
					maternityId: Number(maternityId),
					birthdate: moment().toISOString(),
				}}
			/>
		</ContainerView>
	);
}
