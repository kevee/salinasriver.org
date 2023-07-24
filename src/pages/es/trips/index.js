import React from 'react'
import TripsPage from '../../../components/pages/trips'
import { translate } from '../../../utils/translate'

const EsTripsPage = () => (
  <TripsPage language="es">
    Itinerarios sugeridos para flotar el Salinas. Dado que{' '}
    <strong>no hay aguas bravas</strong> en el río, puede utilizar una gran
    variedad de embarcaciones para estos recorridos, pero lea atentamente las
    descripciones para conocer otros peligros como las coladeras, que requieren
    al menos cierta destreza de navegación para sortearlas.
  </TripsPage>
)

export default EsTripsPage

export const Head = () => <title>{translate('trips', 'es')}</title>
