// RadioButton.tsx
import React from 'react';

interface RadioButtonProps {
    id: string;
    name: string;
    value: number;
    checked: boolean;
    onChange: (value: number) => void;
    labelText: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ id, name, value, checked, onChange, labelText }) => {
    return (
        <>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
            />
            <label htmlFor={id}>{labelText}</label>
        </>
    );
};

export default RadioButton;
