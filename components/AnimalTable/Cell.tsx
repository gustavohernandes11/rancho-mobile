import React from "react";
import { DataTable } from "react-native-paper";
import { commonStyles } from "styles/Common";

type CellProps = {
	children: React.ReactNode;
	flex: number;
};
export const Cell = ({ children, flex }: CellProps) => {
	return (
		<DataTable.Cell style={{ flex }} textStyle={commonStyles.text}>
			{children}
		</DataTable.Cell>
	);
};
