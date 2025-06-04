import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} nexShopt | Designed by Fabian Saavedra
      </div>
    </footer>
  );
};

export default Footer;
