"use client";

// File Imports
import "./Input.scss";

type InputProps = {
  label: string;
  id: string;
  required: boolean;
  onChange: any;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
};

const Input = ({
  label,
  id,
  required = false,
  value,
  onChange,
  placeholder,
  type,
  disabled,
}: InputProps) => {
  const handleChange = (e: any) => {
    onChange(e?.target?.value);
  };

  return (
    <div className="input-container">
      <label htmlFor={id} className="input-container-label">
        {label}
      </label>

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
