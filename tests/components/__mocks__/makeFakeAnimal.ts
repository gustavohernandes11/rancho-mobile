import { Animal } from "types";

export const makeFakeAnimal = (override?: Partial<Animal>): Animal =>
    Object.assign(
        {
            id: 1,
            name: "any_name",
            gender: "F",
        },
        override
    );
