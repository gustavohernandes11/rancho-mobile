import { Link } from "expo-router";
import { StyledButton } from "../../components/StyledButton";
import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";

export default function TabAddAnimalsScreen() {
	return (
		<ContainerView>
			<Heading>Adicionar</Heading>
			<Link href="/add-animal" asChild>
				<StyledButton type="danger" title="Adicionar animal" />
			</Link>
			<Link href="/add-batch" asChild>
				<StyledButton type="light" title="Adicionar lote" />
			</Link>
			<Link href="/add-batch" asChild>
				<StyledButton type="primary" title="Adicionar lote" />
			</Link>
		</ContainerView>
	);
}
