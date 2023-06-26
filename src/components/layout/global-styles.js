import React from 'react'
import { Global, css } from '@emotion/react'

const linkColor = '#055ae3'

const GlobalStyles = () => (
  <Global
    styles={css`
      a,
      a:visited {
        color: ${linkColor};
      }
    `}
  />
)

export default GlobalStyles
