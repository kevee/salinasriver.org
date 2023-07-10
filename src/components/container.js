import styled from '@emotion/styled'
import breakpoint from '../utils/breakpoint'

const Container = styled.div`
  margin-left: 3.5rem;
  margin-right: 3.5rem;
  @media (min-width: ${breakpoint}) {
    margin-left: auto;
    margin-right: auto;
    ${(props) => (props.narrow ? `max-width: 700px;` : `max-width: 1000px;`)}
  }
  ${(props) => props.topMargin && `margin-top: 2rem;`}
`

export default Container
