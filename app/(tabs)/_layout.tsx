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
                    height: 60,
                },
                tabBarItemStyle: { paddingVertical: 2 },

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
                            source={
                                focused
                                    ? require("../../assets/images/HouseIcon.png")
                                    : require("../../assets/images/HouseIcon_green.png")
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
                            source={
                                focused
                                    ? require("../../assets/images/CowIcon.png")
                                    : require("../../assets/images/CowIcon_green.png")
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
                            source={
                                focused
                                    ? require("../../assets/images/CowFolderIcon.png")
                                    : require("../../assets/images/CowFolderIcon_green.png")
                            }
                            alt={"batches page"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="production"
                options={{
                    tabBarLabel: "Produção",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={iconSize}
                            source={
                                focused
                                    ? require("../../assets/images/ChartIcon.png")
                                    : require("../../assets/images/ChartIcon_green.png")
                            }
                            alt={"production page"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="annotations"
                options={{
                    tabBarLabel: "Anotações",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={iconSize}
                            source={
                                focused
                                    ? require("../../assets/images/BookIcon.png")
                                    : require("../../assets/images/BookIcon_green.png")
                            }
                            alt={"annotation page"}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
