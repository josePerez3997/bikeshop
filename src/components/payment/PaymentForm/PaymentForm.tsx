import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../common/Button';
import Input from '../../common/Input';
import CreditCardDisplay from '../CreditCardDisplay';
import { setCustomerInfo, setPaymentInfo } from '../../../store/slices/paymentSlice';
import cardValidator from '../../../utils/cardValidator';
import './PaymentForm.scss';
import { CustomerInfo, PaymentInfo } from '../../../types/payment';

export interface PaymentFormProps {
    onContinue: (customerData: CustomerInfo, paymentData: PaymentInfo) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onContinue }) => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [addressStreet, setAddressStreet] = useState('');
    const [addressCity, setAddressCity] = useState('');
    const [addressState, setAddressState] = useState('');
    const [addressPostalCode, setAddressPostalCode] = useState('');
    const [addressCountry, setAddressCountry] = useState('Colombia');

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'unknown'>('unknown');

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (cardNumber.length > 0) {
            setCardType(cardValidator.getCardType(cardNumber));
        } else {
            setCardType('unknown');
        }
    }, [cardNumber]);

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '');
        if (/^[\d]*$/.test(value) && value.length <= 16) {
            setCardNumber(value);
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');

        if (value.length <= 4) {
            if (value.length > 2) {
                setExpiryDate(`${value.slice(0, 2)}/${value.slice(2)}`);
            } else {
                setExpiryDate(value);
            }
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!firstName) newErrors.firstName = 'El nombre es requerido';
        if (!lastName) newErrors.lastName = 'El apellido es requerido';
        if (!email) newErrors.email = 'El email es requerido';
        if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email inválido';
        if (!phone) newErrors.phone = 'El teléfono es requerido';
        if (!addressStreet) newErrors.addressStreet = 'La dirección es requerida';
        if (!addressCity) newErrors.addressCity = 'La ciudad es requerida';
        if (!addressState) newErrors.addressState = 'El estado/provincia es requerido';
        if (!addressPostalCode) newErrors.addressPostalCode = 'El código postal es requerido';

        if (!cardNumber) newErrors.cardNumber = 'El número de tarjeta es requerido';
        else if (!cardValidator.validateCardNumber(cardNumber)) newErrors.cardNumber = 'Número de tarjeta inválido';

        if (!cardHolder) newErrors.cardHolder = 'El nombre del titular es requerido';

        if (!expiryDate) newErrors.expiryDate = 'La fecha de vencimiento es requerida';
        else if (!cardValidator.validateExpiryDate(expiryDate)) newErrors.expiryDate = 'Fecha de vencimiento inválida';

        if (!cvv) newErrors.cvv = 'El código de seguridad es requerido';
        else if (!cardValidator.validateCVV(cvv)) newErrors.cvv = 'CVV inválido';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const customerData: CustomerInfo = {
                firstName,
                lastName,
                email,
                phone,
                addressStreet,
                addressCity,
                addressState,
                addressPostalCode,
                addressCountry
            };

            const paymentData: PaymentInfo = {
                cardNumber,
                cardHolder,
                expiryDate,
                cvv,
                cardType
            };

            dispatch(setCustomerInfo(customerData));
            dispatch(setPaymentInfo(paymentData));

            onContinue(customerData, paymentData);
        }
    };

    const formattedCardNumber = cardNumber.replace(/(.{4})/g, '$1 ').trim();

    return (
        <div className="payment-form">
            <form className="payment-form__form" onSubmit={handleSubmit}>
                <div className="payment-form__container">
                    <div className="payment-form__customer-info">
                        <h3 className="payment-form__section-title">Información de Contacto</h3>

                        <Input
                            label="Nombre"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            error={errors.firstName}
                            required
                        />

                        <Input
                            label="Apellido"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            error={errors.lastName}
                            required
                        />

                        <Input
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                            required
                        />

                        <Input
                            type="tel"
                            label="Teléfono"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            error={errors.phone}
                            required
                        />

                        <Input
                            label="Dirección"
                            value={addressStreet}
                            onChange={(e) => setAddressStreet(e.target.value)}
                            error={errors.addressStreet}
                            required
                        />

                        <div className="payment-form__row">
                            <Input
                                label="Ciudad"
                                value={addressCity}
                                onChange={(e) => setAddressCity(e.target.value)}
                                error={errors.addressCity}
                                required
                            />

                            <Input
                                label="Estado/Provincia"
                                value={addressState}
                                onChange={(e) => setAddressState(e.target.value)}
                                error={errors.addressState}
                                required
                            />
                        </div>

                        <div className="payment-form__row">
                            <Input
                                label="Código Postal"
                                value={addressPostalCode}
                                onChange={(e) => setAddressPostalCode(e.target.value)}
                                error={errors.addressPostalCode}
                                required
                            />

                            <div className="input-field">
                                <label className="input-field__label">
                                    País
                                    <span className="input-field__required">*</span>
                                </label>
                                <select
                                    className="input-field__input"
                                    value={addressCountry}
                                    onChange={(e) => setAddressCountry(e.target.value)}
                                >
                                    <option value="Colombia">Colombia</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Peru">Perú</option>
                                    <option value="Mexico">México</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="payment-form__card-info">
                        <h3 className="payment-form__section-title">Información de Tarjeta</h3>

                        <CreditCardDisplay
                            cardNumber={formattedCardNumber}
                            cardHolder={cardHolder}
                            expiryDate={expiryDate}
                            cardType={cardType}
                        />

                        <Input
                            label="Número de Tarjeta"
                            value={formattedCardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            error={errors.cardNumber}
                            required
                        />

                        <Input
                            label="Nombre del Titular"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Como aparece en la tarjeta"
                            error={errors.cardHolder}
                            required
                        />

                        <div className="payment-form__row">
                            <Input
                                label="Fecha de Vencimiento"
                                value={expiryDate}
                                onChange={handleExpiryChange}
                                placeholder="MM/AA"
                                error={errors.expiryDate}
                                required
                            />

                            <Input
                                label="CVV"
                                value={cvv}
                                onChange={(e) => /^\d{0,4}$/.test(e.target.value) && setCvv(e.target.value)}
                                placeholder="XXX"
                                maxLength={4}
                                error={errors.cvv}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="payment-form__actions">
                    <Button
                        type="submit"
                        size="lg"
                        fullWidth
                    >
                        Continuar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;