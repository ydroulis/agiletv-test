"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useAnimalStore } from '@/store/useAnimalStore';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import './styles.css';

interface PreviewProps {
    setIsShowingPreview: React.Dispatch<React.SetStateAction<boolean>>
    setRemoveScrolled: React.Dispatch<React.SetStateAction<boolean>>
    removeScrolled: boolean
}

const Preview: React.FC<PreviewProps> = ({ setIsShowingPreview, setRemoveScrolled, removeScrolled }) => {
    const { selectedAnimal } = useAnimalStore()

    const dialogRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    const closePreview = () => {
        setIsShowingPreview(false);
        setRemoveScrolled(true);
    };

    useEffect(() => {
        const body = document.body;

        const handleScroll = () => {

            if (body.scrollTop === 0) {
                setRemoveScrolled(true);
            } else {
                setRemoveScrolled(false);
            }
        };

        body.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            body.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        const closeBtn = closeBtnRef.current;

        if (!dialog || !closeBtn) return;

        closeBtn.focus();

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        const trapFocus = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        };

        dialog.addEventListener("keydown", trapFocus);

        return () => {
            dialog.removeEventListener("keydown", trapFocus);
        };
    }, []);

    useEffect(() => {
        const escClose = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closePreview();
            }
        };

        document.addEventListener("keydown", escClose);
        return () => {
            document.removeEventListener("keydown", escClose);
        };
    }, []);


    return (
        <>
            <div
                role="presentation"
                aria-hidden={!selectedAnimal}
                className={removeScrolled ? "preview__overlay" : "preview__overlay scrolled"}
                onClick={closePreview}
            >
                {selectedAnimal && (
                    <article
                        className="preview__box"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedAnimal.title} preview`}
                        ref={dialogRef}
                    >
                        <button
                            ref={closeBtnRef}
                            className='preview__close__button'
                            onClick={closePreview}
                            aria-label="Close preview"
                        >
                            <IoMdClose aria-hidden="true" size={20} />
                        </button>
                        <div className='preview__image'>
                            <Image
                                src={selectedAnimal.image}
                                alt={`${selectedAnimal.title} image`}
                                fill={true}
                                loading='lazy'
                            />
                        </div>
                        <p className='preview__url'>{selectedAnimal.url}</p>
                        <h2 className='preview__title'>{selectedAnimal.title}</h2>
                        <p className='preview__description'>{selectedAnimal.description}</p>
                    </article>
                )}
            </div>
        </>
    );
}

export default Preview;