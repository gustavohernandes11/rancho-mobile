import Colors from "constants/Colors";
import React from "react";
import { View } from "react-native";

type SkeletonProps = {
	width?: number;
	height?: number;
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
			}}
			{...props}
		/>
	);
};
