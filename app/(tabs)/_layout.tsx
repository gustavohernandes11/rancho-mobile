import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { Image } from "react-native";
import Colors from "styles/Colors";
import Fonts from "styles/Fonts";

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
			<Tabs.Screen
				name="production"
				options={{
					tabBarLabel: "Produção",
					tabBarIcon: () => (
						<Image
							style={{ height: 24, width: 16 }}
							source={require("../../assets/images/GallonIcon.png")}
							alt={"production page"}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="annotations"
				options={{
					tabBarLabel: "Anotações",
					tabBarIcon: () => (
						<FontAwesome
							style={{
								color: Colors.white,
							}}
							size={22}
							name="book"
						/>
					),
				}}
			/>
		</Tabs>
	);
}
