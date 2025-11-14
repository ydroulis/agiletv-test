import React from 'react';

import './styles.css';

interface ButtonProps {
    type: "submit" | "reset" | "button" | undefined
}

const Button: React.FC<ButtonProps> = ({ type, }) => {
    return (
        <button type={type} className='button'>
            Buscar
        </button>
    );
}

export default Button;