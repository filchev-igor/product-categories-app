import React from "react";
import { v4 as uuidv4 } from 'uuid';

const FloatingLabel = props => {
    const {
        placeholder,
        type = "text",
        value, setValue,
        testId
    } = props;

    const id = uuidv4();
    /*
    Function updates the value of the input. Additionally function returns the number value, if number type result is being expected.
     */
    const handleValueUpdate = e => {
        const newValue = (type === "number") ? Number(e.target.value) : e.target.value;

        setValue(newValue);
    };

    return (
        <div className="form-floating mb-3 col">
            <input
                type={type}
                className="form-control"
                id={id}
                placeholder={placeholder}
                value={value}
                data-testid={testId}
                onChange={handleValueUpdate}/>

            <label htmlFor={id}>{placeholder}</label>
        </div>
    );
};

export default FloatingLabel;
