'use client'

import { CgMenuGridO } from "react-icons/cg";
import Image from "next/image";
import { useAnimalStore } from '@/store/useAnimalStore'

import "./styles.css";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
    const { isShowingResults, setIsShowingResults } = useAnimalStore()
    const router = useRouter()


    const redirect = () => {
        setIsShowingResults(false)
        router.push(`/`)
    }
    return (
        <header className="header">
            {isShowingResults ? (
                <Image
                    className="header__logo"
                    src='/logo.png'
                    alt="Logo"
                    loading="lazy"
                    width={90}
                    height={30}
                    onClick={() => redirect()}
                />
            ) : (

                <h1 className="header__title"><span>Agile Content</span> Frontend test</h1 >
            )}
            <div className="header__menu__container">
                <CgMenuGridO className="header__menu__icon" color="#6F7377" />
                <Image className="header__image" src="https://mydroulisblog.netlify.app/static/b389d73a03e35639326ddbd72f2a26c4/73c85/eu.png" alt="Image profile" width={35} height={35} />
            </div>

        </header >
    );
}

export default Header;