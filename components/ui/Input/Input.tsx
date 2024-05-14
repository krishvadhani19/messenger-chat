"use client";

// Module Imports
import { useCallback, useId } from "react";

// File Imports
import "./Input.scss";

type InputProps = {
  label?: string;
  required?: boolean;
  onChange: any;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  type?: "email" | "text" | "password";
};

const Input = ({
  label,
  required = false,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}: InputProps) => {
  const id = useId();

  const handleChange = useCallback(
    (e: any) => {
      onChange(e?.target?.value);
    },
    [onChange]
  );

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={id} className="input-container-label">
          {label}
        </label>
      )}

      <input
        className="input-container-input-field"
        autoComplete={id}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        type={type}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
