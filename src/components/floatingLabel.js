import React from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

const FloatingLabel = props => {
    const {
        placeholder,
        type = "text",
        value,
        setValue
    } = props;

    const id = generateUniqueID();

    /*
    Function updates the value of the input. Additionally function returns the number value, if number type result is being expected.
     */
    const handleValueUpdate = e => {
        const value = (type === "number") ? Number(e.target.value) : e.target.value;

        setValue(value);
    }

    return (
        <div className="form-floating mb-3">
            <input
                type={type}
                className="form-control"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={handleValueUpdate}/>

            <label htmlFor={id}>{placeholder}</label>
        </div>
    );
};

export default FloatingLabel;
