'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import SearchInput from '../Input';
import Button from '../../Button';
import { useAnimalStore } from '@/store/useAnimalStore';
import { useSearchStore } from '@/store/useSearchStore';
import './styles.css';

const Form: React.FC = () => {
    const { isShowingResults } = useAnimalStore()
    const { term, setTerm } = useSearchStore()

    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`/results?search=${term}`)
    }

    return (
        <form
            className="search__form"
            onSubmit={handleSubmit}
            role="search"
            aria-label="Animals search form"
        >
            <SearchInput term={term} setTerm={setTerm} />
            {!isShowingResults && <Button type="submit" ariaLabel='Search'>Buscar</Button>}
        </form>
    );
}

export default Form;