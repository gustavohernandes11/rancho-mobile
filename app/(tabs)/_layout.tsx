import { Tabs } from "expo-router";

import { Image, ImageStyle, StyleProp } from "react-native";
import Theme from "styles/Theme";

const iconSize: StyleProp<ImageStyle> = {
    height: 28,
    width: 28,
    resizeMode: "contain",
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
                headerTintColor: Theme.colors.white,
                headerTitleStyle: {
                    fontFamily: Theme.fonts.primaryFamily,
                },
                headerStyle: {
                    backgroundColor: Theme.colors.primary,
                },

                tabBarLabelStyle: {
                    fontSize: 14,
                    fontFamily: Theme.fonts.primaryFamily,
                },

                tabBarActiveTintColor: Theme.colors.white,
                tabBarInactiveTintColor: Theme.colors.primary,

                tabBarStyle: {
                    backgroundColor: Theme.colors.primary,
                },
                tabBarActiveBackgroundColor: Theme.colors.primary,
                tabBarInactiveBackgroundColor: Theme.colors.lightest,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Início",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={iconSize}
                            source={require("../../assets/images/HouseIcon.png")}
                            tintColor={
                                Theme.colors[focused ? "lightest" : "primary"]
                            }
                            alt={"home page"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="animals"
                options={{
                    tabBarLabel: "Rebanho",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={iconSize}
                            source={require("../../assets/images/CowIcon.png")}
                            tintColor={
                                Theme.colors[focused ? "lightest" : "primary"]
                            }
                            alt={"animals page"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="batches"
                options={{
                    tabBarLabel: "Lotes",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={iconSize}
                            source={require("../../assets/images/CowFolderIcon.png")}
                            tintColor={
                                Theme.colors[focused ? "lightest" : "primary"]
                            }
                            alt={"batches page"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="agenda"
                options={{
                    tabBarLabel: "Agenda",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={iconSize}
                            source={require("../../assets/images/BookIcon.png")}
                            tintColor={
                                Theme.colors[focused ? "lightest" : "primary"]
                            }
                            alt={"agenda page"}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
