import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__section">
                    <h3 className="footer__title">Nuestra Tienda</h3>
                    <ul className="footer__list">
                        <li className="footer__item">Sobre Nosotros</li>
                        <li className="footer__item">Contacto</li>
                        <li className="footer__item">Preguntas Frecuentes</li>
                    </ul>
                </div>

                <div className="footer__section">
                    <h3 className="footer__title">Categorías</h3>
                    <ul className="footer__list">
                        <li className="footer__item">Tendencias</li>
                        <li className="footer__item">Ofertas</li>
                        <li className="footer__item">Novedades</li>
                    </ul>
                </div>

                <div className="footer__section">
                    <h3 className="footer__title">Legal</h3>
                    <ul className="footer__list">
                        <li className="footer__item">Términos y Condiciones</li>
                        <li className="footer__item">Política de Privacidad</li>
                        <li className="footer__item">Política de Cookies</li>
                    </ul>
                </div>
            </div>

            <div className="footer__bottom">
                <p className="footer__copyright">© {new Date().getFullYear()} ProCycling. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;