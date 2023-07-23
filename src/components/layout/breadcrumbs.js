import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import TranslateContext from '../../utils/translate'
import colors from '../../utils/colors'

const BreadcrumbList = styled.ol`
  opacity: 0.7;
  font-size: 0.9rem;
  list-style-type: none;
  padding: 0;
  margin: 0 0 1rem 0;
  display: flex;
  flex-wrap: wrap;
  li {
    margin-right: 1rem;
    &::after {
      content: ' / ';
      margin-left: 0.5rem;
    }
    &:last-child {
      margin-right: 0;
      &::after {
        content: '';
      }
    }
    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
      &[aria-current] {
        color: ${colors.darkGrey};
      }
    }
  }
`

const Breadcrumbs = ({ crumbs, title }) => {
  const t = useContext(TranslateContext)
  if (!crumbs && !title) {
    return null
  }
  const currentPage = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <nav aria-label={t('breadcrumbs')}>
      <BreadcrumbList>
        {Array.isArray(crumbs) && crumbs.length > 0 && (
          <>
            {crumbs.map((crumb) => (
              <li key={crumb.link}>
                <Link to={crumb.link}>{crumb.title}</Link>
              </li>
            ))}
          </>
        )}
        <li>
          <a href={currentPage} aria-current="page">
            {title}
          </a>
        </li>
      </BreadcrumbList>
    </nav>
  )
}

export default Breadcrumbs
