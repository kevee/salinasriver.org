import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import LinkContext from '../../utils/link'
import TranslateContext from '../../utils/translate'
import Container from '../container'
import colors from '../../utils/colors'

const NavLink = styled(Link)`
  color: ${colors.body};
  &:visited {
    color: ${colors.body};
  }
  font-size: 1rem;
  text-decoration: none;
  ${(props) => props.branding && 'font-weight: 700;'}
  &:hover {
    text-decoration: underline;
  }
`

const HeaderStyles = styled.header`
  padding: 1rem 0;
  border-bottom: 2px solid ${colors.darkGrey};
`

const HeaderMenu = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin-right: 1rem;
    margin-bottom: 0;
    padding: 0;
  }
`

const Header = ({ language }) => {
  const l = useContext(LinkContext)
  const t = useContext(TranslateContext)
  return (
    <HeaderStyles>
      <Container>
        <nav>
          <HeaderMenu role="menubar">
            <li>
              <NavLink branding to={l('')}>
                {t('theSalinasRiver')}
              </NavLink>
            </li>
            <li>
              <NavLink to={l('access-points')}>{t('accessPoints')}</NavLink>
            </li>
            <li>
              <NavLink to={l('trips')}>{t('trips')}</NavLink>
            </li>
            <li>
              <NavLink to={l('overview')}>{t('overview')}</NavLink>
            </li>
            <li>
              {language === 'en' ? (
                <NavLink to="/es">En Español</NavLink>
              ) : (
                <NavLink to="/en">In English</NavLink>
              )}
            </li>
          </HeaderMenu>
        </nav>
      </Container>
    </HeaderStyles>
  )
}

export default Header
