import React from "react";
import { HelperText } from "react-native-paper";
import { commonStyles } from "styles/Common";

type LabelProps = {
	children: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
	return (
		<HelperText style={commonStyles.label} type="info" {...props}>
			{children}
		</HelperText>
	);
};
