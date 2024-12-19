import React from 'react';
import "./car-components/Footer.css"


const Footer = () => {
    return (
        <footer className="footer">
            <nav className="footer-nav">
                <a href="/" className="footer-link">
                    <button className="footer-btn">Liste des voitures</button>
                </a>
                <a href="/client-list" className="footer-link">
                    <button className="footer-btn">Liste des clients</button>
                </a>
                <a href="/add-car" className="footer-link">
                    <button className="footer-btn">Ajouter une voiture</button>
                </a>
                <a href="/add-client" className="footer-link">
                    <button className="footer-btn">Ajouter un client</button>
                </a>
            </nav>
        </footer>
    );
};

export default Footer;


