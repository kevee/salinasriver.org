import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Container from '../container'
import LinkContext from '../../utils/link'
import TranslateContext from '../../utils/translate'
import colors from '../../utils/colors'

const FloodingWarningStyle = styled.div`
  padding: 1rem;
  background-color: ${colors.dangerLight};
  border-bottom: 2px solid ${colors.dangerDark};
  a {
    color: ${colors.dangerLink};
  }
  p:last-child {
    margin-bottom: 0;
  }
`

const FloodWarning = () => {
  const t = useContext(TranslateContext)
  const l = useContext(LinkContext)
  const data = useStaticQuery(graphql`
    {
      allIsFlooding {
        nodes {
          isFlooding
        }
      }
    }
  `)

  if (!data.allIsFlooding.nodes[0].isFlooding) {
    return null
  }
  return (
    <FloodingWarningStyle>
      <Container>
        <p>
          {t('floodWarning.preamble')}{' '}
          <Link to={l('overview/flood-warning')}>
            {t('floodWarning.learnMore')}
          </Link>
        </p>
        <p dangerouslySetInnerHTML={{ __html: t('floodWarning.links') }}></p>
      </Container>
    </FloodingWarningStyle>
  )
}

export default FloodWarning
