import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { BackHandler } from "react-native";
import { ControlledAnimalTableProps } from "./useAnimalTable";

export const useClearSelectionOnHardwareBack = ({
	controller,
}: {
	controller: ControlledAnimalTableProps;
}) => {
	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				if (controller.isSelectionMode) {
					controller.clearSelection();
					return true;
				} else {
					return false;
				}
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove();
		}, [controller.isSelectionMode, controller.selectedIDs])
	);
};
