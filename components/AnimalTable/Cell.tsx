import React from "react";
import { DataTable } from "react-native-paper";
import { sharedStyles } from "styles/shared";

type CellProps = {
	children: React.ReactNode;
	flex: number;
};
export const Cell = ({ children, flex }: CellProps) => {
	return (
		<DataTable.Cell style={{ flex }} textStyle={sharedStyles.text}>
			{children}
		</DataTable.Cell>
	);
};
