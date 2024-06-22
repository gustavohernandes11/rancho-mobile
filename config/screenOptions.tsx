import { GoBackButton } from "components/GoBackButton";
import Colors from "styles/Colors";
import Fonts from "styles/Fonts";

export const screenOptions: any = {
	headerStyle: {
		backgroundColor: Colors.green,
	},
	headerTintColor: Colors.white,
	headerTitleStyle: {
		fontFamily: Fonts.primaryFamily,
	},
	headerLeft: () => <GoBackButton />,
};
