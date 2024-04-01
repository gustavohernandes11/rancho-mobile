import React from "react";
import { DataTable } from "react-native-paper";
import { sharedStyles } from "styles/shared";

type CellProps = {
	children: React.ReactNode;
	flex: number;
	active?: boolean;
};
export const Cell = ({ children, flex, active = true }: CellProps) => {
	if (active)
		return (
			<DataTable.Cell style={{ flex }} textStyle={sharedStyles.text}>
				{children}
			</DataTable.Cell>
		);
	else return null;
};
