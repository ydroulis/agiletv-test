import React from 'react';
import Image from "next/image";

import './styles.css';
import Button from '../Button';
import Search from '../Search';

const SearchSection: React.FC = () => {
    return (
        <section className="search__section">
            <div className="search__container">
                <Image
                    className="search__logo"
                    src='/logo.png'
                    alt="Logo"
                    loading="lazy"
                    width={270}
                    height={90}
                />

                <Search />
            </div>
        </section>
    );
}

export default SearchSection;