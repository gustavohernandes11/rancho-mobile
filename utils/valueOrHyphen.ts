export const valueOrHyphen = (value: number | string | null | undefined) => {
    return !!value ? value.toString() : "-";
};
