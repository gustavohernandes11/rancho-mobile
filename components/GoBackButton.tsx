import Colors from "constants/Colors";
import { useNavigation } from "expo-router";
import React from "react";
import { IconButton } from "react-native-paper";

interface GoBackButtonProps {
	children?: React.ReactNode;
}

export const GoBackButton: React.FC<GoBackButtonProps> = () => {
	const navigation = useNavigation();
	return (
		<IconButton
			size={24}
			iconColor={Colors.white}
			icon="arrow-left"
			style={{ marginRight: 11, marginLeft: 0 }}
			onPress={navigation.goBack}
		/>
	);
};
