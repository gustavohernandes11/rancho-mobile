import { StyleSheet, Text } from "react-native";

import { Link } from "expo-router";
import { StyledButton } from "../../components/StyledButton";
import { ContainerView } from "../../components/ContainerView";

export default function TabAddAnimalsScreen() {
	return (
		<ContainerView>
			<Text>Adicionar</Text>
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
