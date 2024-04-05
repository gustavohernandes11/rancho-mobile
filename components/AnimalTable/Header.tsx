import Colors from "constants/Colors";
import React from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { sharedStyles } from "styles/shared";

interface HeaderProps {
	leaveSpaceAtRight: boolean;
}

export const Header = ({ leaveSpaceAtRight }: HeaderProps) => {
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
				{leaveSpaceAtRight && (
					<DataTable.Title
						style={{ flex: 1 }}
						textStyle={[{ flexShrink: 1 }, sharedStyles.text]}
					>
						{" "}
					</DataTable.Title>
				)}
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
