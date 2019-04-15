import React from 'react';
import Scrollchor from 'react-scrollchor';
import logo from '../img/loud-logo.png';

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
                <a href='/'>
                  <img src={logo} alt='logo' />
                </a>
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
                  <Scrollchor to='rent'>Rent</Scrollchor>
                </li>
                <li className='nav__link-item'>
                  <Scrollchor to='FAQ'>FAQ</Scrollchor>
                </li>
                <li className='nav__link-item'>
                  <Scrollchor to='contact'>Contact</Scrollchor>
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
