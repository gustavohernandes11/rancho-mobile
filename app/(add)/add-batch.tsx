import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { Stack } from "expo-router";

export default function AddBatchScreen() {
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerTitle: "Adicionar lote" }} />

			<Text style={styles.title}>Adicionar lote</Text>
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
