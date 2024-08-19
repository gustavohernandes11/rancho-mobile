import React from "react";
import { ViewProps } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import Theme from "styles/Theme";
import { Batch } from "types";
import { Banner } from "./Banner";
import { Paragraph } from "./Paragraph";
import { Span } from "./Span";

interface BatchBannerProps {
    batch: Batch;
    href: string;
}

export const BatchBanner: React.FC<BatchBannerProps & ViewProps> = ({
    batch,
    ...props
}) => {
    return (
        <Banner
            iconAlt="batch icon"
            iconSource={require("../assets/images/BatchCircleIcon.png")}
            title={batch.name}
            description={batch.description}
            right={<RightContent count={batch.count} />}
            {...props}
        />
    );
};

const RightContent = ({ count }: { count: number }) => {
    return (
        <Span
            direction="row"
            flexWrap="nowrap"
            align="center"
            justify="flex-end"
            marginY={0}
        >
            <Paragraph secondary>{count}</Paragraph>
            <Icon size={16} source="cow" color={Theme.colors.mediumGray} />
            <IconButton
                iconColor={Theme.colors.mediumGray}
                icon="dots-vertical"
                onPress={() => {}}
            />
        </Span>
    );
};
