import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "constants/Colors";
import Fonts from "constants/Fonts";
import { Image } from "react-native";
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

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
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="home" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="animals"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="list" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="batches"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="cubes" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
