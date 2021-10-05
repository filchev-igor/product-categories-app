import React, {useEffect, useRef, useState} from "react";
import useChildItem from "../hooks/useChildItem";

const ListItemCheckbox = ({id, elementOrder}) => {
    const {
        parentItemId, setParentItemId,
        setIsParent,
        setElementOrder,
        isListUpdateRequired,
        areCheckboxesReset, setAreCheckboxesReset
    } = useChildItem();

    const [isChecked, setIsChecked] = useState(false);
    const effectRef = useRef({});

    effectRef.current.parentItemId = parentItemId;
    effectRef.current.setParentItemId = setParentItemId;
    effectRef.current.setIsParent = setIsParent;
    effectRef.current.setElementOrder = setElementOrder;
    effectRef.current.isListUpdateRequired = isListUpdateRequired;
    effectRef.current.setAreCheckboxesReset = setAreCheckboxesReset;
    effectRef.current.areCheckboxesReset = areCheckboxesReset;
    effectRef.current.id = id;
    effectRef.current.elementOrder = elementOrder;

    const toggleCheckbox = () => setIsChecked(!isChecked);

    useEffect(() => {
        if (isChecked) {
            const childId = effectRef.current.id;
            const newElementOrder = effectRef.current.elementOrder + 1;
            effectRef.current.setIsParent(false);
            effectRef.current.setParentItemId(childId);
            effectRef.current.setElementOrder(newElementOrder);
            effectRef.current.setAreCheckboxesReset(true);
        }
        else {
            const activeItemId = effectRef.current.parentItemId;
            const childId = effectRef.current.id;

            if (activeItemId !== childId)
                return;

            effectRef.current.setIsParent(true);
            effectRef.current.setElementOrder(0);
        }
    }, [isChecked]);

    useEffect(() => {
        if (isListUpdateRequired)
            setIsChecked(false);
    }, [isListUpdateRequired]);

    useEffect(() => {
        const activeItemId = effectRef.current.parentItemId;
        const childId = effectRef.current.id;

        if(areCheckboxesReset && activeItemId !== childId)
            setIsChecked(false);
    }, [areCheckboxesReset]);

    return (
        <input
            className="form-check-input me-1"
            type="checkbox"
            checked={isChecked}
            onChange={toggleCheckbox}
            aria-label="Child item checkbox"/>
    );
};

export default ListItemCheckbox;
