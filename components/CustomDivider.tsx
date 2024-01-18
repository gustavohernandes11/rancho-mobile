import Colors from "constants/Colors";
import { DividerProps, Divider } from "react-native-paper";

export const CustomDivider = ({ ...props }: DividerProps) => (
	<Divider style={{ backgroundColor: Colors.border }} {...props} />
);
