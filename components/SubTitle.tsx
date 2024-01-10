import React from "react";
import { StyleSheet } from "react-native";
import { HelperText, HelperTextProps } from "react-native-paper";
import Colors from "../constants/Colors";

export const SubTitle: React.FC<Omit<HelperTextProps, "type">> = ({
	children,
	...props
}) => {
	return (
		<HelperText style={styles.subtitle} type="info" {...props}>
			{children}
		</HelperText>
	);
};

const styles = StyleSheet.create({
	subtitle: {
		padding: 0,
		marginBottom: 8,
		color: Colors.darkGray,
	},
});
