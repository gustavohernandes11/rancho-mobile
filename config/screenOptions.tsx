import { GoBackButton } from "components/GoBackButton";
import Theme from "styles/Theme";

export const screenOptions: any = {
    headerStyle: {
        backgroundColor: Theme.colors.primary,
    },
    headerTintColor: Theme.colors.white,
    headerTitleStyle: {
        fontFamily: Theme.fonts.primaryFamily,
    },
    headerLeft: () => <GoBackButton />,
};
