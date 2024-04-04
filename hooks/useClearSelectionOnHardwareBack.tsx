import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { BackHandler } from "react-native";

export const useClearSelectionOnHardwareBack = (onClearSelection: Function) => {
	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				onClearSelection();
				return false;
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove();
		}, [])
	);
};
