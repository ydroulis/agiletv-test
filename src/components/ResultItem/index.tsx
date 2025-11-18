import React from 'react';
import { Animal } from '@/types/animal';
import { useAnimalStore } from '@/store/useAnimalStore';
import './styles.css';

interface ResultItemProps {
    data: Animal
    setIsShowingPreview: (isOpen: boolean) => void
    setRemoveScrolled: React.Dispatch<React.SetStateAction<boolean>>
}

function truncateText(text: string) {
    if (text.length <= 100) return text;
    return text.slice(0, 100) + '...';
}

const ResultItem: React.FC<ResultItemProps> = ({ data, setIsShowingPreview, setRemoveScrolled }) => {
    const { selectAnimal } = useAnimalStore()

    const itemRef = React.useRef<HTMLDivElement>(null);

    const isMobile = React.useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.innerWidth < 1024;
    }, []);

    const selectItem = () => {
        const body = document.body;
        if (!isMobile) {
            if (body.scrollTop !== 0) {
                setRemoveScrolled(false)
            } else {
                setRemoveScrolled(true)
            }
        }

        selectAnimal(data)
        setIsShowingPreview(true)
    }

    return (
        <article
            ref={itemRef}
            className="result__item"
            aria-label={`Result: ${data.title}`}
        >
            <p className='result__url'>{data.url}</p>
            <button
                className='result__link'
                onClick={selectItem}
                aria-label={`Open ${data.title} details`}
                type="button"
            >
                <h2 className='result__title'>{data.title}</h2>
            </button>
            <p className='result__description'>{truncateText(data.description)}</p>
        </article>
    );
}

export default ResultItem;