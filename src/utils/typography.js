import Typography from 'typography'
import colors from './colors'

const typography = new Typography({
  baseFontSize: '20px',
  baseLineHeight: 1.666,
  bodyColor: colors.body,
  headerColor: colors.body,
  headerWeight: 700,
  headerFontFamily: [
    'Raleway',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  bodyFontFamily: [
    'Open Sans',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  googleFonts: [
    {
      name: 'Raleway',
      styles: ['700'],
    },
    {
      name: 'Open Sans',
      styles: ['400', '400i', '700', '700i'],
    },
  ],
})

export default typography
