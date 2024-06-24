import { useCallback, useState } from "react";

export const useForceUpdate = () => {
	const [, updateState] = useState();
	return useCallback(() => updateState({} as any), []);
};
