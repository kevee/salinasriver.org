import React, { useContext } from 'react'
import Layout from '../components/layout'
import PropertiesList from '../components/properties-list'
import TranslateContext, { translate } from '../utils/translate'

const AccessPoint = ({ pageContext }) => {
  const { language, title, content, directions, flowLow, flowHigh } =
    pageContext
  const t = useContext(TranslateContext)

  return (
    <>
      <PropertiesList>
        <div>
          <dt>{t('bestFlow')}</dt>
          <dd>
            {flowLow} {t('to')} {flowHigh}
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
