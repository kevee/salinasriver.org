import styled from '@emotion/styled'
import breakpoint from '../utils/breakpoint'

const Container = styled.div`
  margin-left: 3.5rem;
  margin-right: 3.5rem;
  @media (min-width: ${breakpoint}) {
    margin: 0 auto;
    max-width: 700px;
  }
`

export default Container
