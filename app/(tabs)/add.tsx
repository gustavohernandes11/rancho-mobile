import { Link } from "expo-router";
import { Button } from "../../components/Button";
import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";
import { Span } from "../../components/Span";

export default function TabAddAnimalsScreen() {
	return (
		<ContainerView>
			<Heading>Adicionar</Heading>
			<Span>
				<Link href="/add-animal" asChild>
					<Button type="danger" title="Adicionar animal" />
				</Link>
				<Link href="/add-batch" asChild>
					<Button type="light" title="Adicionar lote" />
				</Link>
				<Link href="/add-batch" asChild>
					<Button type="primary" title="Adicionar lote" />
				</Link>
			</Span>
		</ContainerView>
	);
}
