import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { marked } from 'marked'
import Layout from '../components/layout'
import PropertiesList from '../components/properties-list'
import TranslateContext, { translate } from '../utils/translate'
import LinkContext from '../utils/link'
import Alert from '../components/alert'
import FlowIndicator from '../components/flow-indicator'

const Trip = ({ pageContext }) => {
  const {
    guage,
    content,
    length,
    time,
    flowLow,
    flowHigh,
    language,
    tresspass,
    alert,
    setUp,
    windAlert,
    gear,
    damRelease,
  } = pageContext
  const t = useContext(TranslateContext)
  const l = useContext(LinkContext)

  return (
    <>
      <PropertiesList>
        {alert && alert[language] && (
          <Alert
            dangerouslySetInnerHTML={{ __html: marked.parse(alert[language]) }}
          />
        )}
        {length && (
          <div>
            <dt>{t('length')}</dt>
            <dd>{length[language]}</dd>
          </div>
        )}
        {time && (
          <div>
            <dt>{t('time')}</dt>
            <dd>{time[language]}</dd>
          </div>
        )}
        {gear && (
          <div>
            <dt>{t('gear')}</dt>
            <dd>{gear[language]}</dd>
          </div>
        )}
        {windAlert && (
          <div>
            <dt>{t('windAlert.label')}</dt>
            <dd>{t('windAlert.warning')}</dd>
          </div>
        )}
        {damRelease && (
          <div>
            <dt>{t('damRelease')}</dt>
            <dd>
              {t('damReleaseMessage.preamble')}{' '}
              <Link to={l('overview/dam-release')}>
                {t('damReleaseMessage.link')}
              </Link>
              .
            </dd>
          </div>
        )}
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
          <dt>{t('currentFlow')}</dt>
          <dd>
            {guage.waterLevel.cfs}{' '}
            <abbr title={t('cubicFeetSecond')}>{t('cfs')}</abbr> &amp;{' '}
            {guage.waterLevel.height} {t('feetDeep')}
            <FlowIndicator
              high={flowHigh}
              low={flowLow}
              current={guage.waterLevel.cfs}
            />
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
      </PropertiesList>
      <p>{content[language]}</p>
      {setUp && (
        <>
          <h2>Set up</h2>
          <div
            dangerouslySetInnerHTML={{ __html: marked.parse(setUp[language]) }}
          />
        </>
      )}
    </>
  )
}

const TripTemplate = ({ pageContext }) => {
  const { language, title } = pageContext
  return (
    <Layout
      title={title[language]}
      language={language}
      breadcrumbs={[
        {
          link: `/${language}/trips`,
          title: translate('trips', language),
        },
      ]}
    >
      <Trip pageContext={pageContext} />
    </Layout>
  )
}

export default TripTemplate

export const Head = ({ pageContext }) => (
  <>
    <title>{pageContext.title[pageContext.language]}</title>
  </>
)
