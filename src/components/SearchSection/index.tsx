'use client'

import React, { useEffect } from 'react';
import Image from "next/image";
import Search from '../Search';
import { useAnimalStore } from '@/store/useAnimalStore';
import { useSearchStore } from '@/store/useSearchStore';
import './styles.css';

const SearchSection: React.FC = () => {
    const { setAnimals } = useAnimalStore()
    const { setTerm } = useSearchStore()

    useEffect(() => {
        setAnimals([])
        setTerm('')
    }, [])

    return (
        <section className="search__section" aria-labelledby="search-section-title">
            <div className="search__container">
                <Image
                    className="search__logo"
                    src='/logo.png'
                    alt="Google logo"
                    loading="lazy"
                    width={270}
                    height={90}
                    aria-hidden="true"
                />
                <Search />
            </div>
        </section>
    );
}

export default SearchSection;