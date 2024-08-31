import {
    AnimalsInReviewContext,
    AnimalsInReviewContextType,
} from "contexts/AnimalsInReviewContext";
import { useContext } from "react";

export const useAnimalsInReview = (): AnimalsInReviewContextType => {
    const context = useContext(AnimalsInReviewContext);
    if (!context) {
        throw new Error(
            "useAnimalsInReview must be used within an AnimalsInReviewProvider"
        );
    }
    return context;
};
