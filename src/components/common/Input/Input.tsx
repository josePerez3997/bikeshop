import React, { forwardRef } from 'react';
import './Input.scss';

export interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
    name?: string;
    id?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    maxLength?: number;
    autoComplete?: string;
    className?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    type = 'text',
    value,
    onChange,
    placeholder = '',
    label,
    name,
    id,
    error,
    required = false,
    disabled = false,
    maxLength,
    autoComplete,
    className = '',
    onBlur,
    onFocus
}, ref) => {
    const inputId = id || name || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className={`input-field ${error ? 'input-field--error' : ''} ${className}`}>
            {label && (
                <label htmlFor={inputId} className="input-field__label">
                    {label}
                    {required && <span className="input-field__required">*</span>}
                </label>
            )}

            <input
                ref={ref}
                type={type}
                id={inputId}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                maxLength={maxLength}
                autoComplete={autoComplete}
                className="input-field__input"
            />

            {error && <div className="input-field__error">{error}</div>}
        </div>
    );
});

export default Input;