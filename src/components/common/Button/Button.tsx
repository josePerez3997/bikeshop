import React from 'react';
import './Button.scss';

export interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    onClick,
    className = '',
}) => {
    return (
        <button
            type={type}
            className={`button button--${variant} button--${size} ${fullWidth ? 'button--full-width' : ''} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;