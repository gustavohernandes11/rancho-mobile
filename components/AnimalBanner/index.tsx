import { Banner } from "components/Banner";
import React from "react";
import { ViewProps } from "react-native";
import { Animal } from "types";
import { getGenderIcon } from "utils/getGenderIcon";
import { AnimalAge } from "./AnimalAge";

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
            iconSource={require("../../assets/images/AnimalCircleIcon.png")}
            title={title as unknown as string}
            right={<AnimalAge birthdate={animal.birthdate} />}
            {...props}
        />
    );
};
