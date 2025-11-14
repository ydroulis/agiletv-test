import React from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

import './styles.css';

interface InputProps {
    term: string;
    setTerm: (term: string) => void;
}

const Input: React.FC<InputProps> = ({ term, setTerm }) => {

    const handleClean = () => setTerm('');

    return (
        <div className='search__input__container'>
            <button className='search__input__icon' type="submit">
                <IoIosSearch color='#6F7377' size={20} />
            </button>
            <input
                className="search__input"
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Buscar..."
            >
            </input>
            <IoMdClose
                onClick={() => handleClean()}
                className='search__input__close'
                color='#6F7377'
                size={20}
            />
        </div>
    );
}

export default Input;