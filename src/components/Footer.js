/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
//import { HashLink as Link } from 'react-router-hash-link';

export default () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      {/* <div className='footer-menu' style={{ height: '200px' }}>
        <ul
          style={{
            display: 'inline'
          }}
        >
          <h3>Contact Us</h3>
          <li>
            <Link className='link' to='/'>
              Facebook
            </Link>
          </li>
          <li>
            <Link className='link' to='/'>
              Email
            </Link>
          </li>
        </ul>
        <ul
          style={{
            display: 'inline',
            height: '100%'
          }}
        >
          <h3>Support</h3>
          <li>
            <Link className='link' to='/faqs'>
              FAQs
            </Link>
          </li>
        </ul>
      </div> */}
      <div>
        <span>© {year} LOUD</span>
        <span className='footer__right'>
          <span className='code'>&lt;code/&gt;</span> by{' '}
          <a
            className='link'
            href='https://www.nolanbuzanis.com'
            target='_blank'
          >
            Nolan Buzanis
          </a>
          , with help from{' '}
          <a className='link' href='http://alexjin.me' target='_blank'>
            Alex Jin
          </a>
        </span>
      </div>
    </footer>
  );
};
