import React from 'react';
import './CreditCardDisplay.scss';

export interface CreditCardDisplayProps {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cardType: 'visa' | 'mastercard' | 'unknown';
}

const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({
    cardNumber,
    cardHolder,
    expiryDate,
    cardType
}) => {
    
    const displayCardNumber = () => {
        const digits = cardNumber.replace(/\s/g, '');
        let displayNumber = '';

        for (let i = 0; i < 16; i += 4) {
            if (i > 0) displayNumber += ' ';

            for (let j = 0; j < 4; j++) {
                const idx = i + j;
                displayNumber += idx < digits.length ? digits[idx] : 'X';
            }
        }

        return displayNumber;
    };

    return (
        <div className={`credit-card credit-card--${cardType}`}>
            <div className="credit-card__chip"></div>

            <div className="credit-card__logo">
                {cardType === 'visa' && 'VISA'}
                {cardType === 'mastercard' && 'MasterCard'}
                {cardType === 'unknown' && ''}
            </div>

            <div className="credit-card__number">
                {displayCardNumber()}
            </div>

            <div className="credit-card__details">
                <div className="credit-card__holder">
                    <span className="credit-card__label">Titular</span>
                    <span className="credit-card__value">{cardHolder || 'NOMBRE Y APELLIDO'}</span>
                </div>

                <div className="credit-card__expires">
                    <span className="credit-card__label">Vence</span>
                    <span className="credit-card__value">{expiryDate || 'MM/AA'}</span>
                </div>
            </div>
        </div>
    );
};

export default CreditCardDisplay;