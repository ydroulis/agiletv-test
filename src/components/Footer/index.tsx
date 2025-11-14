import React from 'react';

import './styles.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <span className='footer__year'>©Google 2021</span>
            <span className='footer__version'>version 0.1.0</span>
        </footer>
    );
}

export default Footer;