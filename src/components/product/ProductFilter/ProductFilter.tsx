import React, { useState } from 'react';
import FilterIcon from '../../../assets/icons/menu.svg';
import './ProductFilter.scss';

export interface ProductFilterProps {
    sortOption: string;
    onSortChange: (option: string) => void;
    className?: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
    sortOption,
    onSortChange,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newOption = e.target.value;
        onSortChange(newOption);
        setIsOpen(false);
    };

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`product-filter ${className}`}>
            <button
                className="product-filter__toggle"
                onClick={toggleFilter}
                aria-label="Mostrar filtros"
            >
                <div className="product-filter__toggle-icon">
                    <img src={FilterIcon} alt="" />
                </div>
            </button>

            <div className={`product-filter__content ${isOpen ? 'product-filter__content--open' : ''}`}>
                <div className="product-filter__header">
                    <h3 className="product-filter__header-title">Filtros</h3>
                    <button
                        className="product-filter__close"
                        onClick={toggleFilter}
                        aria-label="Cerrar filtros"
                    >
                        &times;
                    </button>
                </div>

                <div className="product-filter__section">
                    <h3 className="product-filter__title">Ordenar por</h3>
                    <select
                        className="product-filter__select"
                        value={sortOption}
                        onChange={handleSortChange}
                    >
                        <option value="best-seller">Más vendidos</option>
                        <option value="a-z">A-Z</option>
                        <option value="price-high-low">Precio: Mayor a menor</option>
                        <option value="price-low-high">Precio: Menor a mayor</option>
                    </select>
                </div>
            </div>

            {isOpen && <div className="product-filter__overlay" onClick={toggleFilter}></div>}
        </div>
    );
};

export default ProductFilter;