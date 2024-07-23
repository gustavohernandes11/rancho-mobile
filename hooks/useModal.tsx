import { useCallback, useState } from "react";

interface UseModalReturn {
    openModal: () => void;
    closeModal: () => void;
    isVisible: boolean;
}

export const useModal = (): UseModalReturn => {
    const [isVisible, setIsVisible] = useState(false);

    const openModal = useCallback(() => {
        setIsVisible(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsVisible(false);
    }, []);

    return { openModal, closeModal, isVisible };
};
