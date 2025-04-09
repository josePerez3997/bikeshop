import React from 'react';
import './Banner.scss';

interface BannerProps {
    imageUrl?: string;
    className?: string;
}

const Banner: React.FC<BannerProps> = ({
    imageUrl = "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    className = ""
}) => {
    return (
        <div className={`banner ${className}`}>
            <div className="banner__image">
                <img
                    src={imageUrl}
                    alt="Banner promocional"
                    className="banner__img"
                />
            </div>
        </div>
    );
};

export default Banner;