import React from 'react'
import { Global, css } from '@emotion/react'
import colors from '../../utils/colors'

const GlobalStyles = () => (
  <Global
    styles={css`
      a,
      a:visited {
        color: ${colors.link};
      }
    `}
  />
)

export default GlobalStyles
