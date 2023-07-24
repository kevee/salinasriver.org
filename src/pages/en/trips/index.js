import React from 'react'
import TripsPage from '../../../components/pages/trips'
import { translate } from '../../../utils/translate'

const EnTripsPage = () => (
  <TripsPage language="en">
    Suggested iteneraries for floating the Salinas. Because there is{' '}
    <strong>no whitewater</strong> on the river, you can use a variety of craft
    for these trips, but read descriptions carefully for other hazards like
    strainers, which require at least a little boating skill to navigate. These
    are listed south to north along the flow of the river.
  </TripsPage>
)

export default EnTripsPage

export const Head = () => <title>{translate('trips', 'en')}</title>
