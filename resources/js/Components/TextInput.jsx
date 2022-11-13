import React, { useEffect, useRef } from "react";
import propTypes from "prop-types";
import "../../css/input.css";

TextInput.propTypes = {
    type: propTypes.oneOf(["text", "email", "password", "number", "file"]),
    name: propTypes.string,
    value: propTypes.oneOfType([propTypes.string, propTypes.string]),
    defaultValue: propTypes.oneOfType([propTypes.string, propTypes.string]),
    className: propTypes.string,
    variant: propTypes.oneOf(["primary", "error", "primary-outline"]),
    autoComplete: propTypes.string,
    required: propTypes.bool,
    isFocused: propTypes.bool,
    handleChange: propTypes.func,
    placeholder: propTypes.string,
    isError: propTypes.bool,
};

export default function TextInput({
    type = "text",
    name,
    value,
    defaultValue,
    className,
    variant = "primary",
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder,
    isError,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            TextInput.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                value={value}
                defaultValue={defaultValue}
                className={`rounded-2xl bg-form-bg py-[13px] px-7 w-full ${
                    isError && "input-error"
                } input-${variant} ${className}`}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
            />
        </div>
    );
}
