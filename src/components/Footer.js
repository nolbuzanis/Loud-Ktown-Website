/* eslint-disable react/jsx-no-target-blank */

import React from 'react'

export default () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <span>© {year} Loud KTown</span>
      <span className="footer__right">
        <span className="code">&lt;code/&gt;</span> by <a className="link" href="http://alexjin.me" target="_blank">Alex Jin</a>
      </span>
    </footer>
  )
}
