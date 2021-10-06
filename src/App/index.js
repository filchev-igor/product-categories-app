import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "../components/listGroup";
import React, {useEffect, useRef, useState} from "react";
import CreateItem from "../components/createItem";
import {getListPromise} from "../database";
import {ChildItemContext} from "../contexts";

const App = ({isDatabaseTestAllowed = true}) => {
    const [parentItemId, setParentItemId] = useState('');
    const [isParent, setIsParent] = useState(true);
    const [elementOrder, setElementOrder] = useState(0);
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isListUpdateRequired, setIsListUpdateRequired] = useState(true);
    const [areCheckboxesReset, setAreCheckboxesReset] = useState(false);

    const isDatabaseTestAllowedRef = useRef(true);

    isDatabaseTestAllowedRef.current = isDatabaseTestAllowed;

    useEffect(() => {
        if (!isDatabaseTestAllowedRef.current)
            return;

        if (!isListUpdateRequired)
            return;

        const listPromise = getListPromise();

        listPromise
            .then(array => {
                const filteredArray = array
                    /*
                    Function adds parameters for simplifying filtering child elements
                     */
                    .map(value => {
                        value.child = [];
                        value.hasChild = false;
                        value.totalPrice = 0;

                        return value;
                    })
                    /*
                    Elements are sorted by the creation date (asc)
                     */
                    .sort((a, b) => {
                        return a.creationDate - b.creationDate;
                    })
                    /*
                    Function places child elements in the parent container and calculates totalPrice parameter of the parent element
                     */
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

    const createItemProps = {
        setIsListUpdateRequired: setIsListUpdateRequired,
        isParent: isParent,
        elementOrder: elementOrder,
        parentItemId: parentItemId,
        list: list,
        isDatabaseTestAllowed: isDatabaseTestAllowed
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-7 mt-3">
                    <ChildItemContext.Provider value={childItemProviderValue}>
                        <ListGroup list={filteredList} hasListGroupFlush={false}/>
                    </ChildItemContext.Provider>

                    <CreateItem {...createItemProps}/>
                </div>
            </div>
        </div>);
};

export default App;
