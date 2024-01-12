import { GoBackButton } from "components/GoBackButton";
import Colors from "constants/Colors";
import Fonts from "constants/Fonts";

export const screenOptions: any = {
	headerStyle: {
		backgroundColor: Colors.green,
	},
	headerTintColor: Colors.white,
	headerTitleStyle: {
		fontWeight: "bold",
		fontFamily: Fonts.primaryFamily,
	},
	headerLeft: () => <GoBackButton />,
};
