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
				headerTintColor: Colors.white,
				headerTitleStyle: {
					fontWeight: "bold",
					fontFamily: Fonts.primaryFamily,
				},
				tabBarActiveTintColor: Colors.white,
				tabBarInactiveTintColor: Colors.surface,
				tabBarStyle: {
					overflow: "hidden",
					backgroundColor: Colors.green,
					height: 60,
				},
				tabBarItemStyle: { paddingVertical: 8, gap: 8 },
				headerStyle: {
					backgroundColor: Colors.green,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					color: Colors.white,
					fontFamily: Fonts.primaryFamily,
				},
				tabBarActiveBackgroundColor: Colors.darkGreen,
				tabBarInactiveBackgroundColor: Colors.green,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarLabel: "Início",
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
					tabBarLabel: "Rebanho",
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
					tabBarLabel: "Lotes",
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
