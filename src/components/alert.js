import styled from '@emotion/styled'
import colors from '../utils/colors'

const Alert = styled.aside`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: ${colors.dangerLight};
  border: 2px solid ${colors.dangerDark};
  a {
    color: ${colors.dangerLink};
  }
  p:last-child {
    margin-bottom: 0;
  }
`

export default Alert
