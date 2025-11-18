import React from 'react';

import './styles.css';

const Footer: React.FC = () => {
    return (
        <footer
            className="footer"
            aria-label="Footer informations"
            role="contentinfo"
        >
            <p className="footer__year">
                <span aria-hidden="true">©</span>
                <span className="sr-only"></span>Google 2021
            </p>
            <p className="footer__version">
                version: <span aria-label={`App version: 0.1.0`}>0.1.0</span>
            </p>
        </footer>
    );
}

export default Footer;