import { Tabs } from "expo-router";

import { Image, ImageStyle, StyleProp } from "react-native";
import Colors from "styles/Colors";
import Fonts from "styles/Fonts";

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

                headerTintColor: Colors.white,
                headerTitleStyle: {
                    fontFamily: Fonts.primaryFamily,
                },
                tabBarActiveTintColor: Colors.white,
                tabBarInactiveTintColor: Colors.surface,
                tabBarStyle: {
                    overflow: "hidden",
                    backgroundColor: Colors.green,
                    height: 60,
                },
                tabBarItemStyle: { paddingVertical: 4 },
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
                            style={iconSize}
                            source={require("../../assets/images/HouseIcon.png")}
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
                            style={iconSize}
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
                            style={iconSize}
                            source={require("../../assets/images/CowFolderIcon.png")}
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
                            style={iconSize}
                            source={require("../../assets/images/ChartIcon.png")}
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
                        <Image
                            style={iconSize}
                            source={require("../../assets/images/BookIcon.png")}
                            alt={"annotation page"}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
