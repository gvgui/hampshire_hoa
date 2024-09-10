import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [button, setButton] = useState<boolean>(true);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={handleClose}>
          Hampshire HOA
          <i className='fab fa-typo3' />
        </Link>
        {button ? (
          <ul className='nav-menu'>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={handleClose}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/files' className='nav-links' onClick={handleClose}>
                Files
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/calendar' className='nav-links' onClick={handleClose}>
                Calendar
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/board' className='nav-links' onClick={handleClose}>
                Board
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/links' className='nav-links' onClick={handleClose}>
                Links
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/contact' className='nav-links' onClick={handleClose}>
                Contact Us
              </Link>
            </li>
          </ul>
        ) : (
          <IconButton
            edge="start"
            className='menu-icon'
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: '100%',
              maxWidth: 360,
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to='/' className='nav-links' onClick={handleClose}>
              Home
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to='/files' className='nav-links' onClick={handleClose}>
              Files
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to='/calendar' className='nav-links' onClick={handleClose}>
              Calendar
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to='/board' className='nav-links' onClick={handleClose}>
              Board
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to='/links' className='nav-links' onClick={handleClose}>
              Links
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to='/contact' className='nav-links' onClick={handleClose}>
              Contact Us
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;