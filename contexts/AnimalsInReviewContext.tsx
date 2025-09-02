import React, { createContext, ReactNode, useState } from "react";
import { Animal } from "types";

export interface AnimalsInReviewContextType {
    animals: Animal[];
    hasErrors: boolean;
    setAnimals: (animals: Animal[]) => void;
    setAnimalName: (id: number, newName: string) => void;
    setAnimalGender: (id: number, newName: "F" | "M") => void;
    updateAnimal: (animal: Animal) => void;
    getAnimal: (id: number) => Animal | null;
    removeAnimal: (id: number) => void;
    clear: () => void;
}

export const AnimalsInReviewContext = createContext<
    AnimalsInReviewContextType | undefined
>(undefined);

export const AnimalsInReviewProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [animals, setAnimalsState] = useState<Animal[]>([]);

    const setAnimals = (newAnimals: Animal[]) => {
        setAnimalsState(newAnimals);
    };

    const setAnimalName = (id: number, newName: string) => {
        setAnimalsState(currentAnimals =>
            currentAnimals.map(animal =>
                animal.id === id ? { ...animal, name: newName } : animal
            )
        );
    };

    const setAnimalGender = (id: number, newGender: "F" | "M") => {
        setAnimalsState(currentAnimals =>
            currentAnimals.map(animal =>
                animal.id === id ? { ...animal, gender: newGender } : animal
            )
        );
    };

    const hasErrors = animals.some(animal => {
        if (!animal.name || animal.name.trim().length < 3) return true;
        if (!animal.gender) return true;
        return false;
    });

    const updateAnimal = (toUpdateAnimal: Animal) => {
        setAnimalsState(currentAnimals =>
            currentAnimals.map(animal =>
                animal.id === toUpdateAnimal.id ? { ...toUpdateAnimal } : animal
            )
        );
    };

    const getAnimal = (id: number): Animal | null => {
        return animals.find(animal => animal.id === id) || null;
    };

    const removeAnimal = (id: number) => {
        setAnimalsState(currentAnimals =>
            currentAnimals.filter(animal => animal.id !== id)
        );
    };

    const clear = () => {
        setAnimalsState([]);
    };

    return (
        <AnimalsInReviewContext.Provider
            value={{
                animals,
                setAnimals,
                setAnimalName,
                setAnimalGender,
                updateAnimal,
                getAnimal,
                removeAnimal,
                clear,
                hasErrors,
            }}
        >
            {children}
        </AnimalsInReviewContext.Provider>
    );
};
