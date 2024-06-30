import React from "react";
import { StyleSheet } from "react-native";
import { Searchbar, SearchbarProps } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import Fonts from "styles/Fonts";

export const SearchBar: React.FC<SearchbarProps> = ({ ...props }) => {
    return (
        <Searchbar
            style={styles.searchbar}
            inputStyle={styles.input}
            iconColor={Colors.darkGray}
            placeholderTextColor={Colors.darkGray}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    searchbar: {
        flex: 1,
        height: 45,
        ...commonStyles.inputAspect,
        borderWidth: 1,
    },
    input: {
        fontFamily: Fonts.primaryFamily,
        color: Colors.darkGray,
        fontSize: 14,
        minHeight: "auto",
    },
});
