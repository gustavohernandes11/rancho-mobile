import { useEffect, useCallback, DependencyList } from "react";

export default function useDebounce(
    effect: Function,
    dependencies: DependencyList,
    delay: number
) {
    const callback = useCallback(effect, dependencies);

    useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, [callback, delay]);
}
