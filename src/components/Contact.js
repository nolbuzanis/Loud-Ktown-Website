import React from 'react'

export default class Contact extends React.Component {
  render () {
    return (
      <div className="row-md">
        {(typeof window.orientation !== 'undefined') ?
          <div className="call-me">
            <a href="tel:16475323221">
              <span>
                Call or Text Me
              </span>
            </a>
          </div> :
          <div className="fb-messenger">
            <a target="_blank" href="https://m.me/LOUDKtown" rel="noopener noreferrer">
              <span>
                Message Me
              </span>
            </a>
          </div>
        }
      </div>
    );
  }
}
