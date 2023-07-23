import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import Hamburger from 'hamburger-react'
import breakpoint from '../../utils/breakpoint'
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

const BrandLink = styled(Link)`
  color: ${colors.body};
  &:visited {
    color: ${colors.body};
  }
  font-size: 1rem;
  text-decoration: none;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`

const HeaderStyles = styled.header`
  padding: 1rem 0;
  border-bottom: 2px solid ${colors.darkGrey};
`

const HeaderMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  @media (min-width: ${breakpoint}) {
    display: flex;
    justify-content: space-between;
  }
  li {
    margin-right: 1rem;
    margin-bottom: 0;
    padding: 0;
    &:not(:first-of-type) {
      display: ${(props) => (props.isOpen ? 'block' : 'none')}};
      @media (min-width: ${breakpoint}) {
        display: block !important;
      }
    }
  }
`

const HamburgerWrapper = styled.div`
  display: block;
  order: 1;
  text-align: right;
  @media (min-width: ${breakpoint}) {
    display: none;
  }
`

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Header = ({ language }) => {
  const [isOpen, setOpen] = useState(false)
  const l = useContext(LinkContext)
  const t = useContext(TranslateContext)
  return (
    <HeaderStyles>
      <Container>
        <NavWrapper>
          <HamburgerWrapper>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </HamburgerWrapper>
          <nav>
            <HeaderMenu role="menubar" isOpen={isOpen}>
              <li>
                <BrandLink to={l('')}>{t('theSalinasRiver')}</BrandLink>
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
        </NavWrapper>
      </Container>
    </HeaderStyles>
  )
}

export default Header
