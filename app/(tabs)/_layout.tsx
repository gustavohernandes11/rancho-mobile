import { Tabs } from "expo-router";

import Colors from "constants/Colors";
import Fonts from "constants/Fonts";
import { Image } from "react-native";

const tabIconSize = {
	height: 24,
	width: 24,
};
export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerTitle: () => (
					<Image
						style={{
							height: 25,
							width: 100,
						}}
						source={require("../../assets/images/Logo.png")}
						alt={"Logo"}
					/>
				),
				tabBarActiveTintColor: Colors.white,
				tabBarInactiveTintColor: Colors.gray,
				headerTintColor: Colors.white,
				tabBarStyle: {
					overflow: "hidden",
				},
				headerStyle: {
					backgroundColor: Colors.green,
				},
				headerTitleStyle: {
					fontWeight: "bold",
					fontFamily: Fonts.primaryFamily,
				},
				tabBarActiveBackgroundColor: Colors.darkGreen,
				tabBarInactiveBackgroundColor: Colors.green,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: () => (
						<Image
							style={tabIconSize}
							source={require("../../assets/images/BarnIcon.png")}
							alt={"home page"}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="animals"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: () => (
						<Image
							style={tabIconSize}
							source={require("../../assets/images/CowIcon.png")}
							alt={"animals page"}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="batches"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: () => (
						<Image
							style={tabIconSize}
							source={require("../../assets/images/FenceIcon.png")}
							alt={"batches page"}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
