import React from 'react'
import IndexPage from '../../components/pages/index'
import { translate } from '../../utils/translate'

const EsIndexPage = () => (
  <IndexPage language="es">
    <strong>Esta guía es para disfrutar del río Salinas</strong>. Este recorre
    170 millas de sur a norte en el centro de California. Alberga castores y
    águilas calvas Los vecinos pescan bagres con las manos (noodle) en sus
    orillas y se refrescan en sus aguas pantanosas en verano.
  </IndexPage>
)

export default EsIndexPage

export const Head = () => <title>{translate('siteName', 'es')}</title>
