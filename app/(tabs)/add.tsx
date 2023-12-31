import { StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";
import { StyledButton } from "../../components/StyledButton";

export default function TabAddAnimalsScreen() {
	return (
		<View style={styles.container}>
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
