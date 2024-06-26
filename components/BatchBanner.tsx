import React from "react";
import { ViewProps } from "react-native";
import { Batch } from "types";
import { Banner } from "./Banner";

interface BatchBannerProps {
    batch: Batch;
    href: string;
}
const getCountText = (count: number) => {
    if (count === 0) return "Vazio";
    else if (count === 1) return "1 animal";
    else return `${count} animais`;
};

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
            rightDescription={getCountText(batch.count)}
            {...props}
        />
    );
};
