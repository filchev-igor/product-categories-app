import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "../components/listGroup";
import React, {useEffect, useState} from "react";
import CreateItem from "../components/createItem";
import {getListPromise} from "../database";
import {ChildItemContext} from "../contexts";

const App = () => {
    const [parentItemId, setParentItemId] = useState('');
    const [isParent, setIsParent] = useState(true);
    const [elementOrder, setElementOrder] = useState(0);
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isListUpdateRequired, setIsListUpdateRequired] = useState(true);
    const [areCheckboxesReset, setAreCheckboxesReset] = useState(false);

    useEffect(() => {
        if (!isListUpdateRequired)
            return;

        const listPromise = getListPromise();

        listPromise
            .then(array => {
                const filteredArray = array
                    .map(value => {
                        value.child = [];
                        value.hasChild = false;
                        value.totalPrice = 0;

                        return value;
                    })
                    .filter((value, index, array) => {
                        const currentElementOrder = value.elementOrder;

                        if (currentElementOrder) {
                            const parentIndex = array.findIndex(obj => obj.id === value.rootCategoryId);

                            array[parentIndex].child.push(value);
                            array[parentIndex].hasChild = true;

                            if (value.price)
                                array[parentIndex].totalPrice += value.price;

                            return false;
                        }

                        return true;
                    });

                return [array, filteredArray];
            })
            .then(([array, filteredArray]) => {
                setList(array);
                setFilteredList(filteredArray);
                setIsListUpdateRequired(false);
            });
    }, [isListUpdateRequired]);

    const childItemProviderValue = {
        parentItemId, setParentItemId,
        setIsParent,
        setElementOrder,
        isListUpdateRequired,
        areCheckboxesReset, setAreCheckboxesReset
    };

    return (<>
        <ChildItemContext.Provider value={childItemProviderValue}>
            <ListGroup list={filteredList}/>
        </ChildItemContext.Provider>

        <CreateItem
            setIsListUpdateRequired={setIsListUpdateRequired}
            isParent={isParent}
            elementOrder={elementOrder}
            parentItemId={parentItemId}
            list={list}/>
        </>);
};

export default App;
