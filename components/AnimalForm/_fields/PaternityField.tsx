import { Select } from "components/Select";
import { FormikProps } from "formik";
import { useGlobalStore } from "hooks/useGlobalStore";
import React, { memo } from "react";
import { Animal } from "types/Animal";
import { filterPossiblePaternity } from "utils/filters";
import { getFieldError } from "utils/getFieldError";
import { serializeAnimals } from "utils/serializers";

type PaternityFieldProps = {
    formik: FormikProps<Animal>;
};

export const PaternityField: React.FC<PaternityFieldProps> = ({ formik }) => {
    const animals = useGlobalStore(state => state.animals);

    return (
        <Select
            defaultButtonText={
                animals?.find(a => a.id === formik.values.paternityID)?.name ||
                "Selecione um animal"
            }
            items={[
                ...serializeAnimals(
                    filterPossiblePaternity(animals!, formik.values)
                ),
                { key: "Selecione um animal", value: "" },
            ]}
            errorText={getFieldError("paternityID", formik)}
            onSelect={option =>
                formik.setFieldValue("paternityID", Number(option.value))
            }
            label="Paternidade"
            searchPlaceHolder="Busque por nome"
            search={true}
        />
    );
};

export const MemoPaternityField = memo(
    PaternityField,
    (prev, next) =>
        prev.formik.values.paternityID === next.formik.values.paternityID &&
        prev.formik.errors.paternityID === next.formik.errors.paternityID &&
        prev.formik.touched.paternityID === next.formik.touched.paternityID
);
