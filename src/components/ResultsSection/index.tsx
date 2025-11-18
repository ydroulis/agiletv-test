import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';
import { useAnimalStore } from '@/store/useAnimalStore';
import Skeleton from '../Skeleton';
import ResultItem from '../ResultItem';
import Preview from '../Preview';
import './styles.css';

const ResultsSection: React.FC = () => {
    const { loading, error, search } = useSearch()
    const { animals, setAnimals, setIsShowingResults } = useAnimalStore()
    const [isShowingPreview, setIsShowingPreview] = useState(false)
    const [removeScrolled, setRemoveScrolled] = useState(true);

    const params = useSearchParams()
    const term = params.get('search') || ''

    useEffect(() => {
        setIsShowingResults(true)
    }, [])

    useEffect(() => {
        const runSearch = async () => {
            const found = await search(term)
            setAnimals(found)
        }
        runSearch()
    }, [term])

    return (
        <section className="results__section" aria-label="Search results">
            {error?.status === 'empty' && (
                <p
                    role="alert"
                    className="results__empty__error"
                    tabIndex={-1}
                >
                    Try looking for <span style={{ fontWeight: 'bold' }}>
                        insect, fish, horse, crocodilia, bear, cetacean, cow, lion, rabbit, cat, snake, dog, bird.
                    </span>
                </p>
            )}
            {error?.status === 'invalid' && (
                <p
                    role="alert"
                    className="results__invalid__error"
                    tabIndex={-1}
                >
                    No results for <span style={{ fontWeight: 'bold' }}>{`'${term}'`}.</span>
                    <br />
                    Try looking for <span style={{ fontWeight: 'bold' }}>
                        insect, fish, horse, crocodilia, bear, cetacean, cow, lion, rabbit, cat, snake, dog, bird.
                    </span>
                </p>
            )}
            {loading ? (
                <Skeleton count={5} />
            ) : (
                <div className='results__container'>
                    <ul
                        className="results__list"
                        role="list"
                        aria-label={`Results for: ${term}`}
                    >
                        {animals.map((animal) => (
                            <li key={animal.id} role="listitem">
                                <ResultItem setRemoveScrolled={setRemoveScrolled} data={animal} setIsShowingPreview={setIsShowingPreview} />
                            </li>
                        ))}
                    </ul>
                    <div className="preview__wrapper" aria-hidden={!isShowingPreview}>
                        {isShowingPreview ? (
                            <Preview removeScrolled={removeScrolled} setRemoveScrolled={setRemoveScrolled} setIsShowingPreview={setIsShowingPreview} />
                        ) : (
                            <div
                                className='preview__area'
                                aria-label="No selected result"
                                role="region"
                            />
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ResultsSection;