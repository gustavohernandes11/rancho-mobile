import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useNavigation } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

const GoBackButton = ({ onGoBack }: { onGoBack: () => void }) => {
	return (
		<Pressable onPress={onGoBack}>
			{({ pressed }) => (
				<FontAwesome
					name="arrow-left"
					size={14}
					color={"#FFF"}
					style={{
						padding: 8,
						marginLeft: 8,
						opacity: pressed ? 0.5 : 1,
					}}
				/>
			)}
		</Pressable>
	);
};

export default function TabLayout() {
	const navigation = useNavigation();
	const colorScheme = useColorScheme();
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor:
					Colors[colorScheme ?? "light"].lightGrey,
				headerTintColor: "white",
				tabBarStyle: {
					borderTopLeftRadius: 8,
					borderTopRightRadius: 8,
				},
				headerStyle: {
					backgroundColor: Colors[colorScheme ?? "light"].green,
					borderBottomLeftRadius: 8,
					borderBottomRightRadius: 8,
				},
				tabBarActiveBackgroundColor:
					Colors[colorScheme ?? "light"].darkGreen,
				tabBarInactiveBackgroundColor:
					Colors[colorScheme ?? "light"].green,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "",
					headerTitle: "Início",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="home" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="add"
				options={{
					title: "",
					headerTitle: "Adicionar",
					headerLeft: () => (
						<GoBackButton onGoBack={navigation.goBack} />
					),
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="plus" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="list"
				options={{
					title: "",
					headerTitle: "Rebanho",
					headerLeft: () => (
						<GoBackButton onGoBack={navigation.goBack} />
					),
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="list" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="config"
				options={{
					title: "",
					headerTitle: "Configurações",
					headerLeft: () => (
						<GoBackButton onGoBack={navigation.goBack} />
					),
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="cogs" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
