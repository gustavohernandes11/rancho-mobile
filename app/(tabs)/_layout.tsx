import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.white,
				tabBarInactiveTintColor: Colors.gray,
				headerTintColor: Colors.white,
				tabBarStyle: {
					borderTopLeftRadius: 4,
					borderTopRightRadius: 4,
					overflow: "hidden",
				},
				headerStyle: {
					backgroundColor: Colors.green,
					borderBottomLeftRadius: 4,
					borderBottomRightRadius: 4,
				},
				tabBarActiveBackgroundColor: Colors.darkGreen,
				tabBarInactiveBackgroundColor: Colors.green,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarShowLabel: false,
					headerTitle: "Início",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="home" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="add"
				options={{
					tabBarShowLabel: false,
					headerTitle: "Adicionar",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="plus" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="list"
				options={{
					tabBarShowLabel: false,
					headerTitle: "Rebanho",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="list" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="config"
				options={{
					tabBarShowLabel: false,
					headerTitle: "Configurações",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="cogs" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
