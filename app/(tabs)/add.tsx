import { Button, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { Link } from "expo-router";

export default function TabAddAnimalsScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Adicionar</Text>
			<Link href="/add-animal" asChild>
				<Button color="green" title="Adicionar animal" />
			</Link>
			<Link href="/add-batch" asChild>
				<Button color="green" title="Adicionar lote" />
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
