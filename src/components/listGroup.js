import React from "react";
import ListItemCheckbox from "./listItemCheckbox";

const ListGroup = ({list}) => {
    const items = list.map(value => {
        const id = value.id;
        const categoryName = value.categoryName;
        const elementOrder = value.elementOrder;
        const hasChild = value.hasChild;
        const child = value.child;

        return (
            <li className="list-group-item" key={id}>
                <ListItemCheckbox id={id} elementOrder={elementOrder}/>
                {categoryName}

                {hasChild && <ListGroup list={child}/>}
            </li>);
    });

    return (
        <ul className="list-group">
            {items}
        </ul>
    )
};

export default ListGroup;
