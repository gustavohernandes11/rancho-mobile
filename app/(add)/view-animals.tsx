import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";

import { AnimalTable } from "../../components/AnimalTable";

export default function ViewAnimalsScreen() {
	return (
		<ContainerView>
			<Heading>Rebanho</Heading>
			<AnimalTable animals={[]} />
		</ContainerView>
	);
}
