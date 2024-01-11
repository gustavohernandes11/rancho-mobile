import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { AnimalForm } from "../../../../components/AnimalForm";
import { ContainerView } from "../../../../components/ContainerView";
import { Animal } from "../../../../types/Animal";
import { StorageService } from "../../../../database/StorageService";

export default function EditAnimalScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [animal, setAnimal] = useState<Animal>();

	useEffect(() => {
		const fetchData = async () => {
			const animal = await StorageService.loadAnimal(id);
			setAnimal(animal);
		};
		fetchData();
	}, []);
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Editar animal" }} />
			{animal && <AnimalForm initialValues={animal} />}
		</ContainerView>
	);
}
