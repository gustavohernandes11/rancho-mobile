import React from "react";
import { ViewProps } from "react-native";
import { Animal } from "types";
import { formatAge, getGenderIcon } from "utils/formatters";
import { Banner } from "./Banner";

interface AnimalBannerProps {
    animal: Animal;
    href: string;
}

export const AnimalBanner: React.FC<AnimalBannerProps & ViewProps> = ({
    animal,
    ...props
}) => {
    return (
        <Banner
            iconAlt="Rounded animal icon"
            iconSource={require("../assets/images/RoundedAnimalIcon.png")}
            title={
                <>
                    {getGenderIcon(animal.gender)}
                    {" " + animal.name}
                </>
            }
            rightDescription={animal.birthdate && formatAge(animal.birthdate)}
            {...props}
        />
    );
};
