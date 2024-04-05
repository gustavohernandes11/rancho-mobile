export {
	render,
	screen,
	userEvent,
	waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "@testing-library/jest-native/extend-expect";
import { ComponentType } from "react";

type RenderWithNavigationProps = {
	controller: ComponentType<any>;
	params?: any;
};

export const RenderWithNavigation = ({
	controller,
	params,
}: RenderWithNavigationProps) => {
	const stack = createNativeStackNavigator<any>();
	return (
		<NavigationContainer independent>
			<stack.Navigator initialRouteName="testRoute">
				<stack.Screen
					name="testScreen"
					component={controller}
					initialParams={params}
					options={{ header: () => null }}
				/>
			</stack.Navigator>
		</NavigationContainer>
	);
};
