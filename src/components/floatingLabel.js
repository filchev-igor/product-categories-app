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

    const handleValueUpdate = e => {
        setValue(e.target.value);
    };

    return (
        <div className="form-floating mb-3">
            <input
                type={type}
                className="form-control"
                id={id} placeholder={placeholder}
                value={value}
                onChange={handleValueUpdate}/>

            <label htmlFor={id}>{placeholder}</label>
        </div>
    );
};

export default FloatingLabel;
