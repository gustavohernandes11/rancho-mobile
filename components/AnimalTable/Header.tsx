import React from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import Colors from "styles/Colors";
import { sharedStyles } from "styles/Common";

export const Header = () => {
	return (
		<DataTable>
			<DataTable.Header style={styles.tableHeader}>
				<DataTable.Title
					style={{ flex: 4 }}
					textStyle={sharedStyles.text}
				>
					Nome
				</DataTable.Title>
				<DataTable.Title
					style={{ flex: 4 }}
					textStyle={sharedStyles.text}
				>
					Lote
				</DataTable.Title>
				<DataTable.Title
					style={{ flex: 2 }}
					textStyle={sharedStyles.text}
				>
					Idade
				</DataTable.Title>
				<DataTable.Title
					style={{ flex: 1, justifyContent: "center" }}
					textStyle={[{ flexShrink: 1 }, sharedStyles.text]}
				>
					{"✓"}
				</DataTable.Title>
			</DataTable.Header>
		</DataTable>
	);
};

const styles = StyleSheet.create({
	tableHeader: {
		borderBottomWidth: 1,
		borderColor: Colors.border,
		backgroundColor: Colors.lightGray,
	},
});
