import { useContext } from "react";
import { SelectionModeContext } from "../contexts/selectionContext";

export const useSelectionMode = () => {
	const context = useContext(SelectionModeContext);
	if (!context) {
		throw new Error(
			"useSelectionMode deve ser usado dentro de um SelectionModeProvider"
		);
	}
	return context;
};
