import React from 'react';
import bannerImage from '../../../assets/images/banner.webp';
import './Banner.scss';

const Banner: React.FC = () => {

    return (
        <div className="banner">
            <div className="banner__image">
                <img
                    src={bannerImage}
                    alt="Banner promocional"
                    className="banner__img"
                />
            </div>
        </div>
    );
};

export default Banner;