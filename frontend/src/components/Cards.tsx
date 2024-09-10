import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

const Cards: React.FC = () => {
  return (
    <div className='cards'>
      <h1>Check out these links!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              text='View Upcoming Events'
              label='Calendar'
              path='/calendar'
            />
            <CardItem
              text='View Files for Download'
              label='Files'
              path='/files'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              text='View Board Members'
              label='HOA Board'
              path='/board'
            />
            <CardItem
              text='Contact Us'
              label='Contact'
              path='/contact'
            />
            <CardItem
              text='View Important Links'
              label='Links'
              path='/links'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;