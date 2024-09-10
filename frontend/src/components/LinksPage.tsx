import React from 'react';
import CardItem from './CardItem'; // Adjust the path as needed

const LinksPage: React.FC = () => {
  return (
    <div className='links-page'>
      <div className='links-container'>
        <ul className='links-items'>
          <CardItem
            path='https://app.townsq.io/login'
            label='Pay Dues'
            text='Click here to pay dues'
          />
          <CardItem
            path='https://www.AssociaOnline.com'
            label='Associa Online'
            text='Click here to visit our management company Associa'
          />
          <CardItem
            path='https://www.zionsville-in.gov/'
            label='Town of Zionsville'
            text='Click here to visit the town of Zionsville website'
          />
          <CardItem
            path='https://boonecounty.in.gov/'
            label='Boone County'
            text='Click here to visit the Boone County website'
          />
          <CardItem
            path='https://www.zcs.k12.in.us/'
            label='Zionsville Schools'
            text='Click here to visit the Zionsville schools website'
          />
        </ul>
      </div>
    </div>
  );
};

export default LinksPage;