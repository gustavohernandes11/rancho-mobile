import React from "react";
import { ViewProps } from "react-native";
import { Animal } from "types";
import { getAgeString } from "utils/getAgeString";
import { getGenderIcon } from "utils/getGenderIcon";
import { Banner } from "./Banner";
import { Paragraph } from "./Paragraph";
import { Span } from "./Span";

interface AnimalBannerProps {
    animal: Animal;
    href: string;
}

export const AnimalBanner: React.FC<AnimalBannerProps & ViewProps> = ({
    animal,
    ...props
}) => {
    const title = (
        <>
            {getGenderIcon(animal.gender)}
            {" " + animal.name}
        </>
    );

    return (
        <Banner
            iconAlt="Animal icon"
            iconSource={require("../assets/images/AnimalCircleIcon.png")}
            title={title as unknown as string}
            right={
                <Span justify="flex-end" marginX={16}>
                    <Paragraph secondary>
                        {animal.birthdate && getAgeString(animal.birthdate)}
                    </Paragraph>
                </Span>
            }
            {...props}
        />
    );
};
