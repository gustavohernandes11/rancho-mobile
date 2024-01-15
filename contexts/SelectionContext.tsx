import { createContext, useState } from "react";

export const SelectionModeContext = createContext<
	| {
			selectedIDs: number[];
			isSelectionMode: boolean | undefined;
			setSelectedIDs: React.Dispatch<React.SetStateAction<number[]>>;
			setIsSelectionMode: React.Dispatch<
				React.SetStateAction<boolean | undefined>
			>;
	  }
	| undefined
>(undefined);

export const SelectionModeProvider: React.FC<any> = ({ children }) => {
	const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
	const [isSelectionMode, setIsSelectionMode] = useState<boolean | undefined>(
		undefined
	);

	return (
		<SelectionModeContext.Provider
			value={{
				selectedIDs,
				isSelectionMode,
				setSelectedIDs,
				setIsSelectionMode,
			}}
		>
			{children}
		</SelectionModeContext.Provider>
	);
};
