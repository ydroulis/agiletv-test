'use client'

import { useAnimalStore } from '@/store/useAnimalStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SearchInput from '../Input';
import Button from '../../Button';

import './styles.css';

const Form: React.FC = () => {
    const { setIsShowingResults } = useAnimalStore()

    const router = useRouter()
    const [term, setTerm] = useState('')

    useEffect(() => {
        setIsShowingResults(false)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`/results?search=${term}`)
    }

    return (
        <form className="search__form" onSubmit={handleSubmit}>
            <SearchInput term={term} setTerm={setTerm} />
            <Button type="submit" />
        </form>
    );
}

export default Form;