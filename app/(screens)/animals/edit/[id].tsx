import { AnimalForm } from "components/AnimalForm";
import { ContainerView } from "components/ContainerView";
import { StorageService } from "database/StorageService";
import { Stack, useLocalSearchParams } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Animal } from "types/Animal";

export default function EditAnimalScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [animal, setAnimal] = useState<Animal>();

	useLayoutEffect(() => {
		const fetchData = async () => {
			const animal = await StorageService.loadAnimal(Number(id));
			setAnimal(animal);
		};
		fetchData();
	}, []);

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: `Editando animal "${animal?.name || ""}"`,
				}}
			/>
			{animal && <AnimalForm initialValues={animal} />}
		</ContainerView>
	);
}
