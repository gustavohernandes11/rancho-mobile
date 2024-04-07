import Colors from "constants/Colors";
import { useNavigation } from "expo-router";
import React from "react";
import { IconButton, IconButtonProps } from "react-native-paper";

interface GoBackButtonProps {
	children?: React.ReactNode;
}

export const GoBackButton: React.FC<
	GoBackButtonProps & Omit<IconButtonProps, "icon">
> = ({ ...props }) => {
	const navigation = useNavigation();
	return (
		<IconButton
			size={24}
			iconColor={Colors.white}
			accessibilityLabel="Go back"
			style={{ marginRight: 11, marginLeft: 0 }}
			onPress={navigation.goBack}
			icon="arrow-left"
			{...props}
		/>
	);
};
