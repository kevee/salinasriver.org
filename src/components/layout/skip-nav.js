import React, { useContext } from 'react'
import styled from '@emotion/styled'
import TranslateContext from '../../utils/translate'
import colors from '../../utils/colors'

const SkipNavLink = styled.a`
  background-color: ${colors.blue};
  color: ${colors.body};
  display: block;
  font-size: 1rem;
  left: -100%;
  padding: 1rem;
  position: absolute;
  text-decoration: none;
  top: 0;
  transition: left 0.3s ease-in-out;
  &:focus {
    left: 0;
  }
`

const SkipNav = ({ to }) => {
  const t = useContext(TranslateContext)
  return <SkipNavLink href={to}>{t('skipToMain')}</SkipNavLink>
}

export default SkipNav
