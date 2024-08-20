export const convertStringToAnimalIDs = (animalIDsString: string): number[] => {
    return animalIDsString.split(",").map(Number);
};
