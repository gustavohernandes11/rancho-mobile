import React from "react";
import { Animal } from "../types/Animal";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { getRowColor } from "../utils/getRowColor";
import { RowProps } from "../types/RowProps";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton } from "./IconButton";
import Fonts from "../constants/Fonts";

interface AnimalTableProps {
	animals: Animal[];
}

export const AnimalTable: React.FC<AnimalTableProps> = ({ animals }) => (
	<ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
		<FlatList
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
			<View style={styles.buttonSpan}>
				<IconButton type="danger" icon="trash" />
				<IconButton icon="expand" />
			</View>
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
		marginVertical: 8,
		overflowX: "scroll",
		borderWidth: 1,
		borderColor: Colors.border,
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
	buttonSpan: {
		gap: 8,
		flexWrap: "nowrap",
		flexDirection: "row",
	},
	header: {
		backgroundColor: Colors.gray,
		flexDirection: "row",
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
	},
	bodyText: {
		color: Colors.darkGray,
		fontFamily: Fonts.primaryFamily,
	},
});
