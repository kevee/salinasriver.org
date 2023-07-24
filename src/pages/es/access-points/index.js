import React from 'react'
import AccessPointsPage from '../../../components/pages/access-points'
import { translate } from '../../../utils/translate'

const EnAccessPointsPage = () => (
  <AccessPointsPage language="es">
    Lugares para entrar y salir del río Salinas con seguridad. La mayoría de los
    puntos de acceso se encuentran en puentes o en parques y espacios abiertos
    que bordean el río. Se enumeran de sur a norte a lo largo del caudal del
    río.
  </AccessPointsPage>
)

export default EnAccessPointsPage

export const Head = () => <title>{translate('accessPoints', 'es')}</title>
