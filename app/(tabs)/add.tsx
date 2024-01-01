import { StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";
import { StyledButton } from "../../components/StyledButton";
import { Container } from "../../components/Container";

export default function TabAddAnimalsScreen() {
	return (
		<Container>
			<Text style={styles.title}>Adicionar</Text>
			<Link href="/add-animal" asChild>
				<StyledButton type="danger" title="Adicionar animal" />
			</Link>
			<Link href="/add-batch" asChild>
				<StyledButton type="light" title="Adicionar lote" />
			</Link>
			<Link href="/add-batch" asChild>
				<StyledButton type="primary" title="Adicionar lote" />
			</Link>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
