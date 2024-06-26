import { Link } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewProps,
} from "react-native";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import Fonts from "styles/Fonts";
import { AnnotationTypeOption } from "types";
import { formatAnnotationType, formatDateToShortPtBR } from "utils/formatters";
import { Paragraph } from "./Paragraph";

type AnnotationBannerProps = {
    title: string;
    type: AnnotationTypeOption;
    href: string;
    description?: string;
    date?: Date;
    animalIds?: number[];
};

export const AnnotationBanner: React.FC<AnnotationBannerProps & ViewProps> = ({
    title,
    description,
    href,
    id,
    type,
    date,
    animalIds,
    ...props
}) => {
    return (
        <Link href={href} style={styles.container} asChild>
            <Pressable {...props} style={styles.container}>
                <View style={styles.iconSpan}>
                    <Image
                        style={commonStyles.icon}
                        source={require("../assets/images/AnnotationCircleIcon.png")}
                        alt="Annotation icon"
                    />
                </View>
                <View style={styles.main}>
                    <View style={styles.top}>
                        <Paragraph>{formatAnnotationType(type)}</Paragraph>
                        <Text style={styles.date}>
                            {date ? formatDateToShortPtBR(date) : " "}
                        </Text>
                    </View>
                    <View style={styles.main}>
                        <Text style={styles.title}>{title}</Text>
                        {description && <Paragraph>{description}</Paragraph>}
                    </View>
                </View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.lightGray,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    top: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        width: "100%",
        justifyContent: "space-between",
    },
    main: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
    },
    title: {
        fontFamily: Fonts.primaryFamily,
        color: Colors.text,
        fontSize: 16,
    },
    date: {
        ...commonStyles.text,
        textAlign: "right",
    },
    iconSpan: {
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 8,
    },
});
