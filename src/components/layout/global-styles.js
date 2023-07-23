import React from 'react'
import { Global, css } from '@emotion/react'
import colors from '../../utils/colors'

const GlobalStyles = () => (
  <Global
    styles={css`
      a,
      a:visited {
        color: ${colors.link};
        &[target='_blank']::after {
          content: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20'%3E%3Cpath d='M17 17H3V3h5V1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-2z' fill='%23055ae3'/%3E%3Cpath d='M19 1h-8l3.29 3.29-5.73 5.73 1.42 1.42 5.73-5.73L19 9V1z' fill='%23055ae3'/%3E%3C/svg%3E");
          text-decoration: none;
          display: inline-block;
          margin-left: 0.5rem;
          font-size: 0.8rem;
        }
      }
      .mapboxgl-map {
        a,
        a:visited {
          &[target='_blank']::after {
            content: '';
          }
        }
      }
    `}
  />
)

export default GlobalStyles
