import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Container from '../container'
import LinkContext from '../../utils/link'
import TranslateContext from '../../utils/translate'

const FooterStyle = styled.footer`
  margin-top: 2rem;
  padding: 2rem 0;
  border-top: 1px solid #ccc;
  nav {
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        margin: 0 0.5rem;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
  }
`

const Footer = () => {
  const t = useContext(TranslateContext)
  const l = useContext(LinkContext)
  return (
    <FooterStyle>
      <Container>
        <p dangerouslySetInnerHTML={{ __html: t('footer.by') }} />
        <nav aria-label="Footer">
          <ul>
            <li>
              <Link to={l('legal')}>{t('footer.legal')}</Link>
            </li>
            <li>
              <Link to={l('legal/accessibility')}>
                {t('footer.accessibility')}
              </Link>
            </li>
            <li>
              <a href="mailto:hello@salinasriver.org">{t('footer.contact')}</a>
            </li>
          </ul>
        </nav>
      </Container>
    </FooterStyle>
  )
}

export default Footer
