import * as Yup from "yup";

export const validateQuantity = Yup.object({
    quantity: Yup.number()
        .min(1, "Adicione pelo menos um animal.")
        .max(50, "Adicione no máximo 50 animais por vez.")
        .required("Especifique quantos animais quer adicionar."),
});
