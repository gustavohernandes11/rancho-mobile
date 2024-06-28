import { useNavigation } from "expo-router";
import { useEffect } from "react";

export const useFocus = (onFocusEffect: () => void) => {
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            onFocusEffect();
        });

        return unsubscribe;
    }, [navigation]);
};
