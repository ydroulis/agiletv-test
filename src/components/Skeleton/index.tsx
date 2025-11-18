import React from "react";
import "./styles.css";

interface SkeletonProps {
    count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ count = 1 }) => {
    const items = Array.from({ length: Math.max(1, Math.floor(count)) });

    return (
        <>
            {
                items.map((_, i) => {
                    return (
                        <div
                            key={i}
                            role="status"
                            aria-busy="true"
                            aria-label="Loading content"
                            className='skeleton-wrapper'
                        >
                            <span
                                className='skeleton url'
                            />
                            <span
                                className='skeleton title'
                            />
                            <span
                                className='skeleton description'
                            />
                        </div>
                    );
                })
            }
        </>
    );
};

export default Skeleton;
