import React from "react";
import { Animal } from "../types/Animal";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { getRowColor } from "../utils/getRowColor";
import { RowProps } from "../types/RowProps";
import { Button } from "./Button";
import { Span } from "./Span";
import { ScrollView } from "react-native-gesture-handler";

interface AnimalTableProps {
	animals: Animal[];
}

export const AnimalTable: React.FC<AnimalTableProps> = ({ animals }) => (
	<ScrollView showsVerticalScrollIndicator={true}>
		<FlatList
			style={styles.table}
			data={animals}
			ListHeaderComponent={Header}
			keyExtractor={(item: Animal) => item.id.toString()}
			renderItem={(props) => <Row {...props} />}
		/>
	</ScrollView>
);

const Row: React.FC<RowProps<Animal>> = ({ item, index }) => (
	<View style={[styles.row, { backgroundColor: getRowColor(index) }]}>
		<Text style={[styles.ceil, styles.bodyText]}>{item.name}</Text>
		<Text style={[styles.ceil, styles.bodyText]}>
			{item.gender === "F" ? "Fêmea" : "Macho"}
		</Text>
		<View style={[styles.ceil]}>
			<Span flexWrap="nowrap"></Span>
		</View>
	</View>
);
const Header: React.FC = () => {
	return (
		<View style={styles.header}>
			<Text style={styles.ceil}>Nome</Text>
			<Text style={styles.ceil}>Gênero</Text>
			<Text style={styles.ceil}>Ações</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		overflowX: "scroll",
	},
	table: {
		marginVertical: 8,
	},
	row: {
		flexDirection: "row",
	},
	ceil: {
		width: "33.33%",
		padding: 8,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	header: {
		backgroundColor: Colors.gray,
		flexDirection: "row",
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
	},

	bodyText: {
		color: Colors.darkGray,
	},
});
