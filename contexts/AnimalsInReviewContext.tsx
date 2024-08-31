import React, { createContext, ReactNode, useState } from "react";
import { Animal } from "types";

export interface AnimalsInReviewContextType {
    animals: Animal[];
    setAnimals: (animals: Animal[]) => void;
    setAnimalName: (id: number, newName: string) => void;
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
                updateAnimal,
                getAnimal,
                removeAnimal,
                clear,
            }}
        >
            {children}
        </AnimalsInReviewContext.Provider>
    );
};
