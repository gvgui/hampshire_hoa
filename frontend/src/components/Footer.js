import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12230.48431799961!2d-86.3137433!3d39.9722238!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x881355a479f0e61d%3A0xb13bbfd4786cff3b!2sHampshire!5e0!3m2!1sen!2sus!4v1724542083558!5m2!1sen!2sus" width="600" height="450" styles="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <section class='social-media'>
        <div class='social-media-wrap'>  
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              Hampshire HOA
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>Hampshire HOA © 2024</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;