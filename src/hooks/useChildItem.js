import {ChildItemContext} from "../contexts";
import {useContext} from "react";

/*
Function returns context values for simplifying it's overuse
 */
const useChildItem = () => {
    const {
        parentItemId, setParentItemId,
        setIsParent,
        setElementOrder,
        isListUpdateRequired,
        areCheckboxesReset, setAreCheckboxesReset
    } = useContext(ChildItemContext);

    return {
        parentItemId, setParentItemId,
        setIsParent,
        setElementOrder,
        isListUpdateRequired,
        areCheckboxesReset, setAreCheckboxesReset
    };
};

export default useChildItem;
