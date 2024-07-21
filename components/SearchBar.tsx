import React from "react";
import { StyleSheet } from "react-native";
import { Searchbar, SearchbarProps } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";

export const SearchBar: React.FC<SearchbarProps> = ({ ...props }) => {
    return (
        <Searchbar
            style={styles.searchbar}
            inputStyle={styles.input}
            iconColor={Theme.colors.darkGray}
            placeholderTextColor={Theme.colors.darkGray}
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
        borderRadius: 32,
    },
    input: {
        fontFamily: Theme.fonts.primaryFamily,
        color: Theme.colors.darkGray,
        fontSize: 14,
        minHeight: "auto",
    },
});
