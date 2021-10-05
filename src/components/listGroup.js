import React, {useEffect, useRef} from "react";
import ListItemCheckbox from "./listItemCheckbox";
import useChildItem from "../hooks/useChildItem";

const ListGroup = ({list}) => {
    const {
        areCheckboxesReset, setAreCheckboxesReset
    } = useChildItem();

    const stateRef = useRef({});

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
                {`${categoryName} ${priceString}`}

                {hasChild && <ListGroup list={child}/>}
            </li>);
    });

    useEffect(() => {
        if (areCheckboxesReset)
            stateRef.current.setAreCheckboxesReset(false);
    }, [areCheckboxesReset]);

    return (
        <ul className="list-group">
            {items}
        </ul>
    )
};

export default ListGroup;
