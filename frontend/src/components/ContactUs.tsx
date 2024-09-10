import React from 'react';
import { Button } from '@mui/material';
import './ContactUs.css';

const ContactUs: React.FC = () => {
  return (
    <div className='contact-us'>
      <div className='contact-info'>
        <h1>Contact Us</h1>
        <div className='section'>
          <h2>The Board of Directors</h2>
          <p>You can reach the Board of Directors at <a href='mailto:Board@HampshireHOA.com'>Board@HampshireHOA.com</a>.</p>
        </div>
        <div className='section'>
          <h2>Associa</h2>
          <p>Associa is our management company.</p>
          <p>
            11711 N. College Ave, Suite 100<br />
            Carmel, IN 46032<br />
            317-875-5600<br />
            <a href='http://www.AssociaOnline.com' target='_blank' rel='noopener noreferrer'>www.AssociaOnline.com</a>
          </p>
        </div>
        <div className='section'>
          <h2>Reporting an Issue</h2>
          <p>If you need to report a problem or violation, please use the link below:</p>
          <Button
            variant='contained'
            color='primary'
            href='https://app.townsq.io/login'  
            target='_blank'
            rel='noopener noreferrer'
            className='report-button'
          >
            Report an Issue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;