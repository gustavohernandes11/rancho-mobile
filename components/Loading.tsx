import Colors from "constants/Colors";
import React from "react";
import { ActivityIndicatorProps, ActivityIndicator } from "react-native-paper";

export const Loading: React.FC<ActivityIndicatorProps> = ({
	children,
	...props
}) => {
	return <ActivityIndicator color={Colors.green} {...props} />;
};
