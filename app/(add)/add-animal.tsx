import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Text, View } from "../../components/Themed";

export default function AddAnimalScreen() {
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />

			<Text style={styles.title}>Adicionar animal</Text>
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
