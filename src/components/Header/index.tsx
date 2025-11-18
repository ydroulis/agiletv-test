'use client'

import { CgMenuGridO } from "react-icons/cg";
import Image from "next/image";
import { useAnimalStore } from '@/store/useAnimalStore'
import { useRouter } from "next/navigation";
import Search from "../Search";
import "./styles.css";

const Header: React.FC = () => {
    const { isShowingResults, setIsShowingResults } = useAnimalStore()
    const router = useRouter()

    const redirect = () => {
        setIsShowingResults(false)
        router.push(`/`)
    }

    return (
        <header
            className="header"
            role="banner"
            aria-label="Website header"
        >
            {isShowingResults ? (
                <>
                    <div className="header__logo__container">
                        <button
                            type="button"
                            onClick={redirect}
                            className="header__logo__button"
                            aria-label="Back to home page"
                        >
                            <Image
                                className="header__logo"
                                src='/logo.png'
                                alt="Google logo"
                                loading="lazy"
                                width={90}
                                height={30}
                            />
                        </button>
                        <Search />
                    </div>
                </>
            ) : (

                <h1 className="header__title"><span>Agile Content</span> Frontend test</h1>
            )}
            <nav
                className="header__menu__container"
                ria-label="User menu options"
            >
                <button
                    type="button"
                    className="header__menu__button"
                    aria-label="Open menu"
                >
                    <CgMenuGridO
                        className="header__menu__icon"
                        color="#6F7377"
                        aria-hidden="true"
                    />
                </button>
                <button
                    type="button"
                    className="header__profile__button"
                    aria-label="Open user profile"
                >
                    <Image
                        className="header__image"
                        src="https://mydroulisblog.netlify.app/static/b389d73a03e35639326ddbd72f2a26c4/73c85/eu.png"
                        alt="User profile image"
                        width={35}
                        height={35}
                    />
                </button>
            </nav>

        </header >
    );
}

export default Header;