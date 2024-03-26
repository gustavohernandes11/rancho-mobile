import React from "react";
import { ViewProps } from "react-native";
import { Animal } from "types/Animal";
import { getFormattedAge, getGenderIcon } from "utils/formatters";
import { Banner } from "./Banner";

interface AnimalBannerProps {
	animal: Animal;
}

export const AnimalBanner: React.FC<AnimalBannerProps & ViewProps> = ({
	animal,
	...props
}) => {
	return (
		<Banner
			iconAlt="animal icon"
			iconSource={require("../assets/images/RoundedAnimalIcon.png")}
			title={
				<>
					{getGenderIcon(animal.gender)}
					{" " + animal.name}
				</>
			}
			cornerDescription={
				animal.birthdate && getFormattedAge(animal.birthdate)
			}
			{...props}
		/>
	);
};
