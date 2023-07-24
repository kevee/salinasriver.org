import React, { useContext } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import PropertiesList from '../components/properties-list'
import TranslateContext, { translate } from '../utils/translate'
import LinkContext from '../utils/link'
import AccessPath from '../components/map/access-path'

const AccessPoint = ({ pageContext }) => {
  const {
    language,
    tresspass,
    guage,
    content,
    directions,
    directionsPath,
    flowLow,
    flowHigh,
    lat,
    lon,
  } = pageContext
  const t = useContext(TranslateContext)
  const l = useContext(LinkContext)
  return (
    <>
      <PropertiesList>
        <div>
          <dt>{t('bestFlow')}</dt>
          <dd>
            {flowLow} {t('to')} {flowHigh}{' '}
            <abbr title={t('cubicFeetSecond')}>{t('cfs')}</abbr> {t('at')}{' '}
            <a
              href={`https://waterdata.usgs.gov/monitoring-location/${guage.waterLevel.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {guage.waterLevel.label}
            </a>
          </dd>
        </div>
        <div>
          <dt>{t('waterLevel')}</dt>
          <dd>
            {guage.waterLevel.cfs}{' '}
            <abbr title={t('cubicFeetSecond')}>{t('cfs')}</abbr> &amp;{' '}
            {guage.waterLevel.height} {t('feetDeep')}
          </dd>
        </div>
        {tresspass && (
          <div>
            <dt>{t('privateProperty')}</dt>
            <dd>
              <p>
                {t('privatePropertyMessage.text')}{' '}
                <Link to={l('overview/private-property')}>
                  {t('privatePropertyMessage.link')}
                </Link>
              </p>
            </dd>
          </div>
        )}
        <div>
          <dt>{t('drivingDirections')}</dt>
          <dd>
            <a
              href={`https://www.google.com/maps/dir/${lat},${lon}`}
              target="_blank"
              rel="noreferrer"
            >
              {t('viewInGoogle')}
            </a>
          </dd>
        </div>
      </PropertiesList>
      <p>{content[language]}</p>
      {directions && (
        <>
          <h2>{t('directions')}</h2>
          <p>{directions[language]}</p>
        </>
      )}
      <AccessPath path={directionsPath} />
    </>
  )
}

const AccessPointTemplate = ({ pageContext }) => {
  const { language, title } = pageContext
  return (
    <Layout
      language={language}
      breadcrumbs={[
        {
          link: `/${language}/access-points`,
          title: translate('accessPoints', language),
        },
      ]}
      title={title[language]}
    >
      <AccessPoint pageContext={pageContext} />
    </Layout>
  )
}

export default AccessPointTemplate

export const Head = ({ pageContext }) => (
  <>
    <title>{pageContext.title[pageContext.language]}</title>
  </>
)
