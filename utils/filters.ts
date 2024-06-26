import moment from "moment";
import { Animal } from "types";

const atLeastOneYearOld = (animal: Animal) =>
    animal.birthdate ? moment().diff(animal.birthdate, "years") > 1 : true;
const oneYearOlderThenChild = (animal: Animal, childBirthdate?: string) =>
    animal.birthdate
        ? moment(animal.birthdate).isBefore(
              moment(childBirthdate).subtract(1, "years")
          )
        : true;

const isNotParent = (animal: Animal, childAnimal: Animal) => {
    return !(
        animal.paternityID === childAnimal.id ||
        animal.maternityID === childAnimal.id
    );
};

const isMale = (animal: Animal) => animal.gender === "M";
const isFemale = (animal: Animal) => animal.gender === "F";
const isActive = (animal: Animal) => animal.status === "active";

export const filterPossibleMaternity = (animals: Animal[], child: Animal) => {
    let filteredAnimals = animals
        .filter(isFemale)
        .filter(isActive)
        .filter(atLeastOneYearOld)
        .filter(animal => oneYearOlderThenChild(animal, child?.birthdate))
        .filter(animal => isNotParent(animal, child));

    return filteredAnimals;
};

export const filterPossiblePaternity = (animals: Animal[], child: Animal) => {
    let filteredAnimals = animals
        .filter(isMale)
        .filter(isActive)
        .filter(atLeastOneYearOld)
        .filter(animal => oneYearOlderThenChild(animal, child?.birthdate))
        .filter(animal => isNotParent(animal, child));

    return filteredAnimals;
};
