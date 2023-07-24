import React, { useContext } from 'react'
import styled from '@emotion/styled'
import TranslateContext from '../utils/translate'
import colors from '../utils/colors'

const FlowIndicatorStyle = styled.aside`
  display: inline-block;
  margin-left: 1rem;
  padding: 0.2rem 0.5rem;
  background: ${(props) => {
    if (props.good) {
      return colors.flow.good
    }
    if (props.bad) {
      return colors.flow.danger
    }
    return colors.flow.default
  }};
`

const FlowIndicator = ({ high, low, current }) => {
  const t = useContext(TranslateContext)
  const rate = (() => {
    if (current < 0 || !current) {
      return 'none'
    }
    if (current < low) {
      return 'below'
    }
    if (current > high) {
      return 'above'
    }
    return 'good'
  })()
  return (
    <FlowIndicatorStyle
      good={current >= low && current <= high}
      bad={current < low || current > high}
    >
      {t(`flow.${rate}`)}
    </FlowIndicatorStyle>
  )
}

export default FlowIndicator
