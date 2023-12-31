import React from "react";
import {
	TouchableHighlight,
	StyleSheet,
	TouchableHighlightProps,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ButtonTypes } from "../types/ButtonTypes";
import { getButtonBackgroundColor } from "../utils/getButtonBackgroundColor";
import { getButtonBorderColor } from "../utils/getButtonBorderColor";
import { getOnPressedColor } from "../utils/getOnPressedColor";
import { getButtonTextColor } from "../utils/getButtonTextColor";

type CustomButtonProps = {
	icon: React.ComponentProps<typeof FontAwesome>["name"];
	onPress?: () => any;
	label?: string;
	type?: ButtonTypes;
} & TouchableHighlightProps;

export const IconButton: React.FC<CustomButtonProps> = ({
	icon,
	onPress,
	label,
	type = "primary",
	...props
}) => {
	return (
		<TouchableHighlight
			underlayColor={getOnPressedColor(type)}
			style={[
				styles.button,
				{
					backgroundColor: getButtonBackgroundColor(type),
					borderColor: getButtonBorderColor(type),
				},
			]}
			onPress={onPress}
			{...props}
		>
			<FontAwesome
				aria-label={icon}
				color={getButtonTextColor(type)}
				size={14}
				name={icon}
			/>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	button: {
		width: "auto",
		alignSelf: "flex-start",
		borderWidth: 1,
		padding: 12,
		borderRadius: 4,
	},
});
