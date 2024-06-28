import React from "react";
import { View } from "react-native";
import Colors from "styles/Colors";

type SkeletonProps = {
	width?: number | "100%";
	height?: number | "100%";
	my?: number;
	mx?: number;
	flex?: number;
};
export const Skeleton: React.FC<SkeletonProps> = ({
	width,
	height = 20,
	mx = 0,
	my = 5,
	flex = 1,
	...props
}) => {
	return (
		<View
			style={{
				backgroundColor: Colors.lightGray,
				flex,
				height,
				width,
				marginVertical: my,
				marginHorizontal: mx,
				borderRadius: 8,
			}}
			{...props}
		/>
	);
};
