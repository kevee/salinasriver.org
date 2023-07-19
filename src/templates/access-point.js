import React, { useContext } from 'react'
import Layout from '../components/layout'
import PropertiesList from '../components/properties-list'
import TranslateContext from '../utils/translate'

const AccessPointTemplate = ({ pageContext }) => {
  const { language, title, content, directions, flowLow, flowHigh } =
    pageContext
  const t = useContext(TranslateContext)
  return (
    <Layout language={language}>
      <h1>{title[language]}</h1>
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
    </Layout>
  )
}

export default AccessPointTemplate
