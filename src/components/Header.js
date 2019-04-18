import React from 'react';
import logo from '../img/loud-logo.png';
import { HashLink as Link } from 'react-router-hash-link';

class Header extends React.Component {
  state = {
    open: false
  };
  toggleMenu = e => {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div className='container-padded'>
        <div className='container-padded'>
          {this.props.singlePage ? (
            <nav className={this.state.open ? 'nav--open' : 'nav--closed'}>
              <div className='nav__logo'>
                <Link to='/'>
                  <img src={logo} alt='logo' />
                </Link>
              </div>
            </nav>
          ) : (
            <nav className={this.state.open ? 'nav--open' : 'nav--closed'}>
              <div className='nav__logo'>
                <a href='/'>
                  <img src={logo} alt='logo' />
                </a>
              </div>
              <div onClick={this.toggleMenu} className='nav__toggle'>
                <span className='nav__menu' />
              </div>
              <ul className='nav__links'>
                <li className='nav__link-item'>
                  <Link to='/rent'>Order</Link>
                </li>
                <li className='nav__link-item'>
                  <Link to='/#FAQ'>FAQ</Link>
                </li>
                <li className='nav__link-item'>
                  <Link to='/#contact'>Contact</Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
