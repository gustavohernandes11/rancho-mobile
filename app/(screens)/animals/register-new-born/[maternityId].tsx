import { AnimalForm } from "components/AnimalForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";
import moment from "moment";

export default function RegisterAnimalBornScreen() {
	const { maternityID } = useLocalSearchParams<{ maternityID: string }>();

	const StackScreen = () => (
		<Stack.Screen options={{ headerTitle: "Registrar nascimento" }} />
	);

	return (
		<ContainerView immediateContent={<StackScreen />}>
			<AnimalForm
				initialValues={{
					maternityID: Number(maternityID),
					birthdate: moment().toISOString(),
				}}
			/>
		</ContainerView>
	);
}
