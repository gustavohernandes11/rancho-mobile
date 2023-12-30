import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Início",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="home" color={color} />
					),
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="info"
										size={25}
										color={
											Colors[colorScheme ?? "light"].text
										}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1,
										}}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name="add"
				options={{
					title: "Adicionar",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="plus" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="list"
				options={{
					title: "Rebanho",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="list" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="config"
				options={{
					title: "Configurações",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="cogs" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
