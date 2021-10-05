import FloatingLabel from "./floatingLabel";
import React, {useState} from "react";
import {ADD_NEW_ITEM} from "../constants";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {addItem} from "../database";

const CreateItem = props => {
    const {
        isParent,
        parentItemId,
        elementOrder,
        list,
        setIsListUpdateRequired
    } = props;

    const [categoryName, setCategoryName] = useState('');
    const [price, setPrice] = useState('');

    const categoryPlaceholder = `New ${isParent ? "category" : "subcategory"} name`;

    const handleNewItem = () => {
        if (!window.confirm(ADD_NEW_ITEM))
            return false;

        const id = generateUniqueID();

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

    const parentElement = list
        .find(value => value.id === parentItemId);

    return (<>
        <div>
            {<span>You will add a {isParent ? "new" : "child"} element. </span>}
            {!isParent && <>
            <span>It's parent element is </span><span className='fw-bold'>{parentElement?.categoryName}</span>
            </>}
        </div>

        <div className="input-group mb-3">
            <FloatingLabel placeholder={categoryPlaceholder} value={categoryName} setValue={setCategoryName}/>
            <FloatingLabel placeholder='price' type="number" value={price} setValue={setPrice}/>
            <button type="button" className="btn btn-outline-dark" onClick={handleNewItem}>Add</button>
        </div>
        </>);
};

export default CreateItem;
