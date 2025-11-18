import React from 'react';

import './styles.css';

interface ButtonProps {
    type?: "submit" | "reset" | "button";
    children?: React.ReactNode;
    ariaLabel?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    type = "button",
    children = "Buscar",
    ariaLabel,
    disabled = false,
    onClick,
}) => {
    return (
        <button
            type={type}
            className="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
};

export default Button;
