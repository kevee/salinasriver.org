import styled from '@emotion/styled'
import colors from '../utils/colors'

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 1rem;
  width: 100%;
  th,
  td {
    border-bottom: 1px solid ${colors.grey};
    padding: 0.3rem;
    text-align: left;
    border-right: 1px solid ${colors.grey};
    &:last-of-type {
      border-right: none;
    }
  }
  th {
    font-weight: 700;
  }
`

export default Table
