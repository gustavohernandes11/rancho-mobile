import Colors from "constants/Colors";
import Fonts from "constants/Fonts";
import React from "react";
import { StyleSheet } from "react-native";
import { Searchbar, SearchbarProps } from "react-native-paper";

export const SearchBar: React.FC<SearchbarProps> = ({ ...props }) => {
	return (
		<Searchbar
			style={styles.searchbar}
			inputStyle={styles.input}
			iconColor={Colors.darkGray}
			placeholderTextColor={Colors.darkSurface}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	searchbar: {
		flex: 1,
		borderRadius: 4,
		backgroundColor: Colors.lightGray,
		borderColor: Colors.border,
		borderWidth: 1,
		fontFamily: Fonts.primaryFamily,
	},
	input: {
		fontFamily: Fonts.primaryFamily,
		color: Colors.darkGray,
		fontSize: 14,
		padding: 4,
		minHeight: "auto",
	},
});
