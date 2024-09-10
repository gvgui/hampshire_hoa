import React from 'react';
import { Link } from 'react-router-dom';

interface CardItemProps {
  path: string;
  label: string;
  text: string;
  src?: string;  // src is optional for cases where no image is needed
}

const CardItem: React.FC<CardItemProps> = ({ path, label, text, src }) => {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={path}>
          {src && (  // Only render image if src is provided
            <figure className='cards__item__pic-wrap' data-category={label}>
              <img className='cards__item__img' alt='Image' src={src} />
            </figure>
          )}
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
};

export default CardItem;