import React from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useAnimalStore } from '@/store/useAnimalStore';
import './styles.css';

interface InputProps {
    term: string;
    setTerm: (term: string) => void;
}

const Input: React.FC<InputProps> = ({ term, setTerm }) => {
    const { isShowingResults } = useAnimalStore()

    const handleClean = () => setTerm('');

    return (
        <div className='search__input__container' style={{ height: isShowingResults ? 30 : 40 }}>
            <button className='search__input__icon' type="submit" aria-label="Search">
                <IoIosSearch color='#6F7377' size={20} aria-hidden="true" />
            </button>
            <input
                className="search__input"
                type="text"
                name="search"
                id="search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search..."
                aria-describedby="search-clear"
            />
            <button
                id="search-clear"
                type="button"
                className="search__input__close"
                onClick={handleClean}
                aria-label="Clean search"
            >
                <IoMdClose
                    color='#6F7377'
                    size={20}
                    aria-hidden="true"
                />
            </button>
        </div>
    );
}

export default Input;