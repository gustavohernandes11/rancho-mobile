import { AnimalForm } from "components/AnimalForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Storage } from "services/StorageService";
import { Animal } from "types/Animal";

export default function EditAnimalScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [animal, setAnimal] = useState<Animal>();

	useLayoutEffect(() => {
		const fetchData = async () => {
			const animal = await Storage.getAnimal(Number(id));
			setAnimal(animal);
		};
		fetchData();
	}, []);

	const StackScreen = () => (
		<Stack.Screen
			options={{
				headerTitle: `Editando animal "${animal?.name || ""}"`,
			}}
		/>
	);

	return (
		<ContainerView immediateContent={<StackScreen />}>
			{animal && <AnimalForm initialValues={animal} />}
		</ContainerView>
	);
}
