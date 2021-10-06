import FloatingLabel from "./floatingLabel";
import React, {useState} from "react";
import {ADD_NEW_ITEM} from "../constants";
import { v4 as uuidv4 } from 'uuid';
import {addItem} from "../database";

const CreateItem = props => {
    const {
        isParent,
        parentItemId,
        elementOrder,
        list,
        setIsListUpdateRequired,
        isDatabaseTestAllowed
    } = props;

    const [categoryName, setCategoryName] = useState('');
    const [price, setPrice] = useState('');

    const categoryPlaceholder = `New ${isParent ? "category" : "subcategory"} name`;

    /*
    Function handles data in proper way and puts the result to database method add and sets dependant values to their initial state
     */
    const handleNewItem = () => {
        if (!categoryName && !price)
            return;

        if (!window.confirm(ADD_NEW_ITEM))
            return false;

        if (!isDatabaseTestAllowed) {
            setCategoryName('');
            setPrice('');

            return;
        }

        const id = uuidv4();

        const rootCategoryId = isParent ? id : parentItemId;

        const obj = {
            id: id,
            categoryName: categoryName,
            price: price,
            rootCategoryId: rootCategoryId,
            creationDate: new Date(),
            elementOrder: elementOrder
        };

        addItem(obj)
            .then(() => {
                setCategoryName('');
                setPrice('');
                setIsListUpdateRequired(true);
            });
    };

    /*
    Function finds element from the initial (non-filtered) list
     */
    const parentElement = list
        .find(value => value.id === parentItemId);

    return (<>
        <div className="p-3 text-center">
            {<span>You will add a {isParent ? "new" : "child"} element. </span>}
            {!isParent && <>
            <span>It has parent element by the name of </span><span className='fw-bold'>{parentElement?.categoryName}</span>
            </>}
        </div>

        <div className="row">
            <FloatingLabel testId="item input" placeholder={categoryPlaceholder} value={categoryName} setValue={setCategoryName}/>
            <FloatingLabel testId="price input" placeholder='Price' type="number" value={price} setValue={setPrice}/>
            <div className="col-2">
                <button type="button" className="btn btn-outline-dark h-75 w-100" data-testid="add item" onClick={handleNewItem}>Add</button>
            </div>
        </div>
        </>);
};

export default CreateItem;
