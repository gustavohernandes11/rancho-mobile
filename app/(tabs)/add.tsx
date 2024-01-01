import { Link } from "expo-router";
import { Button } from "../../components/Button";
import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";

export default function TabAddAnimalsScreen() {
	return (
		<ContainerView>
			<Heading>Adicionar</Heading>
			<Link href="/add-animal" asChild>
				<Button type="danger" title="Adicionar animal" />
			</Link>
			<Link href="/add-batch" asChild>
				<Button type="light" title="Adicionar lote" />
			</Link>
			<Link href="/add-batch" asChild>
				<Button type="primary" title="Adicionar lote" />
			</Link>
		</ContainerView>
	);
}
