import styled from '@emotion/styled'
import colors from '../utils/colors'

const PropertiesList = styled.dl`
  margin: 2rem 0 2rem 0;
  div {
    border-bottom: 1px solid ${colors.darkGrey};
    padding: 1rem 0;
    display: flex;
    flex-wrap: nowrap;
  }
  dt {
    width: 30%;
    font-weight: bold;
  }
  dd {
    width: 70%;
    padding: 0;
    margin: 0;
    ul {
      margin: 0;
    }
    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

export default PropertiesList
