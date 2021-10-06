import React, {useEffect, useRef} from "react";
import ListItemCheckbox from "./listItemCheckbox";
import useChildItem from "../hooks/useChildItem";

/*
Component displays data, which were filtered
 */
const ListGroup = ({list, hasListGroupFlush = true}) => {
    const {
        areCheckboxesReset, setAreCheckboxesReset
    } = useChildItem();

    const stateRef = useRef({});

    /*
    stateRef variable helps to exclude used values from the UseEffect update states
     */
    stateRef.current.setAreCheckboxesReset = setAreCheckboxesReset;

    const items = list.map(value => {
        const id = value.id;
        const categoryName = value.categoryName;
        const price = value.price;
        const elementOrder = value.elementOrder;
        const hasChild = value.hasChild;
        const child = value.child;
        const totalPrice = value.totalPrice;
        const priceString = (() => {
            if (price)
                return `price: \t\u20AC ${price}`;
            else if (totalPrice)
                return `Total price: \t\u20AC ${totalPrice}`;
            else
                return "";
        })();

        return (
            <li className="list-group-item" key={id}>
                {!price && <ListItemCheckbox id={id} elementOrder={elementOrder}/>}
                <span>{`${categoryName} ${priceString}`}</span>

                {/*
                If this element has child, then listGroup is being called again
                */
                    hasChild && <ListGroup list={child}/>}
            </li>);
    });

    useEffect(() => {
        /*
        After rendering the checkboxes state for resetting their values is being set to the initial (false) value
         */
        if (areCheckboxesReset)
            stateRef.current.setAreCheckboxesReset(false);
    }, [areCheckboxesReset]);

    return (
        <ol className={`list-group list-group-numbered ${hasListGroupFlush ? "list-group-flush" : ""}`}>
            {items}
        </ol>
    )
};

export default ListGroup;
