import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "constants/Colors";

export const getGenderIcon = (gender: "F" | "M") =>
	gender === "M" ? (
		<FontAwesome color={Colors.blue} name="mars" />
	) : (
		<FontAwesome color={Colors.red} name="venus" />
	);
