import {ChildItemContext} from "../contexts";
import {useContext} from "react";

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
